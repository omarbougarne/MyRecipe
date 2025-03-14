import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import HomeScreen from '../screens/HomeScreen';
import RecipeDetailScreen from '../screens/RecipeDetailScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import UserRecipesScreen from '../screens/UserRecipesScreen';
import AddRecipeScreen from '../screens/AddRecipesScreen';

export type RootStackParamList = {
  HomeTabs: undefined;
  RecipeDetail: { recipeId: string };
  AddRecipe: undefined;
  EditRecipe: { recipeId: string };
};

export type HomeTabsParamList = {
  Home: undefined;
  Favorites: undefined;
  MyRecipes: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<HomeTabsParamList>();

const HomeTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = '';
          
          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Favorites') {
            iconName = focused ? 'heart' : 'heart-outline';
          } else if (route.name === 'MyRecipes') {
            iconName = focused ? 'create' : 'create-outline';
          }
          
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#ff6b6b',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{ title: 'Discover' }}
      />
      <Tab.Screen 
        name="Favorites" 
        component={FavoritesScreen} 
        options={{ title: 'Favorites' }}
      />
      <Tab.Screen 
        name="MyRecipes" 
        component={UserRecipesScreen} 
        options={{ title: 'My Recipes' }}
      />
    </Tab.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="HomeTabs" 
          component={HomeTabs} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="RecipeDetail" 
          component={RecipeDetailScreen} 
          options={{ title: 'Recipe Details' }}
        />
        <Stack.Screen 
          name="AddRecipe" 
          component={AddRecipeScreen} 
          options={{ title: 'Add New Recipe' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;