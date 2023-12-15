const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/todoDB')
const plm = require('passport-local-mongoose');
const userSchema = mongoose.Schema({
    username: String,
    email: String,
    password: String,
    profileImage: String,
    tasks:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "task"
    }
})
userSchema.plugin(plm);
module.exports = mongoose.model("user", userSchema);