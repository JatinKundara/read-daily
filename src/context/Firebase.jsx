import { createContext, useContext, useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app'
import { 
    getAuth, 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
    onAuthStateChanged,
    signOut 
} from 'firebase/auth'
import { 
    getFirestore, 
    collection, 
    addDoc,
    getDocs,
    getDoc,
    doc,
    query,
    where,
    deleteDoc,
    updateDoc
} from 'firebase/firestore'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'

const FirebaseContext = createContext(null)

const firebaseConfig = {
    apiKey: "AIzaSyB8qVrCdwzJeBZ527fD5kShB3lT96ts1SI",
    authDomain: "blog-daily-12b56.firebaseapp.com",
    projectId: "blog-daily-12b56",
    storageBucket: "blog-daily-12b56.appspot.com",
    messagingSenderId: "1019500145865",
    appId: "1:1019500145865:web:02a3715b6006b70e93b118"
};

// custom hook
export const useFirebase = () => useContext(FirebaseContext)

const firebaseApp = initializeApp(firebaseConfig) 
const auth = getAuth(firebaseApp)
const googleProvider = new GoogleAuthProvider()
const firestore = getFirestore(firebaseApp)
const storage = getStorage(firebaseApp)

// provider
export const FirebaseProvider = (props) => {

    // current user
    const [user, setUser] = useState(null)
    console.log(user);
    useEffect(() => {
        onAuthStateChanged(auth, user => {
            // user ? setUser(user) : setUser(null)
            if (user) {
                setUser(user) 
            }else{
                setUser(null)
            }
        }) 
    }, [])

    const createUser = (email, password) => {
        createUserWithEmailAndPassword(auth, email, password)
    }

    const signInUser = (email, password) => {
        signInWithEmailAndPassword(auth, email, password)
    }
 
    const signInWithGoogle = () => signInWithPopup(auth, googleProvider)

    const isLoggedIn = user ? true : false

    const logout = () => signOut(auth)

    const createNewBlog = async (title, categorie, thumbnail, content, date) => {

        const thumbnailRef = ref(storage, `uploads/images/${Date.now()}-${thumbnail?.name}`)
        const uploadResult = await uploadBytes(thumbnailRef, thumbnail)

        return await addDoc(collection(firestore, 'blog'), {
            title,
            categorie,
            imageURL : uploadResult.ref.fullPath,
            content,
            date,
            userId : user.uid,
            userEmail: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
        })

    }

    const listAllBlog = () => {
        return getDocs(collection(firestore, 'blog'))
    }

    const getImageURL = (path) => {
        return getDownloadURL(ref(storage, path))
    }

    const getDocById = async (id) => {
        const docItem = doc(firestore, 'blog', id)
        const result = await getDoc(docItem)
        return result
    }

    const getMyBlogs = async (userid) => {
        if (!user) return null
        const collectionRef = collection(firestore, 'blog')
        const que = query(collectionRef, where('userId', '==', userid))
        const result = await getDocs(que)
        return result
    }

    const UpdateBlog = async (blogid, title, categorie, thumbnail, content) => {
        const docRef = doc(firestore, 'blog', blogid)

        const thumbnailRef = ref(storage, `uploads/images/${Date.now()}-${thumbnail?.name}`)
        const uploadResult = await uploadBytes(thumbnailRef, thumbnail)

        await updateDoc(docRef, {
            title,
            categorie,
            imageURL : uploadResult.ref.fullPath,
            content,
        })
    }

    const deleteDocById = async (blogid) => {
        const blogRef = doc(firestore, 'blog', blogid)
        await deleteDoc(blogRef)
    }


    return <FirebaseContext.Provider
    value={{
        createUser,
        signInUser,
        signInWithGoogle,
        isLoggedIn,
        logout,
        createNewBlog,
        listAllBlog,
        getImageURL,
        getDocById,
        user,
        getMyBlogs,
        deleteDocById,
        UpdateBlog
    }}
    >
        {props.children}
    </FirebaseContext.Provider>

}