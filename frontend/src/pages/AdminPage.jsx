import React, { useEffect, useState, useRef } from 'react'
import { useMenuStore } from '../../store/menu.js'


// Example AdminPage
const AdminPage = () => {
  const fileInputRef = useRef(null);
  const { dishes, createDish, fetchDishes, deleteDish, toggleFeaturedDish } = useMenuStore();

  // Keep text fields in one state...
  const [menuData, setMenuData] = useState({
    dishName: "",
    price: "",
    description: ""
  });

  // ...and the file input in a separate state.
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    fetchDishes();
  }, []);

  const handleAddDish = (e) => {
    e.preventDefault();

    const { dishName, price, description } = menuData;
    if (!dishName || !price || !description || !imageFile) {
      alert("All fields and an image are required!");
      return;
    }

    // Use FormData to send both text fields and the file to the backend
    const formData = new FormData();
    formData.append("dishName", dishName);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("image", imageFile); // "image" must match Multer's .single("image")

    // Pass FormData to our store function (which does a POST request)
    createDish(formData);

    // Reset form
    setMenuData({ dishName: "", price: "", description: ""});
    setImageFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Clear the input's value
    }
  };

  const handleRemoveDish = (dishId) => {
    deleteDish(dishId);
  };

  return (
    <div>
      <form 
        onSubmit={handleAddDish} 
        className='flex flex-col justify-center items-center gap-3 border-2 rounded-2xl p-4 m-2'
        encType="multipart/form-data"
      >
        <label>
          <span>Dish Name:</span>
          <input
            type="text"
            placeholder="Dish Name"
            value={menuData.dishName}
            onChange={(e) =>
              setMenuData({ ...menuData, dishName: e.target.value })
            }
            className='border-2 rounded-3xl border-amber-700 p-2'
          />
        </label>
        <label>
          <span>Price:</span>
          <input
            type="number"
            placeholder="Dish Price"
            value={menuData.price}
            onChange={(e) =>
              setMenuData({ ...menuData, price: Number(e.target.value) })
            }
            className='border-2 rounded-3xl border-amber-700 p-2'
          />
        </label>
        <label>
          <span>Description:</span>
          <input
            type="text"
            placeholder="Dish Description"
            value={menuData.description}
            onChange={(e) =>
              setMenuData({ ...menuData, description: e.target.value })
            }
            className='border-2 rounded-3xl border-amber-700 p-2'
          />
        </label>
        <label>
  <span>Image:</span>
  <div className="inline-flex items-center gap-2">
    <input
      ref={fileInputRef}
      type="file"
      accept="image/*"
      onChange={(e) => setImageFile(e.target.files[0])}
      className="hidden"
    />
    <button
      type="button"
      onClick={() => fileInputRef.current && fileInputRef.current.click()}
      className="bg-blue-600 text-white px-4 py-2 rounded-md"
    >
      {imageFile ? imageFile.name : "Upload Image"}
    </button>
  </div>
</label>
        <button className='bg-amber-400 p-2 rounded-2xl'>Add Dish</button>
      </form>

      <div>
        <h1>Current Dishes</h1>
        {dishes.length > 0 ? (
          dishes.map((dish) => (
            <div className='flex gap-5 p-3 border-2 justify-between' key={dish._id}>
              <img
                src={`http://localhost:3000/api/menu/${dish._id}/image`}
                alt={dish.dishName}
                className="size-12 rounded"
              />
              
              <p>Name: {dish.dishName}</p>
              <span>Price: {dish.price}</span>
              <button
                  onClick={() => toggleFeaturedDish(dish._id, dish.featured)}
                  className={`border-2 px-2 rounded ${dish.featured ? 'bg-green-500' : 'bg-gray-300'}`}
                >
                  {dish.featured ? "Unfeature" : "Feature"}
                </button>
              {/* If your backend serves the image as a URL or Base64 string:
                  <img src={dish.image} alt="Dish" style={{ width: 100 }} />
                 If you store binary data, you might need a separate route 
                 that returns the image. */}
              
              <button className='border-2'>Update Dish</button>
              <button onClick={() => handleRemoveDish(dish._id)} className='border-2'>Delete Dish</button>
            </div>
          ))
        ) : (
          <p>No dish Found</p>
        )}
      </div>

      <form>
        {/* Additional form for featured dish, etc. */}
      </form>
    </div>
  );
};

export default AdminPage;
