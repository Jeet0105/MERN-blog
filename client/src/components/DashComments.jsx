import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Button, Modal, Table } from 'flowbite-react';
import { HiOutlineExclamationCircle } from "react-icons/hi2";

function DashComments() {

    const { currentUser } = useSelector((state) => state.user);
    const [comments, setComments] = useState([]);
    const [showMore, setShowMore] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [commentId, setCommentId] = useState(null);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const res = await fetch(`/api/comment/getComments`);
                const data = await res.json();
                if (res.ok) {
                    setComments(data.comments);
                    if (data.comments.length < 9) {
                        setShowMore(false);
                    }
                }
            } catch (error) {
                console.log(error);
            }
        }
        if (currentUser.isAdmin) fetchComments();
    }, [currentUser._id, currentUser.isAdmin]);

    const handleShowMore = async () => {
        const startIndex = comments.length;
        try {
            const res = await fetch(`/api/comment/getcomments?startIndex=${startIndex}`);
            const data = await res.json();
            if (res.ok) {
                setComments((prev) => [...prev, ...data.comments]);
                if (data.users.length < 9) {
                    setShowMore(false);
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleDelete = async () => {
        try {
            const res = await fetch(`/api/comment/deleteComment/${commentId}`, {
                method: 'DELETE'
            });
            const data = await res.json();
            if (res.ok) {
                setComments((prev) => prev.filter((user) => user._id !== commentId));
                showModal(false);
            } else {
                console.log(data.message);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="md:ml-14 w-full table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
            {
                currentUser && currentUser.isAdmin && comments.length > 0 ? (
                    <>
                        <Table hoverable className="shadow-md">
                            <Table.Head>
                                <Table.HeadCell>Date Updated</Table.HeadCell>
                                <Table.HeadCell>Comment content</Table.HeadCell>
                                <Table.HeadCell>No of like</Table.HeadCell>
                                <Table.HeadCell>PostId</Table.HeadCell>
                                <Table.HeadCell>UserId</Table.HeadCell>
                                <Table.HeadCell>Delete</Table.HeadCell>
                            </Table.Head>

                            {
                                comments.map((comment) => (
                                    <Table.Body key={comment._id} className="divide-y">
                                        <Table.Row className="bg-white dark:border-gray-600 dark:bg-gray-800">
                                            <Table.Cell className="font-medium text-gray-900 dark:text-white">
                                                {new Date(comment.updatedAt).toLocaleDateString()}
                                            </Table.Cell>
                                            <Table.Cell>{comment.content}</Table.Cell>
                                            <Table.Cell><div className="font-medium text-gray-900 dark:text-white">{comment.numberOfLikes}</div></Table.Cell>
                                            <Table.Cell className="font-medium text-gray-900 dark:text-white">{comment.postId}</Table.Cell>
                                            <Table.Cell>{comment.postId}</Table.Cell>
                                            <Table.Cell><span onClick={() => {
                                                setShowModal(true)
                                                setCommentId(comment._id)
                                            }} className="font-medium text-red-500 cursor-pointer hover:underline">Delete</span></Table.Cell>
                                        </Table.Row>
                                    </Table.Body>
                                ))
                            }

                        </Table>

                        {
                            showMore && (
                                <button onClick={handleShowMore} className="w-full text-teal-500 self-center text-sm py-7">Show More</button>
                            )
                        }
                    </>
                ) : (
                    <p>You are not authorised...</p>
                )
            }
            <Modal show={showModal} onClick={() => setShowModal(false)} popup size='md'>
                <Modal.Header />
                <Modal.Body>
                    <div className="text-center">
                        <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 mb-4 mx-auto dark:text-gray-200" />
                        <h3 className="text-red-400 mb-5">Are you sure you want to delete your Comment?</h3>

                        <div className="flex justify-center gap-4">
                            <Button color='failure' onClick={handleDelete}>Yes I&apos;m sure</Button>
                            <Button color='gray' onClick={() => setShowModal(false)}>No, Cancle</Button>
                        </div>

                    </div>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default DashComments;