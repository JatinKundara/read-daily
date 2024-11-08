import React, { useEffect, useState } from 'react';
import { useFirebase } from '../context/Firebase';
import { useParams, useNavigate } from 'react-router-dom';
import BlogCard from '../components/BlogCard';
import parse from 'html-react-parser';

function BlogDetails() {
  const { getDocById, getImageURL, isLoggedIn, listAllBlog } = useFirebase();
  const param = useParams();
  const [data, setData] = useState(null);
  const [imgUrl, setImgUrl] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect if not logged in
    if (!isLoggedIn) navigate('/login');
  }, [isLoggedIn, navigate]);

  // Fetch the blog post by ID
  useEffect(() => {
    getDocById(param.blogId).then((val) => {
      if (val.exists()) { 
        setData(val.data());
      } else {
        console.log('Document not found');
      }
    });
  }, [param.blogId, getDocById]);

  // Update post content whenever data changes
  const [postContent, setPostContent] = useState('');
  useEffect(() => {
    if (data) setPostContent(data.content || '');
  }, [data]);

  // Fetch image URL based on data.imageURL
  useEffect(() => {
    if (data && data.imageURL) {
      getImageURL(data.imageURL).then((url) => setImgUrl(url));
    }
  }, [data, getImageURL]);

  // List all blogs
  useEffect(() => {
    listAllBlog().then((blog) => setBlogs(blog.docs));
  }, [listAllBlog]);

  return ( 
    <>
      <div className="w-full p-3 lg:p-5 flex gap-x-5 items-start justify-center bg-gray-200">
        <div className="bg-white w-[100%] p-3 lg:p-5">
          <img className="float-left me-3 w-[100%] lg:w-[60%]" src={imgUrl} alt="" />
          <h1 className="text-3xl">{data?.title}</h1>
          <p className="my-2 text-gray-600 text-lg">Category - {data?.categorie}</p>
          <span>{postContent ? parse(postContent) : <span>No content available</span>}</span>
          <p className="mt-5 text-gray-600">
            <i>Date - {data?.date || 'Unknown'}</i>
          </p>
          <p className="text-gray-600 text-sm">
            <i>Uploaded By - {data?.displayName || 'Unknown'}</i>
          </p>
        </div> 
      </div>

      <section className="p-3 lg:p-5 bg-gray-800 flex flex-wrap justify-center gap-6">
        {blogs?.map((blog) => (
          <div key={blog.id} className="blog-card w-[100%] lg:w-[32%]">
            <BlogCard id={blog.id} {...blog.data()} />
          </div>
        ))} 
      </section>  
    </>
  );
}

export default BlogDetails;
