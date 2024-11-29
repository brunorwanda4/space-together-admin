import React from 'react'
import MyImage from '../my-components/myImage'

const AuthLogo = () => {
  return (
    <div className=' flex justify-center  gap-2 items-center'>
      <MyImage src='/logo/1.png' className=' size-12'/>
      <h3 className=' font-bold font-allura text-xl'>space-together</h3>
    </div>
  )
}

export default AuthLogo
