class NotePolicy {
    async store(req, res, next) {
        // empty
    }

    async show(req, res, next) {
        const note = req.note;
        if(note.user.toString() !== req.user.id) {
            return res.status(401).json({ message: "У вас нет доступа к этому ресурсу." });
        }
        next();
    }

    async update(req, res, next) {
        const note = req.note;
        if(note.user.toString() !== req.user.id) {
            return res.status(401).json({ message: "У вас нет доступа к этому ресурсу." });
        }
        next();
    }

    async destroy(req, res, next) {
        const note = req.note;
        if(note.user.toString() !== req.user.id) {
            return res.status(401).json({ message: "У вас нет доступа к этому ресурсу." });
        }
        next();
    }
}

export default new NotePolicy();