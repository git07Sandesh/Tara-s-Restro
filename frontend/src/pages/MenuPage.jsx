import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'

const MenuPage = () => {
  return (
    <div className=' max-h-screen bg-black bg-opacity-50'>
        <Navbar />
          <div className='bg-black bg-opacity-50'>
          <div className='flex justify-center items-center'>
            <h1 className='inline-block text-center text-blue-700 font-bold text-2xl font-serif m-8 p-4 bg-amber-500 rounded-full hover:transform hover:scale-105 transition duration-300'>Our Full Menu</h1> 
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 max-w-4xl mx-auto">
            {[...Array(10)].map((_, index) => (
              <img
                key={index}
                src={`/images/menu${index + 1}.jpg`} // make sure to have /public/images/menu1.jpg to menu8.jpg
                alt={`Menu item ${index + 1}`}
                className="w-full h-full object-cover rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
              />
            ))}
          </div>
          </div>

    </div>
  )
}

export default MenuPage