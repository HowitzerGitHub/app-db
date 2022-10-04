const Team = require('../models/Team')
const User = {
    async teams(parent, args, ctx, info){
        const teams = await Team.find( {'_id':{$in : parent.teams }} )
        return teams
    }
}

export {User as default}