const { connect } = require('../models/db');
const FundRaiser = require('../models/fundRaiserModels');
const logger = require('../logger/logger');

class FundRaiserRepository {

    constructor() {
        connect();
    }
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
    async updateFundRaiser(fundRaiser) {
        let data = {};
        try {
            data = await FundRaiser.updateOne(fundRaiser);
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