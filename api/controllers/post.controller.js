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

        const post = new Post({
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

export const getPosts = async (req, res, next) => {
    try {
        const startIndex = parseInt(req.query.startIndex) || 0;
        const limit = parseInt(req.query.limit) || 9;
        const sortDirection = req.query.order === 'asc' ? 1 : -1;

        const query = {
            ...(req.query.userId && { userId: req.query.userId }),
            ...(req.query.category && { category: req.query.category }),
            ...(req.query.slug && { slug: req.query.slug }),
            ...(req.query.postId && { _id: req.query.postId }),
            ...(req.query.searchTerm && {
                $or: [
                    { title: { $regex: req.query.searchTerm, $options: 'i' } },
                    { content: { $regex: req.query.searchTerm, $options: 'i' } },
                ]
            })
        };

        const posts = await Post.find(query)
            .sort({ updatedAt: sortDirection })
            .skip(startIndex)
            .limit(limit);

        const totalPost = await Post.countDocuments();

        const now = new Date();

        const oneMonthAgo = new Date(
            now.getFullYear(),
            now.getMonth() - 1,
            now.getDate()
        );

        const lastMonthPosts = await Post.countDocuments({
            createdAt: { $gte: oneMonthAgo }
        });

        res.status(200).json({
            posts,
            totalPost,
            lastMonthPosts
        });
    } catch (error) {
        next(error);
    }
};

export const deletePost = async (req, res, next) => {
    if (!req.user.isAdmin  || req.user.id!==req.params.userId) {
        return next(errorHandler(403, 'You are not allowed to delete a post'));
    }
    try {
        await Post.findByIdAndDelete(req.params.postId);
        res.status(200).json('Post has been deleted')
    } catch (error) {
        next(error);
    }
}