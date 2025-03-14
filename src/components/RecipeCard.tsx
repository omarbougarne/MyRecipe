import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

type RecipeCardProps = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strCategory?: string;
};

const RecipeCard = ({ idMeal, strMeal, strMealThumb, strCategory }: RecipeCardProps) => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate('RecipeDetail', { recipeId: idMeal });
  };

  return (
    <TouchableOpacity style={styles.card} onPress={handlePress}>
      <Image source={{ uri: strMealThumb }} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.title} numberOfLines={2}>{strMeal}</Text>
        {strCategory && <Text style={styles.category}>{strCategory}</Text>}
      </View>
    </TouchableOpacity>
  );
};

const { width } = Dimensions.get('window');
const cardWidth = width / 2 - 24; // 2 cards per row with some margin

const styles = StyleSheet.create({
  card: {
    width: cardWidth,
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 140,
    resizeMode: 'cover',
  },
  infoContainer: {
    padding: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  category: {
    fontSize: 14,
    color: '#666',
  },
});

export default RecipeCard;