import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Balance = () => {

  const [balance, setBalance]=useState(0);

  useEffect(() => {
    axios.get('http://localhost:3000/api/v1/account/balance',{ headers: { Authorization: 'Bearer '+localStorage.getItem('token') } })
    .then(response => {

      setBalance(Math.round(response.data.balance*100)/100)
    })
  },[])

  return (
    <div className='flex justify-between'>
      <div className='m-4 font-bold text-medium'>Your balance</div>
      <div className='m-4 font-bold text-medium'>
        {balance}
      </div>
    </div>
  )
}

export default Balance