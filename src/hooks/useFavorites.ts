import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Recipe } from '../types/types';

const FAVORITES_KEY = '@favorites_recipes';

const useFavorites = () => {
    const [favorites, setFavorites] = useState<Recipe[]>([]);

    // Load favorites when the app starts
    useEffect(() => {
        loadFavorites();
    }, []);

    const loadFavorites = async () => {
        try {
            const storedFavorites = await AsyncStorage.getItem(FAVORITES_KEY);
            if (storedFavorites) {
                setFavorites(JSON.parse(storedFavorites));
            }
        } catch (error) {
            console.error('Failed to load favorites', error);
        }
    };

    const saveFavorite = async (recipe: Recipe) => {
        try {
            const updatedFavorites = [...favorites, recipe];
            setFavorites(updatedFavorites);
            await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
        } catch (error) {
            console.error('Failed to save favorite', error);
        }
    };

    const removeFavorite = async (recipeId: string) => {
        try {
            const updatedFavorites = favorites.filter((recipe) => recipe.idMeal !== recipeId);
            setFavorites(updatedFavorites);
            await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
        } catch (error) {
            console.error('Failed to remove favorite', error);
        }
    };

    const isFavorite = (recipeId: string): boolean => {
        return favorites.some(recipe => recipe.idMeal === recipeId);
    };

    return {
        favorites,
        saveFavorite,
        removeFavorite,
        isFavorite
    };
};

export default useFavorites;