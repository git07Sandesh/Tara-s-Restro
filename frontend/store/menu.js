import { create } from "zustand";
const base_url = import.meta.env.MODE === "development"
  ? "http://localhost:3000"
  : import.meta.env.VITE_API_URL;

export const useMenuStore = create((set) => ({
  dishes: [],
  setDishes: (dishes) => set({ dishes }),

  createDish: async (formData) => { // Rename parameter to formData
    try {
      const res = await fetch(`${base_url}/api/menu`, {
        method: "POST",
        body: formData // Send the FormData directly
      });
  
      const data = await res.json();
      if (!res.ok || !data.success) {
        return { success: false, message: data.message || "Failed to create dish" };
      }
  
      // Update state with the new dish
      set((state) => ({ dishes: [...state.dishes, data.data] }));
      return { success: true, message: "Dish added successfully" };
    } catch (error) {
      console.error("Error creating dish:", error);
      return { success: false, message: "Failed to create dish" };
    }
  },

  fetchDishes: async () => {
    try {
      const res = await fetch(`${base_url}/api/menu`);
      if (!res.ok) throw new Error("Failed to fetch dishes");
      const data = await res.json();
      set({ dishes: data.data });
    } catch (error) {
      console.error("Error fetching dishes:", error);
      set({ dishes: [] });
    }
  },

  deleteDish: async (dishId) => {
    const res = await fetch(`${base_url}/api/menu/${dishId}`, {
      method: "DELETE"
    });
    const data = await res.json();
    if (!data.success) return { success: false, message: data.message };

    // Remove from local state
    set((state) => ({
      dishes: state.dishes.filter((dish) => dish._id !== dishId)
    }));
    return { success: true, message: data.message };
  },

  updateDish: async (dishId, updatedDish) => {
    // For an update, you might do the same approach (FormData) if you're allowing a new file.
    // For now, this code is left as JSON. 
    const res = await fetch(`${base_url}/api/menu/${dishId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedDish)
    });
    const data = await res.json();
    if (!data.success) return { success: false, message: data.message };

    // Update local state
    set((state) => ({
      dishes: state.dishes.map((dish) => (dish._id === dishId ? data.data : dish))
    }));
    return { success: true, message: data.message };
  },
  toggleFeaturedDish: async (dishId, currentStatus) => {
    try {
      const res = await fetch(`${base_url}/api/menu/feature`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ dishId, featured: !currentStatus }),
      });
      const data = await res.json();

      if(!data.success) return alert(data.message);
      set((state) => ({
        dishes: state.dishes.map((d) =>
          d._id === dishId ? { ...d, featured: data.data.featured } : d
        ),
      }));
    } catch (error) {
      console.error("Error toggling featured:", error);
    }
  },
  fetchFeatured: async () => {
    try {
      const res = await fetch(`${base_url}/api/menu/featured`);
      const data = await res.json();
  
      if (data.success) {
        return data.data; // ✅ return the featured dishes
      } else {
        console.error("Failed to fetch featured dishes:", data.message);
        return [];
      }
    } catch (error) {
      console.error("Error fetching featured dishes:", error);
      return [];
    }
  }
}));
