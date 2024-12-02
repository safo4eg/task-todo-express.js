import mongoose from "mongoose";
import User from "./User.js";

const Note = mongoose.Schema({
    title: {type: String, required: true},
    content: {type: String, required: true},
    createdAt: {type: Date, default: Date.now()},
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    tags: [{type: mongoose.Schema.Types.ObjectId, ref: 'Tag'}]
});

export default mongoose.model('Note', Note);