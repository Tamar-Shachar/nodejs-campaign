const fundRaiserRepository  = require('../repositories/fundRaiserService');

class FundRaiserService {

    constructor() {}

    async getFundRaiserById(fundRaiserId) {
        return await fundRaiserRepository.getFundRaiserById(fundRaiserId);
    }

    async getFundRaiser() {
        return await fundRaiserRepository.getFundRaiser();
    }

    async createFundRaiser(fundRaiser) {
        return await fundRaiserRepository.createFundRaiser(fundRaiser);
    }

    async updateFundRaiser(fundRaiser) {
        return await fundRaiserRepository.updateFundRaiser(fundRaiser);
    }

    async deleteFundRaiser(fundRaiserId) {
        return await fundRaiserRepository.deleteFundRaiser(fundRaiserId);
    }

}

module.exports = new FundRaiserService();