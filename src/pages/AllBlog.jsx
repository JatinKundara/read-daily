import React, { useEffect, useState } from 'react'
import { BlogCard } from '../components/Index'
import { useFirebase } from '../context/Firebase'

function AllBlog() {

  const { listAllBlog } = useFirebase()
  const [blogs, setBlogs] = useState([])

  // List all blogs
  useEffect(() => {
    listAllBlog().then((blog) => setBlogs(blog.docs));
  }, [listAllBlog]);

  return (
    <section className="p-3 min-h-screen lg:p-5 bg-gray-800 flex flex-wrap justify-center gap-6">
      {blogs?.map((blog) => (
        <div key={blog.id} className="blog-card w-[100%] lg:w-[32%]">
          <BlogCard id={blog.id} {...blog.data()} />
        </div>
      ))}
    </section>
  )
}

export default AllBlog