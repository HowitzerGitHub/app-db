import Subject from '../models/Subject';
const Team = require('../models/Team')
const User =  require('../models/User')
const Curriculum = {
    async team(parent, args, ctx, info){ 
        const team = await Team.findById(parent.team) 
        return team;
    },
    async createdBy(parent, args, ctx, info){
        const creater = await User.findById(parent.createdBy)
        return creater;
    },
    async subject(parent, args, ctx, info){
        const subject = await Subject.find({"curriculum":parent._id})
        return subject
    }
}

export {Curriculum as default}