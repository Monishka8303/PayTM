import React from 'react'

const Signin = () => {
  return (
    <div className='bg-slate-300 h-screen flex justify-center'>
      <div className='flex flex-col justify-center'>
        <div className='rounded-lg bg-white w-80 text-center p-2 h-max px-4'>

          <Heading label={"Sign In"}/>
          <SubHeading label={"Enter your credentials to access your account"}/>

          <InputBox label={"Email: "} placeholder={"johndoe08@gmail.com"} onChange={(e)=>{setUsername(e.target.value)}}/>
          <InputBox label={"Password: "} placeholder={""} onChange={(e)=>{setPassword(e.target.value)}}/>

          <div className='pt-4'>
            <Button onClick={async ()=>{
              const response = await axios.post("http://localhost:3000/api/v1/user/signup",{firstName,lastName,username,password});
              localStorage.setItem("token",response.data.token);
              navigate('/dashboard');
            }} label={"Sign Up"}/>
          </div>
          
          <BottomWarning label={"Don't have an account?"} buttonText={"Sign Up"} to={"/signup"}/>
        </div>
      </div>
    </div>
  )
}

export default Signin