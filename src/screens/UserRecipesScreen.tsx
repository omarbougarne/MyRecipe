import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import RecipeCard from '../components/RecipeCard';
import { useUserRecipes } from '../context/UserRecipesContext';
import Icon from 'react-native-vector-icons/Ionicons';

const UserRecipesScreen = () => {
  const { userRecipes, deleteRecipe } = useUserRecipes();
  const navigation = useNavigation();
  
  const handleAddRecipe = () => {
    navigation.navigate('AddRecipe');
  };
  
  const confirmDelete = (recipeId: string, recipeName: string) => {
    Alert.alert(
      'Delete Recipe',
      `Are you sure you want to delete "${recipeName}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: () => deleteRecipe(recipeId) }
      ]
    );
  };
  
  const renderItem = ({ item }) => (
    <View style={styles.recipeContainer}>
      <RecipeCard {...item} />
      <TouchableOpacity 
        style={styles.deleteButton}
        onPress={() => confirmDelete(item.idMeal, item.strMeal)}
      >
        <Icon name="trash-outline" size={22} color="#fff" />
      </TouchableOpacity>
    </View>
  );
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Recipes</Text>
        <TouchableOpacity style={styles.addButton} onPress={handleAddRecipe}>
          <Icon name="add" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
      
      {userRecipes.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>You haven't created any recipes yet</Text>
          <TouchableOpacity style={styles.emptyAddButton} onPress={handleAddRecipe}>
            <Text style={styles.emptyAddButtonText}>Add Your First Recipe</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={userRecipes}
          renderItem={renderItem}
          keyExtractor={(item) => item.idMeal}
          numColumns={2}
          columnWrapperStyle={styles.columnWrapper}
          contentContainerStyle={styles.listContent}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: '#ff6b6b',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  listContent: {
    paddingTop: 16,
    paddingBottom: 20,
  },
  recipeContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  deleteButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(255, 71, 87, 0.8)',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 18,
    marginBottom: 20,
    color: '#666',
  },
  emptyAddButton: {
    backgroundColor: '#ff6b6b',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  emptyAddButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default UserRecipesScreen;