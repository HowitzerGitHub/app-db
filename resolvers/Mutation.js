const User = require('../models/User')
const Team = require('../models/Team')

module.exports = {
    Mutation: {
        async createUser(parent, args, ctx, info) {
            const { data } = args

            const emailTaken = await User.findOne({ userEmail: data.userEmail })
            if (emailTaken) throw new Error('Email Already Taken')

            const user = new User({
                ...data
            });
            const { _id, userName, userEmail, bio, gender, createdAt } = await user.save();

            return {
                _id,
                userName,
                userEmail,
                bio,
                gender,
                createdAt: createdAt.toDateString()
            }
        },

        async updateUser(parent, args, ctx, info) {
            const { id, data } = args;

            const emailTaken = await User.findOne({ userEmail: data.userEmail })
            if (emailTaken) throw new Error('Email Already Taken')

            const teamExists = await Team.findById({'_id':data.team})
            if(!teamExists) throw new Error("Specified team does not exist")

            const updateValues = { ...data, team: undefined }

            const updatedUser = await User.findOneAndUpdate({ _id: id }, { $set: updateValues, $addToSet: { teams: data.team }, }, { new: true })
            return updatedUser;
        },


        async deleteUser(parent, args, ctx, info) {
            const { id } = args;

            const deletedUser = await User.findByIdAndRemove({ _id: id });
            const { _id, userName, userEmail, bio, gender, createdAt } = deletedUser;

            return {
                _id,
                userName,
                userEmail,
                bio,
                gender,
                createdAt: createdAt.toDateString()
            }
        },

        async createTeam(parent, args, ctx, info) {
            const { data } = args;

            const userPresent = await User.findById(data.createdBy)
            if (!userPresent) throw new Error("No such user present, check the createdBy")

            const team = new Team({
                ...data
            })

            const { _id, teamName, createdBy, createdAt, description, visibility } = await team.save()

            return {
                _id,
                teamName,
                createdAt: createdAt.toDateString(),
                description,
                visibility,
                createdBy: userPresent
            }

        }
    }
}