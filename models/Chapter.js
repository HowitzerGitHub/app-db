const { model, Schema } = require('mongoose')

const chapterSchema = new Schema({
    subject: Schema.Types.ObjectId, //ID
    chapterName: String,    
    refrences: Array,
    description: String,
    duration: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = model('Chapter', chapterSchema)