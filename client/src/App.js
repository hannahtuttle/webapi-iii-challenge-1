import React, {useState, useEffect} from 'react';
import axios from 'axios'
import './App.css';

import Post from './components/posts.js'
import Header from './components/header.js'

function App() {

  const [user, setUser]= useState([])
  const [posts, setPosts]= useState({text: '', user_id: ''})

  useEffect(() => {
    axios.get('https://webapi-iii-challenge-hannahtut.herokuapp.com/users')
    .then(res => {
      console.log('response from get request', res.data)
      setUser(res.data)
    })
    .catch(error => console.log('error from get request', error.response))
  }, [])

  const handleSubmit = (event, id) => {
    event.preventDefault()
    axios.post(`https://webapi-iii-challenge-hannahtut.herokuapp.com/users/${id}/posts`, posts)
    .then(res => {
      console.log('response from post request', res.data)
      //setUser(res.data)
    })
    .catch(error => console.log('error from get request', error.response))
  }

  const handleChange = (event, id) => {
    setPosts({
      ...posts,
      text :event.target.value,
      user_id: id
    })
    console.log(posts)
  }


  
  
  return (
    <>
    <Header />
    <div className="App">
    {user.map(char => {
      return(
        <div className='persons' key={char.id}>
        {char.name}
        <Post char={char} userPost={posts}/>
        <div>
          <p>Add A Quote</p>
          <form onSubmit={event => handleSubmit(event, char.id)}>
          <input
            name='text'
            type='text'
            //value={user.username}
            onChange={event => handleChange(event, char.id)}
            />
            <button type='submit'>add</button>
          </form>
          </div>
        </div>
        )})}
    </div>

    </>
  );
}

export default App;
