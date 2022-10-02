const User = require ('../models/User')

module.exports = {
    Query:{
        async user(parent,args,ctx,info){
            if(args.id){
                const user = await User.findById(args.id)
                return [user]
            }
            const user = await User.find()
            return user
        }
    }
}