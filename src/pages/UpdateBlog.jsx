import React, { useEffect, useState, useRef } from 'react'
import { useFirebase } from '../context/Firebase'
import { useNavigate } from 'react-router-dom'
import { Editor } from '@tinymce/tinymce-react'
import { useParams } from 'react-router-dom'

function UpdateBlog() {

  const { isLoggedIn, getDocById, UpdateBlog } = useFirebase()
  const param = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/')
    }
  }, [isLoggedIn, navigate])
  
  const [title, setTitle] = useState('')
  const [categorie, setCategorie] = useState('')
  const [thumbnail, setThumbnail] = useState(null)
  const [content, setContent] = useState('')
  const [initialVal, setInitialVal] = useState('')

  // Fetch the blog post by ID
  useEffect(() => {
    getDocById(param.blogId).then((val) => {
      if (val.exists()) {
        setTitle(val.data().title || '')
        setCategorie(val.data().categorie || '')
        setInitialVal(val.data().content || '')
      } else {
        console.log('Document not found');
      }
    });
  }, [param.blogId, getDocById]);

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await UpdateBlog(param.blogId, title, categorie, thumbnail, content)
      navigate('/profile')
    } catch (error) {
      console.log('Update Data Error', error.message);
    }
  }

  const handleEditorChange = (content, editor) => {
    setContent(content); 
    // console.log('Content was updated:', content);
  };


  return (
    <section className="bg-gray-900">
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-1">
          {/* <div className="lg:col-span-2 lg:py-12">
            <p className="max-w-xl text-lg">
              At the same time, the fact that we are wholly owned and totally independent from
              manufacturer and other group control gives you confidence that we will only recommend what
              is right for you.
            </p>

            <div className="mt-8">
              <a href="#" className="text-2xl font-bold text-pink-600"> 0151 475 4450 </a>

              <address className="mt-2 not-italic">282 Kevin Brook, Imogeneborough, CA 58517</address>
            </div>
          </div> */}

          <div className="rounded-lg bg-white p-8 shadow-lg lg:col-span-3 lg:p-12">
            <h2 className='text-2xl mb-5'>Update Blog</h2>
            <form action="#" className="space-y-4">

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="sr-only" htmlFor="tile">Title</label>
                  <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full rounded-lg border-[1.5px] border-gray-400 p-3 text-sm"
                    placeholder="Title"
                    type="text"
                    id="title"
                  />
                </div>
                <div>
                  <label className="sr-only" htmlFor="categorie">Categorie</label>
                  <input
                    value={categorie}
                    onChange={(e) => setCategorie(e.target.value)}
                    className="w-full rounded-lg border-[1.5px] border-gray-400 p-3 text-sm"
                    placeholder="Categorie"
                    type="tel"
                    id="categorie"
                  />
                </div>
              </div>

              <div>
                <label className="sr-only" htmlFor="file">Thumbnail</label>
                <input
                  onChange={(e) => setThumbnail(e.target.files[0])}
                  className="w-full rounded-lg border-[1.5px] border-gray-400 p-3 text-sm"
                  placeholder="file"
                  type="file"
                  id="file"
                  required="true"
                />
              </div>

              <div>
                <label className="sr-only" htmlFor="message">Message</label>

                {/* <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full rounded-lg border-[1.5px] border-gray-400 p-3 text-sm"
                  
                  older="Message"
                  rows="14"
                  id="message"
                  placeholder='Content'
                ></textarea> */}

                <Editor
                  apiKey='0pjgndf01wa8r6dodw2p4hjktyby3jqdeislkq9lmt3f2q04'
                  value={content}
                  initialValue={initialVal || ''}
                  init={{
                    height: 300,
                    menubar: false,
                    readonly: false,
                    plugins: [
                      "image",
                      "advlist",
                      "autolink",
                      "lists",
                      "link",
                      "image",
                      "charmap",
                      "preview",
                      "anchor",
                      "searchreplace",
                      "visualblocks",
                      "code",
                      "fullscreen",
                      "insertdatetime",
                      "media",
                      "table",
                      "code",
                      "help",
                      "wordcount",
                      "anchor",
                    ],
                    toolbar:
                      "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
                    // content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
                  }}
                  onEditorChange={handleEditorChange}
                />
              </div>

              <div className="mt-4">
                <button
                  onClick={handleSubmit}
                  type="submit"
                  className="inline-block w-full rounded-lg bg-black px-5 py-3 font-medium text-white sm:w-auto"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default UpdateBlog