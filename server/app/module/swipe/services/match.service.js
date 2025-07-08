const matchModel = require('../../match/model/match.model');
const swipeModel = require('../model/swipe.model');
const mongoose=require('mongoose')

const getMatchesByUserId = async (userId) => {
    const matches = await matchModel.aggregate([
        // Match documents where user1 or user2 is equal to userId
        {
            $match: {
                $or: [
                    { user1: new mongoose.Types.ObjectId(userId) },
                    { user2: new mongoose.Types.ObjectId(userId) }
                ]
            }
        },
        // Lookup for user1
        {
            $lookup: {
                from: 'users', // collection name of User model
                localField: 'user1',
                foreignField: '_id',
                as: 'user1'
            }
        },
        // Deconstruct the user1 array (since it's a one-to-one relationship)
        {
            $unwind: '$user1'
        },
        // Lookup for user2
        {
            $lookup: {
                from: 'users',
                localField: 'user2',
                foreignField: '_id',
                as: 'user2'
            }
        },
        // Deconstruct the user2 array
        {
            $unwind: '$user2'
        },
        // Project only the needed fields from each user
        {
            $project: {
                'user1.name': 1,
                'user1.email': 1,
                'user2.name': 1,
                'user2.email': 1,
                createdAt: 1, // Include other relevant match fields if needed
                updatedAt: 1
            }
        }
    ]);
   
    return matches;
};

const checkMatchExists = async (userId, targetId) => {
    const match = await matchModel.findOne({
        $or: [
            { user1: userId, user2: targetId },
            { user1: targetId, user2: userId }
        ]
    });

    if (match) return match;

    // Check for mutual like
    const userSwipe = await swipeModel.findOne({ userId, targetId, type: 'like' });
    const targetSwipe = await swipeModel.findOne({ userId: targetId, targetId: userId, type: 'like' });

    if (userSwipe && targetSwipe) {
        const newMatch = await matchModel.create({ user1: userId, user2: targetId });
        return newMatch;
    }

    return null;
};

module.exports = {
    getMatchesByUserId,
    checkMatchExists
};