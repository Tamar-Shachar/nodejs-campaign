const Group = require('../models/groupModels');
const logger = require('../logger/logger');


class GroupRepository {

    async getGroupById(campaignId, groupId) {
        const groups = await Group.find({ campaignId: campaignId, id: groupId });
        console.log('groups:::', groups);
        return groups;
    }

    async getGroups(campaignId) {
        const groups = await Group.find({ campaignId: campaignId });
        console.log('groups:::', groups);
        return groups;
    }

    async createGroup(group) {
        let data = {};
        try {
            data = await Group.create(group);
            return data;
        } catch (err) {
            logger.error('Error::' + err);
            return err;
        }

    }
    async updateGroup(campaignId, groupId, group) {
        let data = {};
        let filter = { campaignId: campaignId, id: groupId };
        try {
            data = await Group.findOneAndUpdate(filter, group);
        } catch (err) {
            logger.error('Error::' + err);
        }
        return data;
    }

    async updateCurAmountGroup(groupId, sum) {
        let data = {};
        let filter = { id: groupId };
        try {
            data = await Group.findOne(filter);
            data.currentAmount += sum;
            await Group.updateOne(filter, data);
            // await campaignRepository.updateCurAmountCampaign(data.campaignId,sum);
        } catch (err) {
            logger.error('Error::' + err);
        }
        return data;
    }

    async updateMembersGroup(groupId, sum) {
        let data = {};
        let filter = { id: groupId };
        try {
            data = await Group.findOne(filter);
            data.members++;
            await Group.updateOne(filter, data);
            // await campaignRepository.updateCurAmountCampaign(data.campaignId,sum);
        } catch (err) {
            logger.error('Error::' + err);
        }
        return data;
    }

    async deleteGroup(campaignId, groupId) {
        let data = {};
        try {
            data = await Group.deleteOne({ campaignId: campaignId, id: groupId });
        } catch (err) {
            logger.error('Error::' + err);
        }
        return { status: `${data.deletedCount > 0 ? true : false}` };
    }


}

module.exports = new GroupRepository();