const bcrypt = require('bcrypt');
const validator = require("validator");
const validateSignupApi = (req) => {
    const { firstName, lastName, gender, email, password } = req.body;
    if (!firstName || !lastName) {
        throw new Error('Name is required')
    } else if (!validator.isEmail(email)) {
    throw new Error("Email is not valid")
    } else if (!validator.isStrongPassword(password)) {
        throw new Error("password is not strong")
    }
}


const validateProfileEditRequestBody = (req) => {
    const allowedEditFiels = ["firstName", "lastName", "age", "gender", "about", "photoUrl", "skills"];
    const isValid = Object.keys(req.body).every((key) => allowedEditFiels.includes(key))
    return isValid
}

const sanitizeProfileEditRequestBody =async(req) => {

    Object.keys(req.body).forEach((key) => {
        const field = req.body[key]
        if (key === 'firstName' || key === 'lastName') {
            if (!field) {
                throw new Error("Name is required")
            }
        } else if (key=== 'photoUrl') {
            if (!validator.isURL(field)) {
                throw new Error("Photo url is not valid")
            }
        } else if (key === 'skills') {
            if (field.length > 10) {
                throw new Error("skills can't update more than 10 ")
            }
        }
    })


}
const checkOldPasswordAndNewPassword = (req) => {
    if (!req.body.oldPassword) {
        throw new Error("old password is required")
    } else if (!req.body.newPassword) {
        throw new Error("new password is required")
    }
    return true
}

const checkOldPasswordIsRight = async(oldPassword,hashedPassword) => {
    const isPasswordVerified = bcrypt.compare(oldPassword, hashedPassword)
    return isPasswordVerified
}

const validateNewPassword = async (newPassword) => {
    if (!validator.isStrongPassword(newPassword)) {
        throw new Error("password is not strong")
    }
}
module.exports = {
    validateSignupApi,
    validateProfileEditRequestBody,
    sanitizeProfileEditRequestBody,
    checkOldPasswordAndNewPassword,
    checkOldPasswordIsRight,
    validateNewPassword
}