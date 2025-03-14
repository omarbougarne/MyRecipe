import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Recipe } from '../types/types';
import { v4 as uuidv4 } from 'uuid';

interface UserRecipesContextType {
  userRecipes: Recipe[];
  addRecipe: (recipe: Omit<Recipe, 'idMeal'>) => Promise<void>;
  updateRecipe: (recipe: Recipe) => Promise<void>;
  deleteRecipe: (recipeId: string) => Promise<void>;
  getUserRecipe: (recipeId: string) => Recipe | undefined;
}

const USER_RECIPES_KEY = '@user_recipes';

const UserRecipesContext = createContext<UserRecipesContextType | undefined>(undefined);

export const UserRecipesProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [userRecipes, setUserRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    loadUserRecipes();
  }, []);

  const loadUserRecipes = async () => {
    try {
      const storedRecipes = await AsyncStorage.getItem(USER_RECIPES_KEY);
      if (storedRecipes) {
        setUserRecipes(JSON.parse(storedRecipes));
      }
    } catch (error) {
      console.error('Failed to load user recipes', error);
    }
  };

  const saveRecipesToStorage = async (recipes: Recipe[]) => {
    try {
      await AsyncStorage.setItem(USER_RECIPES_KEY, JSON.stringify(recipes));
    } catch (error) {
      console.error('Failed to save user recipes', error);
    }
  };

  const addRecipe = async (recipeData: Omit<Recipe, 'idMeal'>) => {
    try {
      const newRecipe: Recipe = {
        ...recipeData,
        idMeal: `user-${uuidv4()}`, 
        
      };
      
      const updatedRecipes = [...userRecipes, newRecipe];
      setUserRecipes(updatedRecipes);
      await saveRecipesToStorage(updatedRecipes);
    } catch (error) {
      console.error('Failed to add recipe', error);
    }
  };

  const updateRecipe = async (updatedRecipe: Recipe) => {
    try {
      const updatedRecipes = userRecipes.map(recipe => 
        recipe.idMeal === updatedRecipe.idMeal ? updatedRecipe : recipe
      );
      
      setUserRecipes(updatedRecipes);
      await saveRecipesToStorage(updatedRecipes);
    } catch (error) {
      console.error('Failed to update recipe', error);
    }
  };

  const deleteRecipe = async (recipeId: string) => {
    try {
      const updatedRecipes = userRecipes.filter(recipe => recipe.idMeal !== recipeId);
      setUserRecipes(updatedRecipes);
      await saveRecipesToStorage(updatedRecipes);
    } catch (error) {
      console.error('Failed to delete recipe', error);
    }
  };

  const getUserRecipe = (recipeId: string) => {
    return userRecipes.find(recipe => recipe.idMeal === recipeId);
  };

  return (
    <UserRecipesContext.Provider 
      value={{ userRecipes, addRecipe, updateRecipe, deleteRecipe, getUserRecipe }}
    >
      {children}
    </UserRecipesContext.Provider>
  );
};

export const useUserRecipes = () => {
  const context = useContext(UserRecipesContext);
  if (!context) {
    throw new Error('useUserRecipes must be used within a UserRecipesProvider');
  }
  return context;
};