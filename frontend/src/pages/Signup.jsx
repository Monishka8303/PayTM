import React from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import Heading from '../components/Heading'
import SubHeading from '../components/SubHeading'
import InputBox from '../components/InputBox'
import Button from '../components/Button'
import BottomWarning from '../components/BottomWarning'
import { useState } from 'react'

const Signup = () => {

  const [firstName,setFirstName]=useState("");
  const [lastName,setLastName]=useState("");
  const [username,setUsername]=useState("");
  const [password,setPassword]=useState("");
  const navigate=useNavigate();

  return (
    <div className='bg-slate-300 h-screen flex justify-center'>
      <div className='flex flex-col justify-center'>
        <div className='rounded-lg bg-white w-80 text-center p-2 h-max px-4'>

          <Heading label={"Sign Up"}/>
          <SubHeading label={"Enter your information to create an account"}/>

          <InputBox label={"First Name: "} placeholder={"John"} onChange={(e)=>{setFirstName(e.target.value)}}/>
          <InputBox label={"Last Name: "} placeholder={"Doe"} onChange={(e)=>{setLastName(e.target.value)}}/>
          <InputBox label={"Email: "} placeholder={"johndoe08@gmail.com"} onChange={(e)=>{setUsername(e.target.value)}}/>
          <InputBox label={"Password: "} placeholder={"john@08"} onChange={(e)=>{setPassword(e.target.value)}}/>

          <div className='pt-4'>
            <Button onClick={async ()=>{
              const response = await axios.post("http://localhost:3000/api/v1/user/signup",{firstName,lastName,username,password});
              localStorage.setItem("token",response.data.token);
              navigate('/dashboard');
            }} label={"Sign Up"}/>
          </div>
          
          <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"}/>
        </div>
      </div>
    </div>
  )
}

export default Signup