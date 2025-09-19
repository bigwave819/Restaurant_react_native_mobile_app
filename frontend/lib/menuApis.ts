import { API_URL } from "@/constants/index";


export async function fetchMenu() {
    try {
        console.log(`Fetching from: ${API_URL}/menu/get`);
        
        const response = await fetch(`${API_URL}/menu/get`);
        
        
        if(!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log("API response received:", data);
        
        if (data.menu && Array.isArray(data.menu)) {
            return data.menu;
        } else {
            console.warn("Unexpected API response structure:", data);
            return [];
        }
    } catch (error) {
        console.error("Detailed error fetching menu:", error);
        throw error; // Re-throw to handle in component
    }
}