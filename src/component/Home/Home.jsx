import React, { useEffect } from 'react'
import axios from "axios";
import style from './Home.module.css'
import { useState } from 'react';


export default function Home() {
 let prefix="https://image.tmdb.org/t/p/w500/"
 let[TrendingMovies,setTrendingMovies]=useState([]);//as array 
 let[TrendingTv,setTrendingTv]=useState([]);//as array 
 let[TrendingPeople,setTrendingPeople]=useState([]);//as array 

 
async function getTrendingItems(mediatype,callback){

  let {data}= await axios.get(`https://api.themoviedb.org/3/trending/${mediatype}/week?api_key=41ae4a0f6eef4bb8ba0d4e9bf485d9ac`);
  callback(data.results);

}
useEffect( ()=>{
  getTrendingItems('tv',setTrendingTv);  
  getTrendingItems('movie',setTrendingMovies);  
  getTrendingItems('person',setTrendingPeople);  
},[])
  
return (
<>
<div className='pt-3  mb-5 text-center'>

<div className="d-flex align-items-center ">
      <div className='p-5 w-100'>
        <div className={`w-100 mb-5 ${style.border}`}></div>
      <h3 className='mt-5'> T R E N D I N G </h3>
      <div className={`w-100 mt-5  ${style.border}`}></div>

      </div>
      
    </div>
  

<div className='mt-5 mb-5'></div>
<div className='container'>
  <div className='row'>
  <div className="col-md-4 d-flex align-items-center ">
      <div className='p-5'>
        <div className={`w-25 mb-5 ${style.border}`}></div>
      <h3>Trending Movies to watch now </h3>

      <p >Most watched this week </p>
      <div className={`w-100 mt-5 ${style.border}`}></div>

      </div>
      
    </div>
     {TrendingMovies.map(
      (movie,index)=>
      <div className='col-md-4' key={index}>
        <div className="mb-5"> 
          <img className='img-fluid rounded img-fluid w-75' src={prefix+movie.poster_path} alt="" />
          <h5 className='mt-3 mb-5'>{movie.title}</h5>
        </div>
      </div>

    )}
  </div>
</div>
<div className="mt-5"></div>
<div className='mt-5 container'>
  <div className='row'>
  <div className="col-md-4 d-flex align-items-center ">
      <div className='p-5'>
        <div className={`w-25 mb-5 ${style.border}`}></div>
      <h3>Trending Tv to watch now </h3>

      <p >Most watched this week </p>
      <div className={`w-100 mt-5 ${style.border}`}></div>

      </div>
      
    </div>
     {TrendingTv.map(
      (ele,index)=>
      <div className='col-md-4' key={index}>
        <div className="mb-5"> 
          <img className='img-fluid rounded img-fluid w-75' src={prefix+ele.poster_path} alt="" />
          <h5 className='mt-3 mb-5'>{ele.name}</h5>
        </div>
      </div>

    )}
  </div>
</div>

<div className="mt-5"></div>
<div className='mt-5 container'>
  <div className='row'>
  <div className="col-md-4 d-flex align-items-center ">
      <div className='p-5'>
        <div className={`w-25 mb-5 ${style.border}`}></div>
      <h3>Trending People  </h3>

      <p >Most talked about this week </p>
      <div className={`w-100 mt-5 ${style.border}`}></div>

      </div>
      
    </div>
     {TrendingPeople.map(
      (ele,index)=>
      <div className='col-md-4' key={index}>
        <div className="mb-5"> 
          <img className='img-fluid rounded img-fluid w-75' src={prefix+ele.profile_path} alt="" />
          <h5 className='mt-3 mb-5'>{ele.name}</h5>
        </div>
      </div>

    )}
  </div>
</div>

</div>
</>
  )
}
