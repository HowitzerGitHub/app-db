const Subject = require('../models/Subject')
const Chapter = {
    async subject(parent, args, ctx, info){
        const subject = await Subject.findById( parent.subject )
        return subject
    }
}

export {Chapter as default}