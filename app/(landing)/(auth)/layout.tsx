import React from 'react'


const AuthLayout = ({children}: Readonly<{children: React.ReactNode;}>) => {
  return (
    <div className='container flex justify-center items-center'>
        {children}
      </div>
  )
}

export default AuthLayout
