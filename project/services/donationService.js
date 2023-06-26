const donationRepository = require('../repositories/donationRepo');

class DonationService {

    constructor() { }

    async getDonationById(fundRaiserId, donationId) {
        return await donationRepository.getDonationById(fundRaiserId, donationId);
    }

    async getDonations(fundRaiserId) {
        return await donationRepository.getDonations(fundRaiserId);
    }

    async createDonation(donation) {
        return await donationRepository.createDonation(donation);
    }
}

module.exports = new DonationService();