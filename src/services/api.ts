import axios from 'axios';

const api = axios.create({
    baseURL: 'www.themealdb.com/api/json/v1/',
});

export const getRecipes = async (searchTerm: string) => {
    try {
        const response = await api.get(`/recipes?search=${searchTerm}`);
        return response.data;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
};