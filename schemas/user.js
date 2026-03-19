const mongoose = require("mongoose");
const mongooseDelete = require('mongoose-delete');
const Schema = mongoose.Schema;

const UserSchema = new Schema({

    username: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    fullName: {
        type: String,
        default: ""
    },

    avatarUrl: {
        type: String,
        default: "https://i.sstatic.net/l60Hf.png"
    },

    status: {
        type: Boolean,
        default: false
    },

    role: {
        type: Schema.Types.ObjectId,
        ref: "Role"
    },

    loginCount: {
        type: Number,
        default: 0,
        min: 0
    },

    deleted: {
        type: Boolean,
        default: false
    }

}, 
)
UserSchema.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all'
}, {
    timestamps: true
})

module.exports = mongoose.model("User", UserSchema);