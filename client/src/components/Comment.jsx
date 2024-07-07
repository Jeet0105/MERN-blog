import { useEffect, useState } from "react";
import moment from "moment";

export default function Comment({ comment }) {
    const [user, setUser] = useState({});

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
                    <span className="text-gray-500 text-xs">{moment(comment.createdAt).fromNow()}</span>
                </div>
            </div>
            <p className="ml-14 text-gray-500 mb-2">{comment.content}</p>
        </div>
    );
}