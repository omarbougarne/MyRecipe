import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import RecipeDetailScreen from '../screens/RecipeDetailScreen';
import FavoritesScreen from '../screens/FavoritesScreen';

// Define navigation types
export type RootStackParamList = {
  HomeTabs: undefined;
  RecipeDetail: { recipeId: string };
};

export type HomeTabsParamList = {
  Home: undefined;
  Favorites: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<HomeTabsParamList>();

// Bottom tabs component
const HomeTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Favorites" component={FavoritesScreen} />
    </Tab.Navigator>
  );
};

// Main navigator component
const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="HomeTabs" 
          component={HomeTabs} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen name="RecipeDetail" component={RecipeDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;