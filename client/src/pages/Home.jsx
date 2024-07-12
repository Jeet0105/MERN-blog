import { Link } from 'react-router-dom';
import CallToAction from '../components/CallToAction'
import { useEffect, useState } from 'react';
import PostCard from '../components/PostCard';

function Home() {
  const [posts, setPosts] = useState([]);


  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch('/api/post/getposts');
        if (res.ok) {
          const data = await res.json();
          setPosts(data.posts);
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchPost();
  }, []);


  return (
    <div>
      <div className="flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold lg:text-6xl">Welcome to my Blog</h1>
        <p className="text-gray-500 text-xs sm:text-sm">Here you&apos;all find a variety of articles and tutorials on topics such as Web development,software engineering and programing language.</p>
        <Link to='/search' className='text-xs sm:text-sm text-teal-500 font-bold hover:underline'>
          View all posts
        </Link>
      </div>
      <div className='p-3 bg-amber-100 dark:bg-slate-700'>
        <CallToAction />
      </div>
      <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 py-7'>
        {
          posts && posts.length > 0 && (
            <div className='flex flex-col gap-2'>
              <h2 className='text-2xl font-semibold text-center'>Recent Posts</h2>
              <div className='grid grid-cols-1 md:grid-cols-3 gap-4 justify-center items-center'>
                {
                  posts.map((post) => (
                    <PostCard key={post._id} post={post} />
                  ))
                }
              </div>
              <Link to='/search' className='text-lg text-teal-500 hover:underline mx-auto mt-2'>
                <p>View all posts</p>
              </Link>
            </div>
          )
        }
      </div>
    </div>
  )
}

export default Home