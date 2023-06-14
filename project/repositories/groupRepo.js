const { connect } = require('../models/db');
const  Group = require('../models/groupModels');
const logger = require('../logger/logger');

class GroupRepository {

    constructor() {
        connect();
    }
    async getGroupById(groupId) {
        const groups = await Group.find({ id: groupId });
        console.log('groups:::', groups);
        return groups;
    }

    async getGroups() {
        const groups = await Group.find({});
        console.log('groups:::', groups);
        return groups;
    }

    async createGroup(group) {
        let data = {};
        try {
            data = await Group.create(group);
        } catch (err) {
            logger.error('Error::' + err);
        }
        return data;
    }
    async updateGroup(group) {
        let data = {};
        try {
            data = await Group.updateOne(group);
        } catch (err) {
            logger.error('Error::' + err);
        }
        return data;
    }

    async deleteGroup(groupId) {
        let data = {};
        try {
            data = await Group.deleteOne({ id: groupId });
        } catch (err) {
            logger.error('Error::' + err);
        }
        return { status: `${data.deletedCount > 0 ? true : false}` };
    }


}

module.exports = new GroupRepository();