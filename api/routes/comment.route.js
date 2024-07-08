import express from "express";
import { createComment, getPostComment, likeComment } from "../controllers/comment.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post('/create', verifyToken, createComment);
router.get('/getPostComment/:postId', getPostComment);
router.put('/likeComment/:commentId', verifyToken, likeComment);

export default router;