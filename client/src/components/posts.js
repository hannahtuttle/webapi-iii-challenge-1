import React, {useState, useEffect} from 'react'
import axios from 'axios'

const Post = props => {
    const [post, setPost] = useState([])

    useEffect(() => {
        axios.get(`https://webapi-iii-challenge-hannahtut.herokuapp.com/users/${props.char.id}/posts`)
        .then(res => {
          //console.log('response from get request/id/post', res.data)
          setPost(res.data)
        })
        .catch(error => console.log('error from get request', error.response))
      }, [props.char.id])

    return(
        <>
        {post.map(post => {
            return(
               <p key={post.id}>{post.text}</p>
            )
        })}
        {/* <p>{postedBy}</p> */}
        </>
    )
}

export default Post