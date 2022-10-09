const Curriculum = require('../models/Curriculum')
const Chapter = require('../models/Chapter')

const Subject = {
    async curriculum(parent, args, ctx, info){ 
        const curriculum = await Curriculum.findById(parent.curriculum)
        // console.log(curriculum)
        return curriculum;
    },
    async chapter(parent, args, ctx, info){
        const chapter = await Chapter.find({"subject":parent._id})
        return chapter
    }
    
}

export {Subject as default}