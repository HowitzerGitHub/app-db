const { model, Schema } = require('mongoose')

const curriculumSchema = new Schema({
    curriculumName: String,
    subjects: Array,
    team: Schema.Types.ObjectId,
    description: String,
    createdBy: Schema.Types.ObjectId,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = model('Curriculum', curriculumSchema)