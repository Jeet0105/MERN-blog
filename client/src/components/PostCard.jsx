import { Link } from "react-router-dom"

function PostCard({ post }) {
    return (
        <div className="group relative mt-5 w-full border h-[400px] border-teal-500 p-3 overflow-hidden rounded-lg line-clamp-2 hover:border-2 transition-all duration-200">
            <Link to={`/post/${post.slug}`}>
                <img src={post.image} alt="Post Cover" className="h-64 w-full object-cover group-hover:h-60 transition-all duration-300 z-20"/>
                <div className="p-3 flex flex-col gap-2">
                    <p className="text-lg font-semibold">{post.title}</p>
                    <span className="italic text-sm">{post.category}</span>
                    <Link to={`/post/${post.slug}`} className="z-10 group-hover:inline hidden border border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-white transition-all duration-300 text-center py-2 rounded-md rounded-t-none m-2">
                        Read Article
                    </Link>
                </div>
            </Link>
        </div>
    )
}

export default PostCard