import React, { useEffect, useState } from 'react';
import { View, FlatList } from 'react-native';
import RecipeCard from '../components/RecipeCard';
// import SearchBar from '../components/SearchBar';
import { getRecipes } from '../services/api';

const HomeScreen = () => {
  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const loadRecipes = async () => {
      try {
        const data = await getRecipes(searchTerm);
        setRecipes(data);
      } catch (error) {
        // Handle error
      }
    };
    
    const timeoutId = setTimeout(() => {
      loadRecipes();
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  return (
    <View>
      {/* <SearchBar value={searchTerm} onChangeText={setSearchTerm} /> */}
      <FlatList
        data={recipes}
        renderItem={({ item }) => <RecipeCard {...item} />}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};