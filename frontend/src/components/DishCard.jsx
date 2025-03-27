import React from 'react'

const DishCard = ({dish}) => {

  return (
    <div className="card bg-black font-serif text-amber-100 w-auto shadow-sm ">
        <figure className='w-full h-4/6'>
            <img
            src={dish.image}
            alt={dish.dishName} className='w-full h-full'/>
        </figure>
        <div className="card-body">
            <h2 className="card-title text-2xl font-extrabold">{dish.dishName}</h2>
            <p className='text-lg text-amber-300'>{dish.description}</p>

            <div className="card-actions justify-around"> 
              <span className="justify-center items-center text-xl text-amber-500">RS: {dish.price}</span>    
              <button onClick="" className="btn btn-primary">Add</button>
            </div>
        </div>
    </div>
  )
}

export default DishCard