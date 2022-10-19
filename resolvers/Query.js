const User = require ('../models/User')
const Team = require ('../models/Team')
const Curriculum = require('../models/Curriculum')
const Subject = require('../models/Subject')
const Chapter = require('../models/Chapter')

module.exports = {
    Query:{
        async user(parent,args,ctx,info){
            // console.log(args)
            if(args.id){
                const user = await User.findById(args.id)
                return [user]
            }
            const user = await User.find()
            // console.log(user)
            return user
        },

        async team(parent,args,ctx,info){
            if(args.id){
                const team = await Team.findById(args.id)
                return [team]
            }
            const team = await Team.find({})
            return team
        },

        async curriculum(parent,args,ctx,info){
            if(args.id){
                const curriculum = await Curriculum.findById(args.id)
                return [curriculum]
            }

            const curriculum = await Curriculum.find({})
            return curriculum
        },
        async subject(parent,args,ctx,info){
            if(args.id){
                const subject = await Subject.findById(args.id)
                return [subject]
            }

            const subject = await Subject.find({})
            return subject
        },
        async chapter(parent,args,ctx,info){
            if(args.id){
                const chapter = await Chapter.findById(args.id)
                return [chapter]
            }

            const chapter = await Chapter.find({})
            return chapter
        },

        async loginUser(parent,args,ctx,info){
            const {userEmail, password} = args
            const userExist = await User.findOne({"userEmail":userEmail})
            if(!userExist) throw new Error("User with this email ID does not exist")
            const authSucces = await User.findOne({ $and: [ {"userEmail" : { $eq:userEmail } } , { "password": {$eq:password} } ] })

            if(userExist && !authSucces) throw new Error('Please Check your password')
            // console.log(authSucces)
            return authSucces
        }
    }
}