const User = require('../models/User')
const Team = {
    async createdBy(parent, args, ctx, info){
        console.log('Here')
        const user = await User.findById( parent.createdBy )
        return user
    }
}

export {Team as default}