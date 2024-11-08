import React, { useEffect, useState } from 'react'
import { useFirebase } from '../context/Firebase'
import { useNavigate } from 'react-router-dom'

function BlogCard(props) {

    const { getImageURL } = useFirebase()
    const [url, setUrl] = useState(null)
 
    useEffect(() => { 
        getImageURL(props?.imageURL)
        .then((url) => setUrl(url))
    }, [])
 
    const navigate = useNavigate()
 
    return ( 
        <a onClick={(e) => navigate(`/blog-details/${props.id}`)} href="#" className=" block rounded-lg p-4 bg-white shadow-sm shadow-indigo-100"> 
            <img
                alt=""
                src={url}
                className="h-56 w-full rounded-md object-cover"
            />
 
            <div className="mt-2">
                <dl>
                    <div>
                        <dd className="font-medium text-lg">{props.title}</dd>
                    </div>
                    <div>
                        <dd className="text text-gray-500">Categorie - {props.categorie}</dd>
                    </div>
                    <div>
                        <dd className="text-sm text-gray-500">Uploaded By - {props?.displayName || 'Unknown'}</dd>
                    </div>
                </dl>
            </div>
        </a>
    )
}

export default BlogCard