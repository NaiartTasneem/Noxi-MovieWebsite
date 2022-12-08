import React from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import style from "./Details.module.css";

export default function Details() {
  let navigate= useNavigate();
  function goToMovies(){
    navigate("/movies");
  }


  const [searchParams, setSearchParams] = useSearchParams();
  let movie_id = searchParams.get("movie_id");

  let prefix = "https://image.tmdb.org/t/p/w500/";
  let [MoviesDetails, setMoviesDetails] = useState([]);
  async function getMoviesDetails(movie_id) {
    let { data } = await axios.get(
      `https://api.themoviedb.org/3/movie/${movie_id}?api_key=41ae4a0f6eef4bb8ba0d4e9bf485d9ac&language=en-US`
    );
    setMoviesDetails(data);
  }
  useEffect(() => {
    getMoviesDetails(movie_id);
  }, []);
  return (
    <div className="mt-5 ms-5 container ">
      <div className="row">
        <div className="col-md-4 d-flex align-items-center ">
          <div className="p-5">
            <div className={` mb-5`}></div>
            <img
              className="img-fluid rounded img-fluid w-100"
              src={prefix + MoviesDetails.poster_path}
              alt="movie poster"
            />

          
           
          </div>
        </div>
        <div className="p-5 col-md-4  align-items-center">
        <div className={` mb-5`}></div>
        <h3 className="mt-3"> {MoviesDetails.title}</h3>
        <h6>Original tilte {MoviesDetails.original_title}</h6>
        <p className="mt-3">Language: {MoviesDetails.original_language}</p>
        <p className="mt-3">Budget: {MoviesDetails.budget}</p>

        <p className={`mt-5 ${style.para}`} >{MoviesDetails.overview}</p>
        </div>
      </div>
      <button onClick={goToMovies} className="btn btn-primary  ps-5 pe-5 me-5 ms-5 mb-5">Back</button>
    </div>
  );
}
