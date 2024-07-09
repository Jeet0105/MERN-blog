import { useEffect, useState } from "react";
import moment from "moment";
import { FaThumbsUp } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { Button, Textarea } from "flowbite-react";

export default function Comment({ comment, onLike, onEdit }) {
    const [user, setUser] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [editedContent, setEditedContent] = useState(comment.content);
    const { currentUser } = useSelector(state => state.user);

    useEffect(() => {
        const getUser = async () => {
            try {
                const res = await fetch(`/api/user/${comment.userId}`);
                if (res.ok) {
                    const data = await res.json();
                    setUser(data);
                }
            } catch (error) {
                console.error(error);
            }
        };
        getUser();
    }, [comment.userId]);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = async () => {
        try {
            const res = await fetch(`/api/comment/editComment/${comment._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ content: editedContent })
            });
            if (res.ok) {
                setIsEditing(false);
                onEdit(comment, editedContent);
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="flex flex-col gap-2 mt-5 pb-5 border-b dark:border-gray-600 text-sm">
            <div className="flex">
                <div className="flex-shrink-0 mr-3">
                    <img src={user.profilePicture} alt="User Profile" className="h-10 w-10 object-cover rounded-full bg-gray-200" />
                </div>
                <div className="flex items-center mb-1">
                    <span className="font-bold mr-1 text-sm truncate">{user.username ? `@${user.username}` : "Anonymous User"}</span>
                    <span className="text-gray-500 text-xs">{moment(comment.createdAt).fromNow()}</span>
                </div>
            </div>
            {isEditing ? (
                <>
                    <Textarea value={editedContent} onChange={(e) => setEditedContent(e.target.value)} className="mb-2" />
                    <div className="flex items-center justify-end gap-3 text-sm">
                        <Button type="button" size='sm' gradientDuoTone='purpleToBlue' onClick={handleSave}>Save</Button>
                        <Button type="button" size='sm' gradientDuoTone='purpleToBlue' outline onClick={() => setIsEditing(false)}>Cancel</Button>
                    </div>
                </>
            ) : (
                <>
                    <p className="ml-14 text-gray-500 mb-2">{comment.content}</p>
                    <div className="flex items-center gap-2 max-w-fit">
                        <button type="button" onClick={() => onLike(comment._id)} className={`ml-14 hover:text-blue-500 ${currentUser && comment.likes.includes(currentUser._id) ? 'text-blue-500' : 'text-gray-400'}`}>
                            <FaThumbsUp className="text-sm" />
                        </button>
                        <p className="text-gray-400 text-xs">
                            {comment.numberOfLikes > 0 && `${comment.numberOfLikes} ${comment.numberOfLikes === 1 ? "Like" : "Likes"}`}
                        </p>
                        {currentUser && (currentUser._id === comment.userId || currentUser.isAdmin) && (
                            <button type="button" className="text-gray-400 hover:text-blue-500" onClick={handleEdit}>Edit</button>
                        )}
                    </div>
                </>
            )}
        </div>
    );
}
