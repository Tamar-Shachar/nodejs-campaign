const { FundRaiser } = require('../models/fundRaiserModels');
const logger = require('../logger/logger');
const groupRepository = require('../repositories/groupRepo')

class FundRaiserRepository {


    async getFundRaiserById(groupId, fundRaiserId) {
        const fundRaisers = await FundRaiser.find({ groupId: groupId, id: fundRaiserId });
        console.log('fundRaisers:::', fundRaisers);
        return fundRaisers;
    }

    async getFundRaisers(groupId) {
        const fundRaisers = await FundRaiser.find({ groupId: groupId });
        console.log('fundRaisers:::', fundRaisers);
        return fundRaisers;
    }

    async createFundRaiser(fundRaiser) {
        let data = {};
        try {
            data = await FundRaiser.create(fundRaiser);
            groupRepository.updateMembersGroup(fundRaiser.groupId, "add");
        } catch (err) {
            logger.error('Error::' + err);
        }
        return data;
    }

    async updateFundRaiser(fundRaiserId, fundRaiser) {
        let data = {};
        let filter = { id: fundRaiserId };
        try {
            data = await FundRaiser.updateOne(filter, fundRaiser);
        } catch (err) {
            logger.error('Error::' + err);
        }
        return data;
    }

    async updateCurAmountFundRaiser(fundRaiserId, sum) {
        let data = {};
        let filter = { id: fundRaiserId };
        try {
            data = await FundRaiser.findOne(filter);
            data.currentAmount += sum;
            await FundRaiser.updateOne(filter, data);
            if (data.groupId != 0) {
                await groupRepository.updateCurAmountGroup(data.groupId, sum);
            }

        } catch (err) {
            logger.error('Error::' + err);
        }
        return data;
    }

    async deleteFundRaiser(groupId, fundRaiserId) {
        let data = {};
        try {
            data = await FundRaiser.deleteOne({ id: fundRaiserId });
            groupRepository.updateMembersGroup(groupId, "remove");
        } catch (err) {
            logger.error('Error::' + err);
        }
        return { status: `${data.deletedCount > 0 ? true : false}` };
    }
}
module.exports = new FundRaiserRepository();