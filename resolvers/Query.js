const User = require ('../models/User')
const Team = require ('../models/Team')

module.exports = {
    Query:{
        async user(parent,args,ctx,info){
            if(args.id){
                const user = await User.findById(args.id)
                return [user]
            }
            const user = await User.find()
            return user
        },

        async team(parent,args,ctx,info){
            if(args.id){
                const team = await Team.findById(args.id)
                return [team]
            }
            const team = await Team.find({})
            return team
        }
    }
}