import React from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import { useFavoritesContext } from '../context/FavoritesContext';
import RecipeCard from '../components/RecipeCard';

const FavoritesScreen = () => {
  const { favorites } = useFavoritesContext();

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Your Favorites</Text>
      
      {favorites.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>You haven't added any favorites yet</Text>
          <Text style={styles.emptySubtext}>
            Save your favorite recipes by tapping the heart icon
          </Text>
        </View>
      ) : (
        <FlatList
          data={favorites}
          renderItem={({ item }) => <RecipeCard {...item} />}
          keyExtractor={(item) => item.idMeal}
          numColumns={2}
          columnWrapperStyle={styles.columnWrapper}
          contentContainerStyle={styles.listContent}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 16,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  listContent: {
    paddingBottom: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});

export default FavoritesScreen;