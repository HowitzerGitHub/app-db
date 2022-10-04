const {model, Schema, Mongoose} = require('mongoose')

const teamSchema = new Schema({
    teamName: String,
    description: String,
    visibility: Boolean,
    createdBy: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = model('Team',teamSchema)