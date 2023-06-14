const { connect } = require('../models/db');
const { Matching } = require('../models/matchingModels');
const logger = require('../logger/logger');

class MatchingRepository {

    constructor() {
        connect();
    }
    async getMatchingById(matchingId) {
        const matchings = await Matching.find({ id: matchingId });
        console.log('matchings:::', matchings);
        return matchings;
    }

    async getMatchings() {
        const matchings = await Matching.find({});
        console.log('matchings:::', matchings);
        return matchings;
    }

    async createMatching(matching) {
        let data = {};
        try {
            data = await Matching.create(matching);
        } catch (err) {
            logger.error('Error::' + err);
        }
        return data;
    }
    async updateMatching(matching) {
        let data = {};
        try {
            data = await Matching.updateOne(matching);
        } catch (err) {
            logger.error('Error::' + err);
        }
        return data;
    }

    // async deleteMatching(matchingId) {
    //     let data = {};
    //     try {
    //         data = await Matching.deleteOne({ id: matchingId });
    //     } catch (err) {
    //         logger.error('Error::' + err);
    //     }
    //     return { status: `${data.deletedCount > 0 ? true : false}` };
    // }


}

module.exports = new MatchingRepository();