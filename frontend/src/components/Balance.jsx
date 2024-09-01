import React from 'react'

const Balance = ({value}) => {
  return (
    <div className='m-4 font-bold text-medium'>
        Your balance: Rs. {value}
    </div>
  )
}

export default Balance