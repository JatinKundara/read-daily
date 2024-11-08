import React, { useEffect, useState } from 'react'
import { useFirebase } from '../context/Firebase'
import { NavLink, useNavigate } from 'react-router-dom'
import { BlogCard } from '../components/Index';

function Profile() {

  const { user, isLoggedIn, getMyBlogs, deleteDocById } = useFirebase()
  const [blogs, setBlogs] = useState([])

  const navigate = useNavigate() 

  useEffect(() => { 
    if (!isLoggedIn) navigate('/')
  }, [navigate, isLoggedIn])

  useEffect(() => {
    if (isLoggedIn)
      getMyBlogs(user.uid)?.then((blogs) => setBlogs(blogs.docs))
  }, [getMyBlogs])

  const handleDelete = async (blogid) => {
    await deleteDocById(blogid);
    setBlogs(blogs.filter(blog => blog.id !== blogid))
  }

  return (
    <div className='min-h-screen flex items-start lg:flex-row flex-col-reverse p-3 gap-x-4 bg-slate-900'> 
      <div className='p-4 px-3 lg:px-4 bg-gray-200 w-full lg:w-2/3 mt-3 lg:mt-0 rounded-2xl'>
        <h3 className='text-xl font-semibold'>Blogs Uploaded By You :-</h3>
        <div className='flex items-center justify-center flex-wrap gap-3 lg:mt-8'>
          {blogs?.map((blog) => (
            <div key={blog.id} className='bolg-card w-[100%] lg:w-[32%] lg:mt-0 mt-5'>
              <BlogCard id={blog.id} {...blog.data()} />
              {user?.uid === blog.data().userId && 
              <>
                <button onClick={() => handleDelete(blog.id)} className='bg-red-800 mt-2 text-white font-semibold px-4 py-1 rounded-md'>
                Remove
              </button> 
              <NavLink to={`/update-blog/${blog.id}`} className='bg-black mt-2 text-white font-semibold px-4 py-1 rounded-md ms-3'>
                Update Blog
              </NavLink>
              </>
              } 
            </div>
          ))}
        </div>
      </div>
      <div className='p-4 bg-gray-200 h-[7rem] w-full lg:w-1/3 rounded-2xl'>
        <h3 className='text-xl font-semibold'>User Details :-</h3>
        <p><strong>User Name :</strong> {user?.displayName || 'Unknown'}</p>
        <p><strong>User Email :</strong> {user?.email}</p>
      </div>
    </div>
  )
}

export default Profile