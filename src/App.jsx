import { Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Navbar from './component/Navbar/Navbar';
import Movies from './component/Movies/Movies';
import Home from './component/Home/Home';
import People from './component/People/People';
import TvShows from './component/TvShows/TvShows';
import Login from './component/Login/Login';
import Register from './component/Register/Register';
import jwtDecode from 'jwt-decode';
import { useState, useEffect } from 'react';
import ProtectedRoutes from './component/ProtectedRoutes/ProtectedRoutes';
import Details from './component/Details/Details';


function App() {
  let [loginData,setLoginData]=useState(null)
function setUserData(){
  let token=localStorage.getItem('token');
  let decodedToken=jwtDecode(token);
 setLoginData(decodedToken);
 console.log(loginData);
}
function logout(){
  localStorage.removeItem('token');
  setLoginData(null);
  Navigate('/home');
}

useEffect(()=>{
  if(localStorage.getItem('token')){
    setUserData();
  }
},[])
  return (
    <>
    <Navbar loginData={loginData} logout={logout}/>
    <div className="container">
    <Routes>
      <Route element={<ProtectedRoutes loginData={loginData}/>}>

      <Route path='home' element={<Home/>} ></Route>
      <Route path='movies' element={<Movies/>} ></Route>
      <Route path='details' element={<Details/>} ></Route>
      <Route path='people' element={<People/>} ></Route>
      <Route path='tvShows' element={<TvShows />} ></Route>
      </Route>
      
      <Route path='login' element={<Login setUserData={setUserData}/>} ></Route>
      <Route path='register' element={<Register/>} ></Route>
    </Routes>
    </div>
    </>
  );
}

export default App;
