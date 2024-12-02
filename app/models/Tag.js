import mongoose from "mongoose";
import Note from "./Note.js";

const Tag = mongoose.Schema({
    title: {type: String, required: true},
    notes: [{type: mongoose.Schema.Types.ObjectId, ref: 'Note'}]
});

export default mongoose.model('Tag', Tag);