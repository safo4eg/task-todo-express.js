import mongoose from "mongoose";

const User = new mongoose.Schema({
    username: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    role: {type: mongoose.Schema.Types.ObjectId, ref: 'Role', required: true}
});

export default mongoose.model('User', User);