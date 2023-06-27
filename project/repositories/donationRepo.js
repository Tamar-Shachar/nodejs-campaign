
const { Donation } = require('../models/donationModels');
const logger = require('../logger/logger');
const fundRaiserRepository = require('./fundRaiserRepo')
const campaignRepository = require('../repositories/campaignRepo')

class DonationRepository {

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
        return data;
    }
}

module.exports = new DonationRepository();