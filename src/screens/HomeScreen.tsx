import React, { useEffect, useState } from 'react';
import { View, FlatList, Text } from 'react-native';
import RecipeCard from '../components/RecipeCard';
// import SearchBar from '../components/SearchBar';
// import { getRecipes } from '../services/api';
// import { API_BASE_URL, API_KEY } from '@env';
const HomeScreen = () => {
  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // useEffect(() => {
  //   const loadRecipes = async () => {
  //     try {
  //       const data = await getRecipes(searchTerm);
  //       setRecipes(data);
  //     } catch (error) {
  //       // Handle error
  //     }
  //   };
    
    
    
  //   const timeoutId = setTimeout(() => {
  //     loadRecipes();
  //   }, 500);

  //   return () => clearTimeout(timeoutId);
  // }, [searchTerm]);

  return (
    <View>
      <Text>jhjh</Text>
      {/* <SearchBar value={searchTerm} onChangeText={setSearchTerm} /> */}
      {/* <FlatList
        data={recipes}
        renderItem={({ item }) => <RecipeCard {...item} />}
        keyExtractor={(item) => item.id.toString()}
      /> */}
    </View>
  );
};

export default HomeScreen;