import React from 'react'
import Navbar from '../navbar'

type Props = {}

const HomePage = (props: Props) => {
  return (
    <div>
        <Navbar />
        <div className=''>
            <p className='text-white p-6'> 
                Home Page
            </p>
        </div>
    </div>
  )
}

export default HomePage