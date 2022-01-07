const mongoose = require('mongoose')
const crypto = require('crypto');
const uuidv1 = require('uuid/v1')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32,
    },
    lastname: {
        type: String,
        trim: true,
        maxlength: 32,
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    userinfo: {
        type: String,
        trim: true,
    },
    // TODO: Password things
    encry_password: {
        type: String,
        required: true,
    },
    salt: String,
    ////  used for Privilegs 
    role: {
        type: Number,
        default: 0,
    },
    // For purchasing a produxt 
    purchases: {
        type: Array,
        Default: [],
    }
}, { timestamps: true });


userSchema.virtual("password")
    .set(function (password) {
        this._password = password
        this.salt = uuidv1();
        this.encry_password = this.securePassword(password)
    })
    .get(function () {
        return this._password
    })


userSchema.methods = {

    // Need a Method to call where we cam match the Hash  Values.
    authenticate: function (plainpassword) {
        return this.securePassword(plainpassword) === this.encry_password;
    },

    securePassword: function (plainpassword) {
        if (!plainpassword) return "";                    // is there is no password return blank 
        try {
            return crypto.createHmac('sha256', this.salt)                //update the slat 
                .update(plainpassword)                 // Updat the plain password 
                .digest('hex');
        } catch (error) {
            return "";
        }

    }
}


module.exports = mongoose.model("User", userSchema)



