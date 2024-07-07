import Comment from "../models/comment.model.js";
import { errorHandler } from "../utils/error.js";

export const createComment = async (req, res, next) => {
    try {
        const { content, postId, userId } = req.body;

        if (!content || !postId || !userId) {
            next(errorHandler(400, 'All fields are required'))
        }

        if (userId != req.user.id) {
            return next(errorHandler(403, 'You are not allowed to create the comment'));
        }

        const newComment = new Comment({
            content,
            postId,
            userId
        })

        await newComment.save();

        res.status(200).json(newComment);
    } catch (error) {
        next(error);
    }
};

export const getPostComment = async (req, res, next) => {
    try {
        const comments = await Comment.find({ postId: req.params.postId }).sort({ createdAt: -1 });

        if (!comments) {
            return next(errorHandler(404, 'No comments found for this post.'));
        }

        res.status(200).json(comments);
    } catch (error) {
        next(error);
    }
};