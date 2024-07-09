import { Alert, Button, Modal, Textarea } from "flowbite-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Comment from "./Comment";
import { HiOutlineExclamationCircle } from "react-icons/hi";

export default function CommentSection({ postId }) {
    const { currentUser } = useSelector((state) => state.user);
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([]);
    const [commentError, setCommentError] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [commentToDelete, setCommentToDelete] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setCommentError('');

        if (!comment.trim()) {
            setCommentError('Comment cannot be empty.');
            return;
        }

        if (comment.length > 200) {
            setCommentError('Comment exceeds the maximum length of 200 characters.');
            return;
        }

        try {
            const res = await fetch("/api/comment/create", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ content: comment, postId, userId: currentUser._id })
            });

            if (res.ok) {
                const newComment = await res.json();
                setComments([newComment, ...comments]);
                setComment('');
            } else {
                const data = await res.json();
                setCommentError(data.message || 'Failed to submit comment.');
            }
        } catch (error) {
            setCommentError('An error occurred. Please try again.');
            console.error(error);
        }
    };

    useEffect(() => {
        const getComments = async () => {
            try {
                const res = await fetch(`/api/comment/getPostComment/${postId}`);
                if (res.ok) {
                    const data = await res.json();
                    setComments(data);
                }
            } catch (error) {
                console.error(error);
            }
        };
        getComments();
    }, [postId]);

    const handleLike = async (commentId) => {
        try {
            if (!currentUser) {
                navigate('/sign-in');
                return;
            }

            const res = await fetch(`/api/comment/likeComment/${commentId}`, {
                method: 'PUT',
            });

            if (res.ok) {
                const data = await res.json();
                setComments(comments.map((comment) =>
                    comment._id === commentId ? {
                        ...comment,
                        likes: data.likes,
                        numberOfLikes: data.likes.length,
                    } : comment
                ));
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleEdit = (comment, editedContent) => {
        setComments(
            comments.map((c) =>
                c._id === comment._id ? { ...c, content: editedContent } : c
            )
        );
    };

    const handleDelete = async () => {
        if (!commentToDelete) return;
        try {
            const res = await fetch(`/api/comment/deleteComment/${commentToDelete}`, {
                method: 'DELETE'
            });

            if (res.ok) {
                setComments(comments.filter(comment => comment._id !== commentToDelete));
                setShowModal(false);
                setCommentToDelete(null);
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="max-w-2xl mx-auto w-full p-3">
            {currentUser ? (
                <div className="flex items-center gap-1 my-5 text-gray-500 text-xs">
                    <p>Signed in as:</p>
                    <img src={currentUser.profilePicture} alt="Profile Picture" className="h-5 w-5 object-cover rounded-full" />
                    <Link to="/dashboard?tab=profile" className="text-cyan-600 hover:underline">
                        @{currentUser.username}
                    </Link>
                </div>
            ) : (
                <div className="text-sm text-teal-500 my-5 flex gap-1">
                    <p>You must be signed in to comment.</p>
                    <Link to='/sign-in' className="text-blue-500 hover:underline">
                        Sign In
                    </Link>
                </div>
            )}
            {currentUser && (
                <form onSubmit={handleSubmit} className="border border-teal-500 rounded-md p-3">
                    <Textarea
                        placeholder="Add a comment..."
                        rows='3'
                        maxLength='200'
                        value={comment}
                        onChange={(e) => {
                            setComment(e.target.value);
                            setCommentError('');
                        }}
                    />
                    <div className="flex justify-between mt-3 items-center">
                        <p className="text-gray-500 text-sm">{200 - comment.length} characters remaining</p>
                        <Button gradientDuoTone='purpleToBlue' type="submit" outline>Submit</Button>
                    </div>
                    {commentError && (
                        <Alert color='failure'>{commentError}</Alert>
                    )}
                </form>
            )}
            {comments.length === 0 ? (
                <p className="text-sm my-5">No comments yet!</p>
            ) : (
                <>
                    <div className="text-sm my-5 flex items-center gap-1">
                        <p>Comments:</p>
                        <div className="border border-gray-400 py-1 px-2 rounded-sm">
                            <p>{comments.length}</p>
                        </div>
                    </div>
                    {comments.map((comment) => (
                        <Comment
                            key={comment?._id}
                            comment={comment}
                            onLike={handleLike}
                            onEdit={handleEdit}
                            onDelete={(commentId) => {
                                setShowModal(true);
                                setCommentToDelete(commentId);
                            }}
                        />
                    ))}
                </>
            )}
            <Modal show={showModal} onClose={() => setShowModal(false)} popup size='md'>
                <Modal.Header />
                <Modal.Body>
                    <div className="text-center">
                        <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 mb-4 mx-auto dark:text-gray-200" />
                        <h3 className="text-red-400 mb-5">Are you sure you want to delete this comment?</h3>
                        <div className="flex justify-center gap-4">
                            <Button color='failure' onClick={handleDelete}>Yes, I'm sure</Button>
                            <Button color='gray' onClick={() => setShowModal(false)}>No, Cancel</Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
}
