const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    profilePicture: { type: String },
    bio: { type: String },
    gender: { type: String },
    sexualOrientation: { type: String },
    location: {
        city: { type: String },
        state: { type: String },
        country: { type: String },
        coordinates: {
            latitude: { type: Number },
            longitude: { type: Number }
        }
    },
    lookingFor: { type: String },
    interests: [String],
    preferredGender: [String],
    matches: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    messages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message' }],
    lastLogin: { type: Date },
    accountStatus: { type: String, enum: ['active', 'inactive', 'suspended'], default: 'active' },
    privacySettings: {
        profileVisibility: { type: String, enum: ['public', 'private'], default: 'public' },
        notifications: {
            messages: { type: Boolean, default: true },
            matches: { type: Boolean, default: true }
        }
    },
    activityLog: [{ type: String }]
});

module.exports = mongoose.model('User', userSchema);
