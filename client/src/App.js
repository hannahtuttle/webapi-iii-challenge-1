import React, {useState, useEffect} from 'react';
import axios from 'axios'
import './App.css';

function App() {

  const [user, setUser]= useState([])

  useEffect(() => {
    axios.get('https://webapi-iii-challenge-hannahtut.herokuapp.com/users')
    .then(res => {
      console.log('response from get request', res)
    })
    .catch(error => console.log('error from get request', error.response))
  }, [])

  return (
    <div className="App">
    
    </div>
  );
}

export default App;
