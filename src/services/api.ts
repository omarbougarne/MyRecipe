import axios from 'axios';

const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

export const getRecipes = async (searchTerm = '') => {
    try {
        let endpoint = '/search.php?s=';
        if (searchTerm) {
            endpoint += searchTerm;
        }

        const response = await axios.get(`${BASE_URL}${endpoint}`);
        return response.data.meals || [];
    } catch (error) {
        console.error('Error fetching recipes:', error);
        throw error;
    }
};

export const getRecipeById = async (id) => {
    try {
        const response = await axios.get(`${BASE_URL}/lookup.php?i=${id}`);
        return response.data.meals?.[0] || null;
    } catch (error) {
        console.error('Error fetching recipe details:', error);
        throw error;
    }
};

export const getRecipesByCategory = async (category) => {
    try {
        const response = await axios.get(`${BASE_URL}/filter.php?c=${category}`);
        return response.data.meals || [];
    } catch (error) {
        console.error('Error fetching recipes by category:', error);
        throw error;
    }
};

export const getCategories = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/categories.php`);
        return response.data.categories || [];
    } catch (error) {
        console.error('Error fetching categories:', error);
        throw error;
    }
};