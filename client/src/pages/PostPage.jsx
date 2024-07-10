import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom'
import { Button, Spinner } from 'flowbite-react'
import CallToAction from '../components/CallToAction';
import CommentSection from '../components/CommentSection';
import PostCard from '../components/PostCard';

function PostPage() {
    const { postSlug } = useParams();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [post, setPost] = useState(null);
    const [recentPost, setRecentPost] = useState(null);

    useEffect(() => {
        const fecthPost = async () => {
            try {
                setLoading(true);
                const res = await fetch(`/api/post/getposts?slug=${postSlug}`);
                const data = await res.json();
                if (!res.ok) {
                    setError(true);
                    setLoading(false);
                } else {
                    setPost(data.posts[0]);
                    setLoading(false);
                    setError(false);
                }
            } catch (error) {
                setError(true);
                setLoading(false);
            }
        }
        fecthPost();
    }, [postSlug])

    useEffect(() => {
        try {
            const fetchRecentPost = async () => {
                const res = await fetch('/api/post/getposts?limit=3');
                const data = await res.json();
                if (res.ok) {
                    setRecentPost(data.posts);
                }
            }
            fetchRecentPost();
        } catch (error) {
            console.log(error);
        }
    }, [])

    if (loading) return (
        <div className="min-h-screen flex justify-center items-center">
            <Spinner size="xl" />
        </div>
    )

    return (
        <main className='p-3 flex flex-col max-w-6xl mx-auto min-h-screen'>
            <h1 className='text-3xl mt-10 p-3 font-bold text-center max-w-2xl font-serif mx-auto lg:text-4xl'>{post && post.title}</h1>
            <Link to={`/search?category=${post && post.category}`} className='self-center mt-5'>
                <Button color='gray' pill size='xs'>{post && post.category}</Button>
            </Link>
            <img src={post && post.image} alt={post && post.title} className='mt-10 p-3 max-h-[400px] w-full object-cover' />
            <div className='flex justify-between p-3 border-b border-slate-500 mx-auto w-full max-w-2xl text-xs'>
                <span>{post && new Date(post.createdAt).toLocaleDateString()}</span>
                <span className='italic'>{post && (post.content.length / 1000).toFixed(0)} mins read</span>
            </div>
            <div className='p-3 max-w-2xl mx-auto w-full post-content' dangerouslySetInnerHTML={{ __html: post && post.content }}>
            </div>

            <div className='max-w-4xl mx-auto w-full'>
                <CallToAction />
            </div>

            <CommentSection postId={post?._id} />

            <div className='flex flex-col justify-center items-center mb-5'>
                <h1 className='text-xl mt-5'>Recent articles</h1>
                <div className='flex flex-col md:flex-row items-center gap-6 justify-center items-center'>
                    {
                        recentPost && 
                            recentPost.map((post)=> (
                                <PostCard key={post._id} post={post} />
                            ))
                    }
                </div>
            </div>
        </main>
    )
}

export default PostPage;