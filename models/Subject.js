const { model, Schema } = require('mongoose')

const subjectSchema = new Schema({
    curriculum: Schema.Types.ObjectId, //ID
    subjectName: String,
    refrences: Array,
    description: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = model('Subject', subjectSchema)