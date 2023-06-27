
const { Campaign } = require('../models/campaignModels');
const logger = require('../logger/logger');

class CampaignRepository {

    async getCampaignById(campaignId) {
        const campaigns = await Campaign.find({ id: campaignId });
        console.log('campaigns:::', campaigns);
        return campaigns;
    }

    async getCampaigns() {
        const campaigns = await Campaign.find({});
        console.log('campaigns:::', campaigns);
        return campaigns;
    }



    async createCampaign(campaign) {
        let data = {};
        try {
            data = await Campaign.create(campaign);
            return data;
        } catch (err) {
            logger.error('Error::' + err);
            return err;
        }

    }
    async updateCampaign(campaignId, campaign) {
        let data = {};
        let filter = { id: campaignId };
        try {
            data = await Campaign.updateOne(filter, campaign);
        } catch (err) {
            logger.error('Error::' + err);
        }
        return data;
    }

    async updateCurAmountCampaign(campaignId, sum) {
        let data = {};
        let filter = { id: campaignId };
        try {
            data = await Campaign.findOne(filter);
            data.currentAmount += sum;
            await Campaign.updateOne(filter, data);
        } catch (err) {
            logger.error('Error::' + err);
        }
        return data;
    }

    // async deleteCampaign(campaignId) {
    //     let data = {};
    //     try {
    //         data = await Campaign.deleteOne({ id: campaignId });
    //     } catch (err) {
    //         logger.error('Error::' + err);
    //     }
    //     return { status: `${data.deletedCount > 0 ? true : false}` };
    // }


}

module.exports = new CampaignRepository();