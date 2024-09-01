import React from 'react'

const AppBar = () => {
  return (
    <div className='shadow div flex justify-between h-14'>
      <div className='flex flex-col justify-center h-full ml-4 text-xl'>PayTM App</div>
      <div className='flex'>
        <div className='flex flex-col justify-center h-full mr-4 text-medium font-semibold'>Hello</div>
        <div className='rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-4'>
            <div className='flex flex-col justify-center h-full text-xl'>U</div>
        </div>
      </div>
    </div>
  )
}

export default AppBar