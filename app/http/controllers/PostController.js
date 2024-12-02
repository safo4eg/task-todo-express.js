class PostController {
    async index(req, res) {

    }

    async store(req, res) {
        try {
            const {author, title, content, picture} = req.body;
            const post = await Post.create({author, title, content, picture});
            res.json(post);
        } catch (e) {
            res.status(500).json(e);
        }
    }

    async show(req, res) {

    }

    async update(req, res) {

    }

    async destroy(req, res) {

    }
}

export default new PostController();