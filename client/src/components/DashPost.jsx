import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Button, Modal, Table } from 'flowbite-react';
import { Link } from "react-router-dom";
import { HiOutlineExclamationCircle } from "react-icons/hi2";

function DashPost() {

  const { currentUser } = useSelector((state) => state.user);
  const [userPost, setUserPost] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [postId, setPostId] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`/api/post/getposts?userId=${currentUser._id}`);
        const data = await res.json();
        if (res.ok) {
          setUserPost(data.posts);
          if (data.posts.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
    if (currentUser.isAdmin) fetchPosts();
  }, [currentUser._id, currentUser.isAdmin]);

  const handleShowMore = async () => {
    const startIndex = userPost.length;
    try {
      const res = await fetch(`/api/post/getposts?userId=${currentUser._id}&startIndex=${startIndex}`);
      const data = await res.json();
      if (res.ok) {
        setUserPost((prev) => [...prev, ...data.posts]);
        if (data.posts.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleDeletePost = async () => {
    try {
      setShowModal(false);
      const res = await fetch(`/api/post/deletepost/${postId}/${currentUser._id}`,
        {
          method: 'DELETE'
        }
      );
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        setUserPost((prev) => prev.filter((post) => post._id !== postId));
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="md:ml-14 w-full table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
      {
        currentUser && currentUser.isAdmin && userPost.length > 0 ? (
          <>
            <Table hoverable className="shadow-md">
              <Table.Head>
                <Table.HeadCell>Date Updated</Table.HeadCell>
                <Table.HeadCell>Post Image</Table.HeadCell>
                <Table.HeadCell>Post Title</Table.HeadCell>
                <Table.HeadCell>Category</Table.HeadCell>
                <Table.HeadCell>Delete</Table.HeadCell>
                <Table.HeadCell>
                  <span>Edit</span>
                </Table.HeadCell>
              </Table.Head>

              {
                userPost.map((post) => (
                  <Table.Body key={post._id} className="divide-y">
                    <Table.Row className="bg-white dark:border-gray-600 dark:bg-gray-800">
                      <Table.Cell className="font-medium text-gray-900 dark:text-white">{new Date(post.updatedAt).toLocaleDateString()}</Table.Cell>
                      <Table.Cell><Link to={`/post/${post.slug}`}><img src={post.image} alt="Post Image" className="h-10 w-20 object-cover bg-gray-500" /></Link></Table.Cell>
                      <Table.Cell><Link to={`/post/${post.slug}`} className="font-medium text-gray-900 dark:text-white">{post.title}</Link></Table.Cell>
                      <Table.Cell className="font-medium text-gray-900 dark:text-white">{post.category}</Table.Cell>
                      <Table.Cell><span onClick={() => {
                        setShowModal(true)
                        setPostId(post._id)
                      }} className="font-medium text-red-500 cursor-pointer hover:underline">Delete</span></Table.Cell>
                      <Table.Cell><Link className="text-teal-500 font-medium hover:underline" to={`/update-post/${post.slug}`}><span>Edit</span></Link></Table.Cell>
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
          <p>You have no post yet</p>
        )
      }
      <Modal show={showModal} onClick={() => setShowModal(false)} popup size='md'>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 mb-4 mx-auto dark:text-gray-200" />
            <h3 className="text-red-400 mb-5">Are you sure you want to delete your Post?</h3>

            <div className="flex justify-center gap-4">
              <Button color='failure' onClick={handleDeletePost}>Yes I&apos;m sure</Button>
              <Button color='gray' onClick={() => setShowModal(false)}>No, Cancle</Button>
            </div>

          </div>
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default DashPost;