import React, {useState} from 'react';
import './App.css';
import {BrowserRouter, Routes, Route, useNavigate} from 'react-router-dom';
import Chatroom from './chatroom';
import { v4 as uuid } from "uuid";

const colors = ['240750', '32012F', '0C0C0C', '1B1A55', '750E21'];
 
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
    const index = Math.ceil(Math.random() * (colors.length - 1) );
    let dir = name + '_' + uuid() + '_' + colors[index];
    console.log("dir: ", dir);
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
