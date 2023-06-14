const groupRepository  = require('../repositories/groupRepo');

class GroupService {

    constructor() {}

    async getGroupById(groupId) {
        return await groupRepository.getGroupById(groupId);
    }

    async getGroup() {
        return await groupRepository.getGroup();
    }

    async createGroup(group) {
        return await groupRepository.createGroup(group);
    }

    async updateGroup(group) {
        return await groupRepository.updateGroup(group);
    }

    async deleteGroup(groupId) {
        return await groupRepository.deleteGroup(groupId);
    }

}

module.exports = new GroupService();