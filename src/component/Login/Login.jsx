
import axios from "axios";
import React, { useState } from "react";
import Joi from 'joi'
import { useNavigate } from "react-router-dom";



export default function Login({setUserData}) {

  let navigate= useNavigate();
  function goToHome(){
  let path ='/home'
  navigate(path)
  
  }
  let [loading,setLoading]=useState(false);
  let [errorlist, setErrorList] = useState([]);
let [errormsg,setErrormsg]=useState("");
  let [user, setUser] = useState({
    email: "",
    password: "",
  })

  let SubmitFormData= async (e) =>{
    e.preventDefault();
    let {data}=await axios.post("https://knowledge-saraha.herokuapp.com/users/signIn",user);
    console.log(data);
    if(data.message=='login' ){
      localStorage.setItem('token',data.token);
      setUserData();
      goToHome();
      setLoading(true);
      
    }
    else{
      setErrormsg(data.message);
    }
 
    
    let validateResult = validationForm();
    setErrorList(validateResult.error.details);

  }

  function validationForm() {
    const schema = Joi.object({
      password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
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
    {errormsg? <div className="alert alert-danger mt-2" >{errormsg}</div>:''}
       
      
    </div> }
     
      
      <form onSubmit={SubmitFormData} className="mt-5">
       
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
          {loading?<i className="fa-solid fa-spinner fa-spin"></i>:"Login"}
        </button>
      </form>
    </>
  );
}
