const fundRaiserRepository  = require('../repositories/fundRaiserRepo');

class FundRaiserService {

    constructor() {}

    async getFundRaiserById(fundRaiserId) {
        return await fundRaiserRepository.getFundRaiserById(fundRaiserId);
    }

    async getFundRaisers() {
        return await fundRaiserRepository.getFundRaisers();
    }

    async createFundRaiser(fundRaiser) {
        return await fundRaiserRepository.createFundRaiser(fundRaiser);
    }

    async updateFundRaiser(fundRaiserId,fundRaiser) {
        return await fundRaiserRepository.updateFundRaiser(fundRaiser);
    }

    async deleteFundRaiser(fundRaiserId) {
        return await fundRaiserRepository.deleteFundRaiser(fundRaiserId);
    }

}

module.exports = new FundRaiserService();