import {create} from "zustand"
const base_url = "http://localhost:3000"

export const useMenuStore = create((set) => ({
    dishes: [],
    setDishes: (dishes) => set({dishes}),
    createDish: async (newDish) => {
        if(!newDish.dishName || !newDish.price || !newDish.description || !newDish.image)
            {
                return {success: false, message: "Fill all the fields to create a dish"}
            }
        try {
            const res = await fetch(`${base_url}/api/menu`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newDish)
            } );
            const data = res.json()
            set((state) => ({dishes: [...state.dishes, data.data]}))
            return {success: true, message: "Dish added Sucessfully "};
        } catch (error) {
            console.error("Error creating dish:", error);
             return {success: false, message: "Failed to create dish"};
        }
        

    },
    fetchDishes: async () => {
    try {
        console.log("Fetching dishes...");
        const res = await fetch(`${base_url}/api/menu`);
        console.log("Fetch response:", res);
        if (!res.ok) throw new Error('Failed to fetch dishes');
        const data = await res.json();
        console.log("Fetch data:", data);
        set({ dishes: data.data });
    } catch (error) {
        console.error("Error fetching dishes:", error);
        set({ dishes: [] }); // Fallback to an empty array if there's an error
    }
    },
    deleteDish: async(dishid) => {
        const res = await fetch(`${base_url}/api/menu/${dishid}`,{
            method: "DELETE",
        });
        const data = await res.json();
        if(!data.success) return {success: false, message:data.message};

        //update the UI immediately to display changed.
        set((state) => ({dishes: state.dishes.filter((dish) => dish._id !== dishid)}));
        return {success: true, message: data.message}
    }, 
    updateDish: async(dishid, updatedDish) => {
        const res = await fetch(`${base_url}/api/menu/${dishid}`,{
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedDish),
        });
        const data = await res.json();
        if(!data.success) return {success: false, message:data.message};
        set((state) => ({
            dishes: state.dishes.map((dish) => (dish._id === dishid ? data.data : dish))
        }))
        return {success: true, message: data.message};
    }

}))