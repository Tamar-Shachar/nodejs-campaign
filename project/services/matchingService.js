const matchingRepository  = require('../repositories/matchingRepo');

class MatchingService {

    constructor() {}

    async getMatchingById(matchingId) {
        return await matchingRepository.getMatchingById(matchingId);
    }

    async getMatching() {
        return await matchingRepository.getMatching();
    }

    async createMatching(matching) {
        return await matchingRepository.createMatching(matching);
    }

    async updateMatching(matching) {
        return await matchingRepository.updateMatching(matching);
    }

    // async deleteMatching(matchingId) {
    //     return await matchingRepository.deleteMatching(matchingId);
    // }

}

module.exports = new MatchingService();
