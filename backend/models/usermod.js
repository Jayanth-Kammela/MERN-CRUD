const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')
const crypto = require('crypto');

const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        trim: true,
        required: true
    },
    cryptoToken: { type: String, default: null },
    cryptoTokenExp: { type: Date, default: null }
})

userSchema.statics.signup = async function (email, password) {

    if (!email || !password) {
        throw Error('All fields must be filled')
    }
    if (!validator.isEmail(email)) {
        throw Error('Email not valid')
    }
    if (!validator.isStrongPassword(password)) {
        throw Error('Password must be strong')
    }


    const exists = await this.findOne({ email })

    if (exists) {
        throw Error('Email already in use')
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({ email, password: hash })

    return user
}

userSchema.statics.login = async function (email, password) {

    if (!email || !password) {
        throw Error('All fields must be filled')
    }

    const user = await this.findOne({ email })
    if (!user) {
        throw Error('Incorrect email')
    }

    const match = await bcrypt.compare(password, user.password)
    if (!match) {
        throw Error('Incorrect password')
    }

    return user
}

userSchema.methods.createTokenCrypto = async function () {

    const token = crypto.randomBytes(20).toString("hex");
    this.cryptoToken = token;
    this.cryptoTokenExp = Date.now() + 3600000;
    await this.save();
    return token;

    // const cryptoToken = crypto.randomBytes(24).toString('hex');
    // this.resetPassword = crypto.createHash('sha256').update(cryptoToken).digest('hex')
    // this.resetPasswordExp = Date.now() + 60 * 60 * 1000 //1hr
    // const tToken = { cryptoToken, cryptoTokenExp }
    // this.save()
    // return cryptoToken

}

userSchema.methods.updatePassword = async function (newPassword) {
    if (Date.now > this.cryptoTokenExp) {
        throw Error('Password link expired')
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(newPassword, salt);
    this.password = hash;
    this.cryptoToken = null;
    this.cryptoTokenExp = null;
    await this.save()
}

module.exports = mongoose.model('UsersAccounts', userSchema)