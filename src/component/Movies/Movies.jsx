import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import style from './Movies.module.css'


export default function Movies() {
  let prefix='https://image.tmdb.org/t/p/w500/'
  let [trendingMovies,setTrendengMovies]=useState([]);
 async function getTrendingMovies(params) {
  let {data}= await axios.get(`https://api.themoviedb.org/3/trending/movie/week?api_key=41ae4a0f6eef4bb8ba0d4e9bf485d9ac`);
  setTrendengMovies(data.results);
  }

  let navigate=useNavigate();
  function goToDetails(movie_id){
 navigate({
  pathname:'/details',
  search:`?movie_id=${movie_id}`//this mean tis is an parameter in the url
 })
  } 
  useEffect( ()=>{ 
    getTrendingMovies();
   },[])
  return (
<div className='mt-5 container'>
  <div className='row'>
  <div className="col-md-4 d-flex align-items-center ">
      <div className='p-5'>
        <div className={`w-25 mb-5 ${style.border}`}></div>
      <h3>Trending Movies to watch now </h3>

      <p >Most watched this week </p>
      <div className={`w-100 mt-5 ${style.border}`}></div>

      </div>
      
    </div>
     {trendingMovies.map(
      (ele,index)=>
      <div className='col-md-4' onClick={()=>goToDetails(ele.id)} key={index}>
        <div className="mb-5"> 
          <img className='img-fluid rounded img-fluid w-75' src={prefix+ele.poster_path} alt="" />
          <h5 className='mt-3 mb-5'>{ele.name}</h5>
        </div>
      </div>

    )}
  </div>
</div>

  )
}
