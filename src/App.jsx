import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Toaster } from 'react-hot-toast';
import './App.css';
import {Routes,Route} from "react-router-dom";
import MyFoundItem from './pages/MyFoundItem.jsx';
import MyLostItem from './pages/MyLostItem.jsx';  
import Dashbord from './pages/Dashbord.jsx';
import { Link } from "react-router-dom";
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';



function App() {
  
  return (
    <>
      <Toaster position='top-right'/>
      <div>
        <nav>
          {/* <Link to="/about">About</Link> */}
        </nav>
        <Routes>
          <Route path="/" element={<Dashbord />} />
          <Route path="/dashbord" element={<Dashbord />} />
          <Route path="/mylostitem" element={<MyLostItem />} />
          <Route path="/myfounditem" element={<MyFoundItem />} />
          <Route path="/login" element= {<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </>
  )
}

export default App
