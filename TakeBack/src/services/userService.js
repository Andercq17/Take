const User = require('../models/userModel');

exports.getAllUsers = async () => {
    return await User.find();
};

exports.getUserById = async (id) => {
    return await User.findById(id);
};

exports.createUser = async (userData) => {
    const user = new User(userData);
    return await user.save();
};

exports.updateUserById = async (id, updateData) => {
    return await User.findByIdAndUpdate(id, updateData, { new: true });
};

exports.getUserByEmail = async (email) => {
    return await User.findOne({ email: email });
};

exports.deleteUserById = async (id) => {
    return await User.findByIdAndDelete(id);
};

exports.findUsers = async (filters) => {
    return await User.find(filters);
};

exports.updateUserInfo = async (id, updateData) => {
    return await User.findByIdAndUpdate(id, { $set: updateData }, { new: true });
};

exports.countUsers = async () => {
    return await User.countDocuments({});
};

exports.addMatch = async (userId, matchId) => {
    return await User.findByIdAndUpdate(userId, { $addToSet: { matches: matchId } }, { new: true });
};

exports.removeMatch = async (userId, matchId) => {
    return await User.findByIdAndUpdate(userId, { $pull: { matches: matchId } }, { new: true });
};

exports.authenticateUser = async (email, password) => {
    const user = await User.findOne({ email: email });
    if (user && await user.comparePassword(password)) {
        return user;
    }
    return null;
};

exports.updateLastLogin = async (id) => {
    return await User.findByIdAndUpdate(id, { lastLogin: new Date() }, { new: true });
};

exports.updateUserPassword = async (id, newPassword) => {
    return await User.findByIdAndUpdate(id, { password: newPassword }, { new: true });
};

exports.getUsersByLocation = async (location) => {
    return await User.find({ 'location.city': location });
};

exports.getUsersByInterests = async (interests) => {
    return await User.find({ interests: { $in: interests } });
};

exports.removeMatchFromUser = async (userId, matchId) => {
    return await User.findByIdAndUpdate(userId, { $pull: { matches: matchId } }, { new: true });
};

exports.isUserActive = async (id) => {
    const user = await User.findById(id);
    return user && user.accountStatus === 'active';
};

exports.addMessageToUser = async (userId, messageId) => {
    return await User.findByIdAndUpdate(userId, { $push: { messages: messageId } }, { new: true });
};

exports.removeMessageFromUser = async (userId, messageId) => {
    return await User.findByIdAndUpdate(userId, { $pull: { messages: messageId } }, { new: true });
};

exports.countMatches = async (userId) => {
    const user = await User.findById(userId);
    return user ? user.matches.length : 0;
};



