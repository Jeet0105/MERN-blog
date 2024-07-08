import { useEffect, useState } from "react";
import moment from "moment";
import { FaThumbsUp } from "react-icons/fa";
import { useSelector } from 'react-redux';

export default function Comment({ comment, onLike }) {
    const [user, setUser] = useState({});
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
    }, [comment]);

    return (
        <div className="flex flex-col gap-2 mt-5 pb-5 border-b dark:border-gray-600 text-sm">
            <div className="flex">
                <div className="flex-shrink-0 mr-3">
                    <img src={user.profilePicture} alt="User Profile" className="h-10 w-10 object-cover rounded-full bg-gray-200" />
                </div>
                <div className="flex items-center mb-1">
                    <span className="font-bold mr-1 text-sm truncate">{user ? `@${user.username}` : "Anonymous User"}</span>
                    <span className="text-gray-500 text-xs">{moment(comment?.createdAt).fromNow()}</span>
                </div>
            </div>
            <p className="ml-14 text-gray-500 mb-2">{comment?.content}</p>
            <div className="flex items-center gap-2 max-w-fit">
                <button type="button" onClick={() => onLike(comment?._id)} className={`ml-14 hover:text-blue-500 ${currentUser && comment.likes.includes(currentUser._id) ? 'text-blue-500' : 'text-gray-400'}`}>
                    <FaThumbsUp className="text-sm" />
                </button>
                <p className="text-gray-400 text-xs">
                    {
                        comment.numberOfLikes > 0 && comment.numberOfLikes + " " + (comment.numberOfLikes === 1 ? "Like" : "Likes")
                    }
                </p>
            </div>
        </div>
    );
}
