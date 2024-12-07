const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    username: String,
    email: { type: String, unique: true },
    password: String,
    sessions: [{
        sessionId: String,
        loginTime: Date,
        logoutTime: Date,
        scores: [{
            game: String,
            score: Number,
            date: { type: Date, default: Date.now }
        }],
        images: [{
            imgpath: {
                type: String,
                required: true,
            },
            emotions: {
                angry: { type: Number, required: true, default: 0 },
                disgust: { type: Number, required: true, default: 0 },
                fear: { type: Number, default: 0 },
                happy: { type: Number, required: true, default: 0 },
                sad: { type: Number, required: true, default: 0 },
                surprise: { type: Number, default: 0 },
                neutral: { type: Number, required: true, default: 0 },
            },
            max_emotion_img: {
                emotion: { type: String, required: false },
                score: { type: Number, required: false }
            }
        }], // Array of image paths
    }]
});

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;
