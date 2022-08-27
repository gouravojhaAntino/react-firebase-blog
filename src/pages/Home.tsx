import React from 'react'
import { useState, useEffect } from 'react'
import { getDocs, collection } from 'firebase/firestore'
import { db } from "../firebase-config"
import "../App.css"

function Home() {

    const [postList, setPostList] = useState([]);

    const postCollectionRef = collection(db, "posts")
    useEffect(() => {
        const getPosts = async () => {
            const data = await getDocs(postCollectionRef);
            const arrObj: any = data.docs.map((doc: any) => ({ ...doc.data(), id: doc.id }))
            setPostList(arrObj)
        }
        getPosts()
    }, [])

    return (
        <div className="blog__list">
            {postList.map((data: any) => {
                return (
                    <div className="blog__content">
                        <div>
                            <div>
                                Title : {data.title}
                            </div>
                            <div>
                                Post : {data.post}
                            </div>
                            <div>
                                Author : {data.author.name}
                            </div>
                            <div>
                                ID : {data.author.id}
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default Home