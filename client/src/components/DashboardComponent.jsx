import { useEffect, useState } from "react"
import { useSelector } from 'react-redux';
import { HiOutlineUserGroup, HiArrowNarrowUp, HiAnnotation, HiDocumentText } from "react-icons/hi";
import { Button, Table } from "flowbite-react";
import { Link } from 'react-router-dom';

function DashboardComponent() {
    const [user, setUser] = useState([]);
    const [comments, setComments] = useState([]);
    const [posts, setPosts] = useState([]);
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalPosts, setTotalPosts] = useState(0);
    const [totalComments, setTotalComments] = useState(0);
    const [lastMonthUsers, setLastMonthUsers] = useState(0);
    const [lastMonthPosts, setLastMonthPosts] = useState(0);
    const [lastMonthComments, setLastMonthComments] = useState(0);
    const { currentUser } = useSelector((state) => state.user);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await fetch('/api/user/getUsers?limit=5');
                const data = await res.json();
                if (res.ok) {
                    setUser(data.users);
                    setTotalUsers(data.totalUsers);
                    setLastMonthUsers(data.lastMonthUser);
                }
            } catch (error) {
                console.log(error);
            }
        }
        const fetchPosts = async () => {
            try {
                const res = await fetch('/api/post/getposts?limit=5');
                const data = await res.json();
                if (res.ok) {
                    setPosts(data.posts);
                    setTotalPosts(data.totalPost);
                    setLastMonthPosts(data.lastMonthPosts);
                }
            } catch (error) {
                console.log(error);
            }
        }
        const fetchComments = async () => {
            try {
                const res = await fetch('/api/comment/getComments?limit=5');
                const data = await res.json();
                if (res.json) {
                    setComments(data.comments);
                    setTotalComments(data.totalComments);
                    setLastMonthComments(data.lastMonthComments);
                }
            } catch (error) {
                console.log(error);
            }
        }
        if (currentUser.isAdmin) {
            fetchUsers();
            fetchPosts();
            fetchComments();
        }
    }, [currentUser])


    return (
        <div className="md:ml-14 p-3 md:mx-auto">
            <div className="flex flex-wrap gap-4 justify-center">
                <div className="flex flex-col p-3 gap-4 md:w-72 w-full rounded-md shadow-md">
                    <div className="flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md uppercase">
                        <div className="flex justify-between items-center">
                            <div className="text-gray-500 text-md">
                                <h3>Total Users</h3>
                                <p className="text-2xl">{totalUsers}</p>
                            </div>
                            <HiOutlineUserGroup className="bg-teal-600 text-white rounded-full text-5xl p-3 shadow-lg" />
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                            <span className="text-green-500 flex items-center">
                                <HiArrowNarrowUp />
                                {lastMonthUsers}
                            </span>
                            <div className="text-gray-500">Last Month</div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col p-3 gap-4 md:w-72 w-full rounded-md shadow-md">
                    <div className="flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md uppercase">
                        <div className="flex justify-between items-center">
                            <div className="text-gray-500 text-md">
                                <h3>Total Comments</h3>
                                <p className="text-2xl">{totalComments}</p>
                            </div>
                            <HiAnnotation className="bg-indigo-600 text-white rounded-full text-5xl p-3 shadow-lg" />
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                            <span className="text-green-500 flex items-center">
                                <HiArrowNarrowUp />
                                {lastMonthComments}
                            </span>
                            <div className="text-gray-500">Last Month</div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col p-3 gap-4 md:w-72 w-full rounded-md shadow-md">
                    <div className="flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md uppercase">
                        <div className="flex justify-between items-center">
                            <div className="text-gray-500 text-md">
                                <h3>Total Posts</h3>
                                <p className="text-2xl">{totalPosts}</p>
                            </div>
                            <HiDocumentText className="bg-lime-600 text-white rounded-full text-5xl p-3 shadow-lg" />
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                            <span className="text-green-500 flex items-center">
                                <HiArrowNarrowUp />
                                {lastMonthPosts}
                            </span>
                            <div className="text-gray-500">Last Month</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-wrap gap-4 py-3 mx-auto justify-center items-center">

                <div>
                    <div className="flex flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-gray-800">
                        <div className="flex justify-between p-3 text-sm font-semibold items-center">
                            <h1 className="text-center p-2">Recent Users</h1>
                            <Link to={'/dashboard?tab=user'}>
                                <Button gradientDuoTone='purpleToPink' outline>
                                    See all
                                </Button>
                            </Link>
                        </div>
                        <Table hoverable>
                            <Table.Head>
                                <Table.HeadCell>User Image</Table.HeadCell>
                                <Table.HeadCell>User Name</Table.HeadCell>
                            </Table.Head>
                            {
                                user && user.map((use) => (
                                    <Table.Body key={use._id} className="divide-y">
                                        <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                            <Table.Cell>
                                                <img src={use.profilePicture} alt="user" className="w-10 h-10 rounded-full bg-gray-500 object-cover-" />
                                            </Table.Cell>
                                            <Table.Cell>{use.username}</Table.Cell>
                                        </Table.Row>
                                    </Table.Body>
                                ))
                            }
                        </Table>
                    </div>
                </div>

                <div>
                    <div className="flex flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-gray-800">
                        <div className="flex justify-between p-3 text-sm font-semibold items-center">
                            <h1 className="text-center p-2">Recent Comments</h1>
                            <Link to={'/dashboard?tab=comments'}>
                                <Button gradientDuoTone='purpleToPink' outline>
                                    See all
                                </Button>
                            </Link>
                        </div>
                        <Table hoverable>
                            <Table.Head>
                                <Table.HeadCell>Comment Content</Table.HeadCell>
                                <Table.HeadCell>Likes</Table.HeadCell>
                            </Table.Head>
                            {
                                comments && comments.map((comment) => (
                                    <Table.Body key={comment._id} className="divide-y">
                                        <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                            <Table.Cell className="w-96">
                                                <p className="line-clamp-2">{comment.content}</p>
                                            </Table.Cell>
                                            <Table.Cell>{comment.numberOfLikes}</Table.Cell>
                                        </Table.Row>
                                    </Table.Body>
                                ))
                            }
                        </Table>
                    </div>
                </div>

                <div>
                    <div className="flex flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-gray-800">
                        <div className="flex justify-between p-3 text-sm font-semibold items-center">
                            <h1 className="text-center p-2">Recent Posts</h1>
                            <Link to={'/dashboard?tab=posts'}>
                                <Button gradientDuoTone='purpleToPink' outline>
                                    See all
                                </Button>
                            </Link>
                        </div>
                        <Table hoverable>
                            <Table.Head>
                                <Table.HeadCell>Post Image</Table.HeadCell>
                                <Table.HeadCell>Post Title</Table.HeadCell>
                                <Table.HeadCell>Categpry</Table.HeadCell>
                            </Table.Head>
                            {
                                posts && posts.map((post) => (
                                    <Table.Body key={post._id} className="divide-y">
                                        <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                            <Table.Cell>
                                            <img src={post.image} alt="post" className="w-14 h-10 rounded-md bg-gray-500 object-cover-" />
                                            </Table.Cell>
                                            <Table.Cell className="w-96">{post.title}</Table.Cell>
                                            <Table.Cell className="w-5">{post.category}</Table.Cell>
                                        </Table.Row>
                                    </Table.Body>
                                ))
                            }
                        </Table>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default DashboardComponent