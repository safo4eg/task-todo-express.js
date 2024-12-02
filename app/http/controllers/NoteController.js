import Tag from "../../models/Tag.js";
import Note from "../../models/Note.js";
import {validationResult} from "express-validator";

class NoteController {
    async index(req, res) {
        const notes = await Note.find({ user: req.user.id })
            .populate('tags');
        return res.status(200).json(notes);
    }

    async store(req, res) {
        try {
            const {title, content, tags} = req.body;
            let noteData = {title, content, user: req.user.id};

            if(tags) {
                const existingTags = await Tag.find({ title: { $in: tags } });

                let existingTagTitles = [];
                let existingTagIds = [];

                existingTags.forEach((elem) => {
                    existingTagTitles.push(elem.title);
                    existingTagIds.push(elem._id);
                });

                let newTagIds = [];
                for (const elem of tags) {
                    if (!existingTagTitles.includes(elem)) {
                        const tag = await Tag.create({title: elem});
                        newTagIds.push(tag._id);
                    }
                }

                noteData.tags = [...existingTagIds, ...newTagIds];
            }

            const note = await Note.create(noteData);

            return res.status(201).json(note);
        } catch (e) {
            return res.status(500).json({message: e});
        }
    }

    async show(req, res) {
        try {
            const note = req.note;
            return res.status(200).json(note);
        } catch (e) {
            return res.status(500).json({ message: e });
        }
    }

    async update(req, res) {
        try {
            const note = req.note;
            const {title = null, content = null, tags = null} = req.body;

            if(title) note.title = title;
            if(content) note.content = content;
            if(tags) note.tags = tags;

            await note.save();
            return res.status(200).json(note);
        } catch (e) {
            return res.status(500).json({ message: e });
        }
    }

    async destroy(req, res) {
        try {
            const note = req.note;
            await note.deleteOne();
            return res.status(204).json({message: "Заметка была удалена"})
        } catch (e) {
            return res.status(500).json({ message: e });
        }
    }
}

export default new NoteController();