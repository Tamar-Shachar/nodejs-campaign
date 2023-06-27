
const { Donation } = require('../models/donationModels');
const logger = require('../logger/logger');
const fundRaiserRepository = require('./fundRaiserRepo')
const campaignRepository = require('../repositories/campaignRepo')

class DonationRepository {

    constructor() {
        this.DonationError = new Error("Donation dosent exist")
        this.DonationError.status = 404;
    }
    
    async getDonationById(donationId, fundRaiserId) {
        const donation = await Donation.find({ id: donationId, fundRaiser: fundRaiserId });
        if (donation.length == 0) {
            throw this.DonationError;
        }
        return donation;
    }

    async getDonations(fundRaiserId) {
        const donations = await Donation.find({ fundRaiser: fundRaiserId });
        return donations;
    }

    async createDonation(campaignId, donation) {
        let data = {};
        try {
            data = await Donation.create(donation);
            if (data.fundRaiserId != null) {
                await fundRaiserRepository.updateCurAmountFundRaiser(donation.fundRaiserId, donation.amount);
            }
            await campaignRepository.updateCurAmountCampaign(campaignId, donation.amount);
        } catch (err) {
            logger.error('Error::' + err);
        }
        logger.info(`donation:${donation},  Date:${Date.now()}`)
        return data;
    }
}

module.exports = new DonationRepository();