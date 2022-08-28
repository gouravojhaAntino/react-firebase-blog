import React from 'react'
import { useState, useEffect } from 'react'
import { getDocs, collection,deleteDoc,doc } from 'firebase/firestore'
import { auth, db } from "../firebase-config"
import "../App.css"

function Home({isAuth}:any) {

    const [postList, setPostList] = useState([]);

    const postCollectionRef = collection(db, "posts")
    
    useEffect(() => {
        getPosts()
    }, [])

    const getPosts = async () => {
        const data = await getDocs(postCollectionRef);
        const arrObj: any = data.docs.map((doc: any) => ({ ...doc.data(), id: doc.id }))
        setPostList(arrObj)
    }
     
    const deletePost = async (id:any) => {
        const postDoc = doc(db,'posts',id)
        await deleteDoc(postDoc)
        await getPosts()
    }

    return (
        <div className="blog__list">
            {postList.map((data: any,index:number) => {
                return (
                    <div className="blog__content" key={index}>
                        <div>
                            <div>
                                Title : {data.title}
                            </div>
                            <div>
                                Post : {data.post}
                            </div>
                            <div>
                                <img src={data.media.url} alt="media" width="700" height="300"/> 
                            </div>
                            <div>
                                Author : {data.author.name}
                            </div>
                            <div>
                                ID : {data.author.id}
                            </div>
                            <div>
                                {isAuth && data.author.id == auth.currentUser?.uid &&<button onClick={() => deletePost(data.id)}>Delete</button>}
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default Home