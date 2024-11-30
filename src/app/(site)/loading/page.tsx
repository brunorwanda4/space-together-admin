import React from 'react'

const page = () => {
  return (
    <div className=' w-full pr-2 mt-2'>
      <div className=' relative h-60'>
        <div className=' skeleton  w-full h-44'>
            <div className=' absolute -bottom-2 skeleton size-32 rounded-full bg-base-300 left-6'/>
        </div>
      </div>
      hello world
    </div>
  )
}

export default page
