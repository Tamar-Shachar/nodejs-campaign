const fundRaiserRepository = require('../repositories/fundRaiserRepo');

class FundRaiserService {

    constructor() { }

    async getFundRaiserById(fundRaiserId) {
        return await fundRaiserRepository.getFundRaiserById(fundRaiserId);
    }

    async getFundRaisers(groupId) {
        return await fundRaiserRepository.getFundRaisers(groupId);
    }

    async createFundRaiser(fundRaiser) {
        return await fundRaiserRepository.createFundRaiser(fundRaiser);
    }

    async updateFundRaiser(fundRaiserId, fundRaiser) {
        return await fundRaiserRepository.updateFundRaiser( fundRaiserId, fundRaiser);
    }

    async deleteFundRaiser( groupId, fundRaiserId) {
        return await fundRaiserRepository.deleteFundRaiser( groupId, fundRaiserId);
    }

}

module.exports = new FundRaiserService();