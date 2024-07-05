import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Button, Modal, Table } from 'flowbite-react';
import { HiOutlineExclamationCircle } from "react-icons/hi2";
import { FaTimes, FaCheck } from "react-icons/fa";

function DashUser() {

    const { currentUser } = useSelector((state) => state.user);
    const [users, setUsers] = useState([]);
    const [showMore, setShowMore] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await fetch(`/api/user/getUsers`);
                const data = await res.json();
                if (res.ok) {
                    setUsers(data.users);
                    if (data.users.length < 9) {
                        setShowMore(false);
                    }
                }
            } catch (error) {
                console.log(error);
            }
        }
        if (currentUser.isAdmin) fetchUsers();
    }, [currentUser._id, currentUser.isAdmin]);

    const handleShowMore = async () => {
        const startIndex = users.length;
        try {
            const res = await fetch(`/api/user/getusers?startIndex=${startIndex}`);
            const data = await res.json();
            if (res.ok) {
                setUsers((prev) => [...prev, ...data.users]);
                if (data.users.length < 9) {
                    setShowMore(false);
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleDelete = async () => {

    }

    return (
        <div className="md:ml-14 w-full table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
            {
                currentUser && currentUser.isAdmin && users.length > 0 ? (
                    <>
                        <Table hoverable className="shadow-md">
                            <Table.Head>
                                <Table.HeadCell>Date Created</Table.HeadCell>
                                <Table.HeadCell>User Image</Table.HeadCell>
                                <Table.HeadCell>Username</Table.HeadCell>
                                <Table.HeadCell>User Email</Table.HeadCell>
                                <Table.HeadCell>Admin</Table.HeadCell>
                                <Table.HeadCell>Delete</Table.HeadCell>
                            </Table.Head>

                            {
                                users.map((user) => (
                                    <Table.Body key={user._id} className="divide-y">
                                        <Table.Row className="bg-white dark:border-gray-600 dark:bg-gray-800">
                                            <Table.Cell className="font-medium text-gray-900 dark:text-white">{new Date(user.createdAt).toLocaleDateString()}</Table.Cell>
                                            <Table.Cell><img src={user.profilePicture} alt={user.username} className="h-10 w-10 object-cover bg-gray-500" /></Table.Cell>
                                            <Table.Cell><div className="font-medium text-gray-900 dark:text-white">{user.username}</div></Table.Cell>
                                            <Table.Cell className="font-medium text-gray-900 dark:text-white">{user.email}</Table.Cell>
                                            <Table.Cell className="font-medium text-gray-900 dark:text-white">{user.isAdmin ? <FaCheck className="text-green-500" /> : <FaTimes className="text-red-500" />}</Table.Cell>
                                            <Table.Cell><span onClick={() => {
                                                setShowModal(true)
                                                setUserId(user._id)
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
                        <h3 className="text-red-400 mb-5">Are you sure you want to delete your Post?</h3>

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

export default DashUser;