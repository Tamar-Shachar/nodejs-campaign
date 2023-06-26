const campaignRepository  = require('../repositories/campaignRepo');

class CampaignService {

    constructor() {}

    async getCampaignById(campaignId) {
        return await campaignRepository.getCampaignById(campaignId);
    }

    async getCampaigns() {
        return await campaignRepository.getCampaigns();
    }

    async createCampaign(campaign) {
        return await campaignRepository.createCampaign(campaign);
    }

    async updateCampaign(campaignId,campaign) {
        return await campaignRepository.updateCampaign(campaign);
    }

    // async deleteCampaign(campaignId) {
    //     return await campaignRepository.deleteCampaign(campaignId);
    // }

}

module.exports = new CampaignService();
