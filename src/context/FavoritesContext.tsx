import React, { createContext, useContext } from 'react';
import useFavorites from '../hooks/useFavorites';
import { Recipe } from '../types/types';

interface FavoritesContextType {
    favorites: Recipe[];
    saveFavorite: (recipe: Recipe) => Promise<void>;
    removeFavorite: (recipeId: string) => Promise<void>;
    isFavorite: (recipeId: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { favorites, saveFavorite, removeFavorite, isFavorite } = useFavorites();

    const value = {
        favorites,
        saveFavorite,
        removeFavorite,
        isFavorite
    };

    return (
        <FavoritesContext.Provider value= { value } >
        { children }
        </FavoritesContext.Provider>
  );
};

export const useFavoritesContext = () => {
    const context = useContext(FavoritesContext);
    if (!context) {
        throw new Error('useFavoritesContext must be used within a FavoritesProvider');
    }
    return context;
};