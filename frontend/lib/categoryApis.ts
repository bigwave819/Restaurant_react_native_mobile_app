import { API_URL } from "@/constants/index";

export async function fetchCategory() {
    try {        
        const response = await fetch(`${API_URL}/category/view`);
        
        if(!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Fix: Access the nested category array
        if (data.category && data.category.category && Array.isArray(data.category.category)) {
            return data.category.category;
        } else {
            console.warn("Unexpected API response structure:", data);
            return [];
        }
    } catch (error) {
        console.error("Detailed error fetching Category:", error);
        throw error;
    }
}