import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  ActivityIndicator,
  Linking,
  TouchableOpacity 
} from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { getRecipeById } from '../services/api';
import { Recipe } from '../types/types';
import RecipeHeader from '../components/RecipeHeader';
import Icon from 'react-native-vector-icons/Ionicons';
import { useFavoritesContext } from '../context/FavoritesContext';
import { RootStackParamList } from '../navigation/AppNavigator';

type RecipeDetailRouteProp = RouteProp<RootStackParamList, 'RecipeDetail'>;

type Props = {
  route: RecipeDetailRouteProp;
};

const RecipeDetailScreen = ({ route }: Props) => {
  const { recipeId } = route.params;
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isFavorite, saveFavorite, removeFavorite } = useFavoritesContext();
  
  useEffect(() => {
    const loadRecipe = async () => {
      try {
        const data = await getRecipeById(recipeId);
        setRecipe(data);
      } catch (err) {
        setError('Failed to load recipe details');
      } finally {
        setLoading(false);
      }
    };
    
    loadRecipe();
  }, [recipeId]);
  
  const handleToggleFavorite = () => {
    if (!recipe) return;
    
    if (isFavorite(recipe.idMeal)) {
      removeFavorite(recipe.idMeal);
    } else {
      saveFavorite(recipe);
    }
  };
  
  const handleWatchVideo = () => {
    if (recipe?.strYoutube) {
      Linking.openURL(recipe.strYoutube);
    }
  };
  
  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#ff6b6b" />
      </View>
    );
  }
  
  if (error || !recipe) {
    return (
      <View style={styles.centered}>
        <Text style={styles.error}>{error || 'Recipe not found'}</Text>
      </View>
    );
  }
  
  return (
    <ScrollView style={styles.container}>
      <RecipeHeader
        title={recipe.strMeal}
        category={recipe.strCategory}
        area={recipe.strArea}
        image={recipe.strMealThumb}
        isFavorite={isFavorite(recipe.idMeal)}
        onToggleFavorite={handleToggleFavorite}
      />
      
      {recipe.strYoutube && (
        <TouchableOpacity style={styles.videoButton} onPress={handleWatchVideo}>
          <Icon name="logo-youtube" size={24} color="#fff" />
          <Text style={styles.videoButtonText}>Watch Video</Text>
        </TouchableOpacity>
      )}
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Ingredients</Text>
        {recipe.ingredients.map((ingredient, index) => (
          <View key={index} style={styles.ingredientRow}>
            <Text style={styles.ingredientName}>{ingredient.name}</Text>
            <Text style={styles.ingredientMeasure}>{ingredient.measure}</Text>
          </View>
        ))}
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Instructions</Text>
        <Text style={styles.instructions}>{recipe.strInstructions}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
    margin: 16,
  },
  section: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  ingredientRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  ingredientName: {
    fontSize: 16,
  },
  ingredientMeasure: {
    fontSize: 16,
    color: '#666',
  },
  instructions: {
    fontSize: 16,
    lineHeight: 24,
  },
  videoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ff0000',
    marginHorizontal: 16,
    marginTop: -8,
    marginBottom: 16,
    padding: 12,
    borderRadius: 8,
  },
  videoButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 8,
  },
});

export default RecipeDetailScreen;