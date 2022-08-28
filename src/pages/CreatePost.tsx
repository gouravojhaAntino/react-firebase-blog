import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { addDoc, collection } from 'firebase/firestore'
import { db, auth, storage } from '../firebase-config'
import { ref, uploadBytes, getDownloadURL, listAll } from "firebase/storage"

function CreatePost({ isAuth }: any) {

    const [title, setTitle] = useState("")
    const [post, setPost] = useState("")
    const [uploadFile, setUploadFile]: any = useState(null)

    let navigate = useNavigate()
    useEffect(() => {
        if (!isAuth) {
            navigate('/login')
        }
        getAllImages()
    }, [])

    const postCollectionRef = collection(db, "posts")

    const getAllImages = async () => {
        const fileRef = ref(storage, 'file/')
        listAll(fileRef).then((result) => {
            result.items.forEach((item) => {
                getDownloadURL(item).then((downloadURL) => {
                    console.log(downloadURL) 
                })
            })
        })
    }

    const createPost = async () => {
        const fileName = uploadFile?.name + Date.now()
        const fileRef = ref(storage, `file/${fileName}`)
        const downloadUrl = `https://firebasestorage.googleapis.com/v0/b/test-blog-2b9fd.appspot.com/o/file%2F${fileName}?alt=media`
        uploadBytes(fileRef, uploadFile).then((response) => {
            console.log(response)
            alert("File Uploaded Successfullly")
        })
        await addDoc(postCollectionRef, {
            title: title,
            post: post,
            author: {
                name: auth.currentUser?.displayName,
                id: auth.currentUser?.uid
            },
            media: {
                url: downloadUrl,
            }
        })
        navigate('/')

        console.log(downloadUrl)
    }
    return (
        <div>
            <div>
                <label>Title</label>
                <input placeholder="Title...." type="text" onChange={(e) => { setTitle(e.target.value) }} />
            </div>
            <div>
                <label>Post</label>
                <textarea placeholder="Post...." onChange={(e) => { setPost(e.target.value) }} />
            </div>
            <div>
                <label>Upload File</label>
                <input type="file" placeholder="Upload" onChange={(e: any) => { setUploadFile(e.target.files[0]) }} />
            </div>
            <div>
                <button onClick={createPost}>Submit Post</button>
            </div>
        </div>
    )
}

export default CreatePost