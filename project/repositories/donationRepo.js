const { connect } = require('../models/db');
const Donation = require('../models/donationModels');
const logger = require('../logger/logger');

class DonationRepository {

    constructor() {
        connect();
    }
    async getDonationById(donationId, fundRaiserId) {
        const donations = await Donation.find({ id: donationId, fundRaiser: fundRaiserId });
        console.log('donations:::', donations);
        return donations;
    }

    async getDonations(fundRaiserId) {
        const donations = await Donation.find({ fundRaiser: fundRaiserId });
        console.log('donations:::', donations);
        return donations;
    }

    async createDonation(donation) {
        let data = {};
        try {
            data = await Donation.create(donation);
        } catch (err) {
            logger.error('Error::' + err);
        }
        return data;
    }
}

module.exports = new DonationRepository();