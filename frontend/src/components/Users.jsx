import React, { useEffect, useState } from 'react'
import axios from 'axios';
import {useNavigate} from 'react-router-dom'

const Users = () => {

    //backend call
    const [users,setUsers]=useState([]);
    const [filter,setFilter]=useState("");

    useEffect(()=>{
        axios.get('http://localhost:3001/api/v1/users/bulk?filter='+filter)
        .then(response => {
            setUsers(response.data.user)
        })
    },[filter])

    return (
        <>
            <div className='mt-6 text-lg font-bold'>Users</div>
            <div className='my-2'>
                <input onChange={(e)=>{setFilter(e.target.value)}} type="text" placeholder='Search users...' className='w-full px-2 py-1 border rounded border-slate-200'/>
            </div>
            <div>{users.map(user=> <User user={user}/>)}</div>
        </>
    )
}

const User = ({user}) => {
    const navigate = useNavigate();

    return (
        <div className='flex justify-between'>
            <div className='flex'>
                <div className='rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2'>
                    <div className='flex flex-col justify-center h-full text-xl'>{user.firstName[0].toUpperCase()}</div>
                </div>
                <div className='flex flex-col justify-center h-full'>{user.firstName} {user.lastName}</div>
            </div>

            <div className='flex flex-col justify-center h-full'>
                <Button onClick={(e)=>{
                    navigate("/send?id="+user._id+"&name="+user.fistName);
                }} label={"Send Money"}/>
            </div>
        </div>
    )
}

export default Users