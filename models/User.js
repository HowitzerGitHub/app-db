const {model, Schema} = require('mongoose')

const userSchema = new Schema({
    userName: String,
    userEmail: String,
    pic: String,
    gender: String,
    teams: Array,
    bio: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = model('User',userSchema)