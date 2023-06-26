const groupRepository = require('../repositories/groupRepo');

class GroupService {

    constructor() { }

    async getGroupById(campaignId, groupId) {
        return await groupRepository.getGroupById(campaignId, groupId);
    }

    async getGroups(campaignId) {
        return await groupRepository.getGroups(campaignId);
    }

    async createGroup( group) {
        return await groupRepository.createGroup( group);
    }

    async updateGroup(campaignId, groupId, group) {
        return await groupRepository.updateGroup(campaignId, groupId, group);
    }

    async deleteGroup(campaignId, groupId) {
        return await groupRepository.deleteGroup(campaignId, groupId);
    }

}

module.exports = new GroupService();