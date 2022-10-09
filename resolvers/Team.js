import Curriculum from '../models/Curriculum'
const User = require('../models/User')

const Team = {
    async createdBy(parent, args, ctx, info){
        const user = await User.findById( parent.createdBy )
        return user
    },
    async curriculum(parent, args, ctx, info){
        // console.log(parent._id)
        const curriculum = await Curriculum.find({team: {$eq:parent._id}})
        console.log(curriculum)
        return curriculum
    },
    async members(parent, args, ctx, info){
        const members = await User.find({teams: { $elemMatch: {$eq:parent._id}  }})
        return members
    }
}

export {Team as default}