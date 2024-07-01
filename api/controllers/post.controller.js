import { Post } from "../models/post.model.js";
import { errorHandler } from "../utils/error.js"

export const create = async (req, res, next) => {
    try {
        if (!req.user.isAdmin) {
            return next(errorHandler(403, 'You are not allowed to create a post'));
        }
    
        if (!req.body.title || !req.body.content) {
            return next(errorHandler(400, 'Please provide all required fields'));
        }
    
        const slug = req.body.title
            .split(' ')
            .join('-')
            .toLowerCase()
            .replace(/[^a-z0-9-]+/g, '')
            .replace(/^-+|-+$/g, '')
            .replace(/--+/g, '-');
    
        const post = new Post ({
            ...req.body,
            slug,
            userId: req.user.id
        });
        const savedPost = await post.save();
        res.status(201).json((savedPost))
    } catch (error) {
        next(error);
    }
};