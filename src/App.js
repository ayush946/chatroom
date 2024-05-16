import React, {useState} from 'react';
import './App.css';
import {BrowserRouter, Routes, Route, useNavigate} from 'react-router-dom';
import Chatroom from './chatroom';
import { v4 as uuid } from "uuid";

// const colors = ['#6DC5D1', '#FDE49E', '#006769', '#40A578', '#FEB941'];
 
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element ={<Login/>}/>
        <Route path='chatroom/:url' element={<Chatroom/>} />

      </Routes>
    </BrowserRouter>
  );
}
const Login = () =>{
  const nevigate = useNavigate();
  const [name, setName] = useState("");
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(name);  
    let dir = name + '_' + uuid();
    nevigate(`/chatroom/${dir}`);
  }
  return (
    <form className='form-box' onSubmit={handleSubmit}>
    <label> Enter Your Name</label>
    <input className='input-box' type='text' value={name} onChange={(e) => setName(e.target.value)}></input>
    <input className="submit-box"type='submit' ></input>
  </form>
  )
}

export default App;
