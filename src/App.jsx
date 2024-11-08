import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Home, Login, Register, AddBlog, BlogDetails, Profile, UpdateBlog, Error, AllBlog } from "./pages/Index.js";
import { Header, Footer } from './components/Index.js'
import { Routes, Route } from 'react-router-dom';
// import './App.css'
 
function App() {
 
  return (
    <>
    <Header />
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/register' element={<Register />} />
      <Route path='/login' element={<Login />} />
      <Route path='/add-blog' element={<AddBlog />}  />
      <Route path='/blog-details/:blogId' element={<BlogDetails/>} />
      <Route path='/profile' element={<Profile/>} />
      <Route path='/update-blog/:blogId' element={<UpdateBlog/>} />
      <Route path="*" element={<Error />} />
      <Route path='/all-blog' element={<AllBlog />} />
    </Routes>
    <Footer />
  </> 
  )
}

export default App 
