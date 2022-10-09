const { model, Schema } = require('mongoose')

const userSchema = new Schema({
    userName: String,
    userEmail: String,
    pic: String,
    gender: String,
    teams: [{
        type: Schema.Types.ObjectId, 
        ref: "Team"
    }],
    bio: String,
    createdAt: { 
        type: Date,
        default: Date.now
    }
});

module.exports = model('User', userSchema)