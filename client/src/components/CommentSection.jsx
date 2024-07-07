import { Alert, Button, Textarea } from "flowbite-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function CommentSection({ postId }) {
    const { currentUser } = useSelector((state) => state.user);
    const [comment, setComment] = useState('');
    const [commentError, setCommentError] = useState('');

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
                            setComment(e.target.value)
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
        </div>
    );
}
