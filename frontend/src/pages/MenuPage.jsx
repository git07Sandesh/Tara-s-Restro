import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import TopMenu from '../components/TopMenu'
import { useMenuStore } from '../../store/menu'
import DishCard from '../components/DishCard'
import { Link } from 'react-router-dom'

const MenuPage = () => {
  const {fetchDishes, dishes} = useMenuStore();
  useEffect(() => {
    fetchDishes();
  }, [fetchDishes])
  return (
    <div className=' min-h-screen bg-black bg-opacity-50'>
        <Navbar />
        <TopMenu />
        <div className='flex justify-center items-center'>
        <h1 className='inline-block text-center text-blue-700 font-bold text-2xl font-serif m-2 p-4 bg-amber-500'>Our Full Menu</h1> 

        </div>
          
        
        
        <div className='grid grid-cols-1 gap-3 w-full sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
          {Array.isArray(dishes) && dishes.length > 0 ? (
          dishes.map((dish) => (
            <DishCard key={dish._id} dish={dish} />
          ))
        ) : (
          <h3>No Dishes currently Available</h3>
        )}
        </div>
        {dishes.length === 0 && (
          <Link to ={"/menu"}>
            <h3>Check our menu</h3>
          </Link>
           
         
        )}
    </div>
  )
}

export default MenuPage