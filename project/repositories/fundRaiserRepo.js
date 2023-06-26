const FundRaiser = require('../models/fundRaiserModels');
const logger = require('../logger/logger');
const groupRepository = require('../repositories/groupRepo')

class FundRaiserRepository {


    async getFundRaiserById(fundRaiserId) {
        const fundRaisers = await FundRaiser.find({ id: fundRaiserId });
        console.log('fundRaisers:::', fundRaisers);
        return fundRaisers;
    }

    async getFundRaisers() {
        const fundRaisers = await FundRaiser.find({});
        console.log('fundRaisers:::', fundRaisers);
        return fundRaisers;
    }

    async createFundRaiser(fundRaiser) {
        let data = {};
        try {
            data = await FundRaiser.create(fundRaiser);
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
            if(data.groupId != 0){
                await groupRepository.updateCurAmountGroup(data.groupId,sum);
            }
            
        } catch (err) {
            logger.error('Error::' + err);
        }
        return data;
    }

    async deleteFundRaiser(fundRaiserId) {
        let data = {};
        try {
            data = await FundRaiser.deleteOne({ id: fundRaiserId });
        } catch (err) {
            logger.error('Error::' + err);
        }
        return { status: `${data.deletedCount > 0 ? true : false}` };
    }
}
module.exports = new FundRaiserRepository();