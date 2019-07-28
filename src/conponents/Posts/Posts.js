// import React from 'react'
import './Posts.css'

const Posts = ({ posts, loading }) => {

    if(loading){
        return <h2>Loading</h2>
    }

    return (
        <ul className="list-posts">
            { posts.map( v => (
                <li key={v.id} className="list-posts-item">
                    <h3>{ v.title }</h3>
                    <p>{ v.content }</p>
                </li>
            )) }
        </ul>
    )
}

export default Posts