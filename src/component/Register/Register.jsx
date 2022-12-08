
import axios from "axios";
import React, { useState } from "react";
import Joi from 'joi'
import { useNavigate } from "react-router-dom";



export default function Register() {

  let navigate= useNavigate();
  function goToLogin(){
  let path ='/login'
  navigate(path)
  
  }
  

  let [loading,setLoading]=useState(false);
  let [errorlist, setErrorList] = useState([]);

  let [user, setUser] = useState({
    name: "",
    age: "",
    email: "",
    password: "",
  })

  let SubmitFormData= async (e) =>{
    e.preventDefault();
    let {data}=await axios.post("https://knowledge-saraha.herokuapp.com/users/signUp",user);
    console.log(data);
    if(data.message=='success' ){
      console.log('ttt')
      setLoading(true);
      goToLogin();
    }
    console.log('lll')
    
    let validateResult = validationForm();
    setErrorList(validateResult.error.details);

  }

  function validationForm() {
    const schema = Joi.object({
      name: Joi.string().alphanum().min(3).max(30).required(),
      password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
      age: Joi.number().min(10).max(80).required(),
      email: Joi.string().email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      }),
    });
    return schema.validate(user, { abortEarly: false });
  }

 
  let getFormData = (e) => {
    let myUser = { ...user };
    myUser[e.target.name] = e.target.value;
    setUser(myUser);
  }
  return (
    <>
    { <div className="mt-5">
    {errorlist.map((error, index) => (
        <div className="alert alert-danger mt-2" key={index}>{error.message} </div>
      ))}
    </div> }
     
      <form onSubmit={SubmitFormData} className="mt-5">
        <div className="form-group my-3">
          <label htmlFor="name">Name</label>
          <input
            name="name"
            onChange={getFormData}
            type="text"
            className="form-control"
            id="name"
            placeholder="your name"
          />
        </div>

        <div className="form-group my-3">
          <label htmlFor="age">Age</label>
          <input
            name="age"
            onChange={getFormData}
            type="number"
            className="form-control"
            id="age"
            placeholder=""
          />
        </div>

        <div className="form-group my-3">
          <label htmlFor="email">Email </label>
          <input
            name="email"
            onChange={getFormData}
            type="email"
            className="form-control"
            id="email"
            placeholder="name@example.com"
          />
        </div>

        <div className="form-group my-3">
          <label htmlFor="password">Password</label>
          <input
            name="password"
            onChange={getFormData}
            type="password"
            className="form-control"
            id="password"
            placeholder="****"
          />
        </div>

        <button className="btn btn-primary mt-4" type="submit">
          {loading?<i className="fa-solid fa-spinner fa-spin"></i>:"Register"}
        </button>
      </form>
    </>
  );
}
