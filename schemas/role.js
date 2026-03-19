const mongoose = require("mongoose");
const mongooseDelete = require('mongoose-delete');
const Schema = mongoose.Schema;

const RoleSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        default: ""
    }
}
);
RoleSchema.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all'
}, {
    timestamps: true
})


module.exports = mongoose.model("Role", RoleSchema);