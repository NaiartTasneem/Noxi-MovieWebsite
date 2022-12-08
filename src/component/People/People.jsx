import React from 'react'
import axios from 'axios'
import style from './People.module.css'  


import { useState, useEffect } from 'react';
export default function People() {
  let prefix='https://image.tmdb.org/t/p/w500/'
  let [trendingPeople,setTrendengPeople]=useState([]);
 async function getTrendinPeople(params) {
  let {data}= await axios.get(`https://api.themoviedb.org/3/trending/person/week?api_key=41ae4a0f6eef4bb8ba0d4e9bf485d9ac`);
  setTrendengPeople(data.results);
  }

  useEffect( ()=>{ 
    getTrendinPeople();
   },[])
  return (
<div className='mt-5 container'>
  <div className='row'>
  <div className="col-md-4 d-flex align-items-center ">
      <div className='p-5'>
        <div className={`w-25 mb-5 ${style.border}`}></div>
      <h3>Trending people now </h3>

      <p >Most talked about this week </p>
      <div className={`w-100 mt-5 ${style.border}`}></div>

      </div>
      
    </div>
     {trendingPeople.map(
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

  )
}
