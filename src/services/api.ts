import axios from 'axios';
import { Recipe, ApiResponse, Category, Ingredient, Area } from '../types/types';
// import { API_BASE_URL } from '../../';

const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';


const transformRecipeData = (meal: any): Recipe => {
    const ingredients: Ingredient[] = [];

    for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        const measure = meal[`strMeasure${i}`];

        if (ingredient && ingredient.trim() !== '') {
            ingredients.push({
                name: ingredient,
                measure: measure || ''
            });
        }
    }

    return {
        ...meal,
        ingredients
    };
};


export const searchRecipes = async (query: string): Promise<Recipe[]> => {
    try {
        const response = await axios.get<ApiResponse<any>>(`${BASE_URL}/search.php?s=${query}`);

        if (!response.data.meals) {
            return [];
        }

        return response.data.meals.map(transformRecipeData);
    } catch (error) {
        console.error('Error searching recipes:', error);
        throw error;
    }
};


export const getRecipeById = async (id: string): Promise<Recipe | null> => {
    try {
        const response = await axios.get<ApiResponse<any>>(`${BASE_URL}/lookup.php?i=${id}`);

        if (!response.data.meals || response.data.meals.length === 0) {
            return null;
        }

        return transformRecipeData(response.data.meals[0]);
    } catch (error) {
        console.error('Error getting recipe details:', error);
        throw error;
    }
};


export const getRandomRecipe = async (): Promise<Recipe | null> => {
    try {
        const response = await axios.get<ApiResponse<any>>(`${BASE_URL}/random.php`);

        if (!response.data.meals || response.data.meals.length === 0) {
            return null;
        }

        return transformRecipeData(response.data.meals[0]);
    } catch (error) {
        console.error('Error getting random recipe:', error);
        throw error;
    }
};


export const getCategories = async (): Promise<Category[]> => {
    try {
        const response = await axios.get<{ categories: Category[] }>(`${BASE_URL}/categories.php`);
        return response.data.categories || [];
    } catch (error) {
        console.error('Error getting categories:', error);
        throw error;
    }
};


export const getRecipesByCategory = async (category: string): Promise<Recipe[]> => {
    try {
        const response = await axios.get<ApiResponse<any>>(`${BASE_URL}/filter.php?c=${category}`);

        if (!response.data.meals) {
            return [];
        }


        const recipePromises = response.data.meals.map(async (meal: any) => {
            return getRecipeById(meal.idMeal);
        });

        const recipes = await Promise.all(recipePromises);
        return recipes.filter((recipe): recipe is Recipe => recipe !== null);
    } catch (error) {
        console.error('Error getting recipes by category:', error);
        throw error;
    }
};


export const getAreas = async (): Promise<Area[]> => {
    try {
        const response = await axios.get<ApiResponse<Area>>(`${BASE_URL}/list.php?a=list`);
        return response.data.meals || [];
    } catch (error) {
        console.error('Error getting areas:', error);
        throw error;
    }
};