const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const forgetSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    access_token: {
        type: String,
        required: true
    },
    verified: {
        type: Boolean,
        required: true
    }
},
    {
        timestamps: true
    }
);

const Foget = mongoose.model("Forget", forgetSchema);

module.exports = Foget;