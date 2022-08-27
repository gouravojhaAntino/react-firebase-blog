import React, { useEffect,useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {addDoc , collection} from 'firebase/firestore'
import {db,auth} from '../firebase-config'

function CreatePost({ isAuth }: any) {

    const [title, setTitle] = useState("")
    const [post, setPost] = useState("")

    let navigate = useNavigate()
    useEffect(() => {
        if (!isAuth) {
            navigate('/login')
        }
    }, [])

    const postCollectionRef = collection(db,"posts")
    const createPost = async () => {
        await addDoc(postCollectionRef,{
            title : title,
            post : post,
            author : {
                name : auth.currentUser?.displayName,
                id : auth.currentUser?.uid
            }
        })
        navigate('/')
    }
    return (
        <div>
            <div>
                <label>Title</label>
                <input placeholder="Title...." type="text" onChange={(e) => {setTitle(e.target.value)}}/>
            </div>
            <div>
                <label>Post</label>
                <textarea placeholder="Post...." onChange={(e) => {setPost(e.target.value)}}/>
            </div>
            <div>
                <button onClick={createPost}>Submit Post</button>
            </div>
        </div>
    )
}

export default CreatePost