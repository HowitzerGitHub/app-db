const User = require('../models/User')

module.exports = {
    Mutation: {
        async createUser(parent, args, ctx, info) {
            const { data } = args

            const emailTaken = await User.findOne({ userEmail: data.userEmail })
                if (emailTaken) throw new Error('Email Already Taken')
            
            const user = new User({
                // userName:  data.userName,
                // userEmail:  data.userEmail,
                // pic: data.pic,
                // bio: data.bio,
                // gender: data.gender
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
            const updateValues = { ...data }
            const updatedUser = await User.findOneAndUpdate({ _id: id }, updateValues, { new: true })
            return updatedUser;
        },

        async deleteUser(parent, args, ctx, info) {
            const { id } = args;
            const deletedUser = await User.findByIdAndRemove({ _id: id });
            console.log(deletedUser)
            const { _id, userName, userEmail, bio, gender, createdAt } = deletedUser;
            return {
                _id,
                userName,
                userEmail,
                bio,
                gender,
                createdAt: createdAt.toDateString()
            }
        }
    }
}