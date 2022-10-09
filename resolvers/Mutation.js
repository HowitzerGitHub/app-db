const User = require('../models/User')
const Team = require('../models/Team')
const Curriculum = require('../models/Curriculum')
const Subject = require('../models/Subject')
const Chapter = require('../models/Chapter')

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

            if (data.userEmail) {
                const emailTaken = await User.findOne({ userEmail: data.userEmail })
                if (emailTaken) throw new Error('Email Already Taken')
            }

            if (data.team) {
                const teamExists = await Team.findById({ '_id': data.team })
                if (!teamExists) throw new Error("Specified team does not exist")
            }


            const updateValues = { ...data, team: undefined }

            if(!data.addTeam){
                const updatedUser = await User.findOneAndUpdate({ _id: id }, { $set: updateValues, $pull: { teams: data.team }, }, { new: true })
                return updatedUser
            }
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
                createdBy
            }

        },

        async updateTeam(parent, args, ctx, info) {
            const { id, data } = args;

            const teamExists = await Team.findById(id)
            if (!teamExists) throw new Error("Team does not Exists")

            if (data.createdBy) {
                const userPresent = await User.findById(data.createdBy);
                if (!userPresent) throw new Error("No such user present, check the createdBy");
            }


            const updatedTeam = await Team.findByIdAndUpdate({ _id: id }, { ...data }, { new: true });
            return updatedTeam;
        },


        async deleteTeam(parent, args, ctx, info) {
            const { id } = args;

            const teamExists = await Team.findById(id)
            if (!teamExists) throw new Error("Team does not Exists")

            const deletedTeam = await Team.findByIdAndRemove({ _id: id });
            return deletedTeam;
        },


        async createCurriculum(parent, args, ctx, info) {
            const { data } = args

            const teamExists = await Team.findById({ _id: data.team })
            if (!teamExists) throw new Error('Specidfied Team Does not exists')

            const userPresent = await User.findById(data.createdBy)
            if (!userPresent) throw new Error("No such user present, check the createdBy")

            const curriculum = new Curriculum({
                ...data
            })

            const createdCurriculum = await curriculum.save();

            return createdCurriculum
        },

        async updateCurriculum(parent, args, ctx, info) {
            const { id, data } = args

            const curriculumExists = await Curriculum.findById(id);
            if (!curriculumExists) throw new Error("Curriculum doses not exists")

            if (data.team) {
                const teamExists = await Team.findById({ _id: data.team })
                if (!teamExists) throw new Error('Specidfied Team Does not exists')
            }

            if (data.createdBy) {
                const userPresent = await User.findById(data.createdBy)
                if (!userPresent) throw new Error("No such user present, check the createdBy")
            }

            const updatedCurriculum = await Curriculum.findByIdAndUpdate({ _id: id }, { ...data }, { new: true })
            return updatedCurriculum

        },

        async deleteCurriculum(parent, args, ctx, info){
            const {id} = args

            const curriculumExists = await Curriculum.findById(id);
            if (!curriculumExists) throw new Error("Curriculum doses not exists") 

            const deletedCurriculum =  await Curriculum.findByIdAndRemove(id)
            return deletedCurriculum;
        },

        async createSubject(parent, args, ctx, info){
            const {data} = args
            // console.log(data.curriculum)
            const curriculumExists = await Curriculum.findById(data.curriculum)
            if(!curriculumExists) throw new Error("Curriculum does not exists")


            const sameNameExists = await Subject.findOne({ $and: [ {"curriculum": { $eq: data.curriculum } } , { "subjectName" : { $eq: data.subjectName } } ] })
            if(sameNameExists) throw new Error("Same subject Name Present")

            const subject = new Subject({
                ...data
            })

            const createdSubject = await subject.save()

            return createdSubject;

        },

        async updateSubject(parent, args, ctx, info){
            const {id, data} = args

            const subjectExists = await Subject.findById(id)
            if(!subjectExists) throw new Error("Subject Not found")

            
            const updateValues = { ...data,refrences:undefined }

            const updatedSubject = await Subject.findOneAndUpdate({ _id: id }, { $set: updateValues, $addToSet: { refrences: data.refrences }, }, { new: true })
            return updatedSubject;

        },

        async deleteSubject(parent, args, ctx, info){
            const deletedSubject = await Subject.findByIdAndRemove(args.id)
            return deletedSubject;
        },

        async createChapter(parent, args, ctx, info){
            const {data} = args

            const subjectExists = await Subject.findById(data.subject)
            if(!subjectExists) throw new Error("Subject Not found")

            const sameNameExists = await Chapter.findOne({ $and: [ {"subject": { $eq: data.subject } } , { "chapterName" : { $eq: data.chapterName } } ] })
            if(sameNameExists) throw new Error("Same chapter Name Present")

            const chapter = new Chapter({
                ...data
            })

            const createdChapter = await chapter.save()

            console.log(createdChapter)
            return createdChapter
        },
    }
}