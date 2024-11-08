import React, { useEffect, useState } from 'react'
import { BlogCard } from '../components/Index'
import { useFirebase } from '../context/Firebase'

function Home() {
const { listAllBlog } = useFirebase()
const [blogs, setblogs] = useState([])

useEffect(() => {
  listAllBlog().then((blog) => setblogs(blog.docs))
}, [])
 
  return (
    <>
      <section className="bg-black text-white">
        <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
          <div className="mx-auto max-w-3xl text-center">
            <h1
              className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-4xl"
            >
              Mastering Productivity: 

              <span className="sm:block">Strategies to Boost Your Daily Efficiency. </span>
            </h1>

            <p className="mx-auto mt-4 max-w-xl sm:text-xl/relaxed">
            Discover practical techniques to enhance productivity and get more done efficiently. From prioritizing tasks to minimizing distractions.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <a
                className="block w-full rounded border border-[#368EE0] bg-[#368EE0] px-16 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-white focus:outline-none focus:ring active:text-opacity-75 sm:w-auto"
                href="#"
              >
                Learn More
              </a>
            </div> 
          </div>
        </div>
      </section>
      <section className='p-3 lg:p-5 bg-gray-800 border-t-[1px] border-gray-500 flex flex-wrap justify-center gap-6'>
      {/* <BlogCard/>
      <BlogCard/> 
      <BlogCard/>
      <BlogCard/>
      <BlogCard/> */}
      { blogs?.map((blog) =>
        <div key={blog.id} className='w-[100%] lg:w-[32%]'>
          <BlogCard  id={blog.id} {...blog.data()} />
        </div>
      )}
      </section>
    </>
  )
}

export default Home 