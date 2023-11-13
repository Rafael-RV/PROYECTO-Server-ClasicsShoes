const User = require('../models/User.model')
const bcrypt = require('bcrypt')
const validator = require('validator')

const signUp = async (req, res) => {
    try {
        const { mail, password } = req.body

        if (!validator.isEmail(mail)) {
            return res.json({
                message: 'Invalid email address'
            });
        }

        const existingUser = await User.findOne({ mail })
        
        if (existingUser) {
            return res.json({
                message: 'user already exists'
            })
        }
        const user = new User(req.body)
        user.hashPassword(req.body.password)
        const resp = await user.save()
        res.json({
            message: 'The user has been created successfully.',
            detail: user.onSignUpGenerateJWT()
        })
    } catch (error) {
        return res.json({
            message: 'Error',
            detail: error.message
        })
    }
}

const login = async (req, res) => {
    try {
        const { mail, password } = req.body
        const userFound = await User.findOne({ mail })
        if (!userFound) {
            return res.json({
                messsage: "user not found"
            })
        }
        const isCorrectPassword = await bcrypt.compareSync(password, userFound.password)
        if (!isCorrectPassword) {
            return res.json({
                message: "Incorrect password"
            })
        }
        return res.json({
            message: 'Ok',
            detail: { user: userFound, token: userFound.generateJWT() }
        })
    } catch (error) {
        return res.json({
            message: 'Error',
            detail: error.message
        })
    }
}

const getUsers = async (req, res) => {
    try {
        const resp = await User.find().populate('products')
        return res.json({
            message: "Users",
            detail: resp
        })
    } catch (error) {

        return res.json({
            message: 'Error',
            detail: error.message
        })
    }
}

const updateUser = async (req, res) => {
    try {
        const newData = req.body
        const resp = await User.findByIdAndUpdate(
            newData.userId,
            { $set: newData },
            { new: true })
        return res.json({
            message: 'The user has been updated successfully.',
            detail: resp
        })
    } catch (error) {
        return res.json({
            message: 'Error',
            detail: error.message
        })
    }
}

const deleteUser = async (req, res) => {
    try {
        const resp = await User.findByIdAndDelete(req.body.userId)

        return res.json({
            message: 'The user has been deleted successfully.'
        })
    } catch (error) {
        return res.json({
            message: 'Error',
            detail: error.message
        })
    }
}


module.exports = {
    signUp,
    login,
    getUsers,
    updateUser,
    deleteUser
}
