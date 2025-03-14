import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useUserRecipes } from '../context/UserRecipesContext';
import Icon from 'react-native-vector-icons/Ionicons';

interface IngredientInput {
  name: string;
  measure: string;
}

const AddRecipeScreen = () => {
  const navigation = useNavigation();
  const { addRecipe } = useUserRecipes();
  
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [area, setArea] = useState('');
  const [instructions, setInstructions] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [ingredients, setIngredients] = useState<IngredientInput[]>([
    { name: '', measure: '' }
  ]);
  
  const handleAddIngredient = () => {
    setIngredients([...ingredients, { name: '', measure: '' }]);
  };
  
  const handleRemoveIngredient = (index: number) => {
    const newIngredients = [...ingredients];
    newIngredients.splice(index, 1);
    setIngredients(newIngredients);
  };
  
  const handleIngredientChange = (index: number, field: keyof IngredientInput, value: string) => {
    const newIngredients = [...ingredients];
    newIngredients[index][field] = value;
    setIngredients(newIngredients);
  };
  
  const handleSaveRecipe = async () => {
    // Basic validation
    if (!name || !category || !instructions) {
      Alert.alert('Missing Information', 'Please fill in all required fields');
      return;
    }
    
    // Filter out empty ingredients
    const validIngredients = ingredients.filter(ing => ing.name.trim() !== '');
    
    if (validIngredients.length === 0) {
      Alert.alert('Missing Ingredients', 'Please add at least one ingredient');
      return;
    }
    
    try {
      await addRecipe({
          strMeal: name,
          strCategory: category,
          strArea: area || 'Unknown',
          strInstructions: instructions,
          strMealThumb: imageUrl || 'https://via.placeholder.com/400x400?text=No+Image',
          ingredients: validIngredients,
          strTags: '',
          strYoutube: '',
          dateModified: new Date().toISOString(),
          strDrinkAlternate: null
      });
      
      Alert.alert('Success', 'Recipe added successfully!', [
        { text: 'OK', onPress: () => navigation.goBack() }
      ]);
    } catch (error) {
      Alert.alert('Error', 'Failed to save recipe');
    }
  };
  
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Add New Recipe</Text>
      
      <View style={styles.field}>
        <Text style={styles.label}>Recipe Name *</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Enter recipe name"
        />
      </View>
      
      <View style={styles.field}>
        <Text style={styles.label}>Category *</Text>
        <TextInput
          style={styles.input}
          value={category}
          onChangeText={setCategory}
          placeholder="e.g., Dessert, Pasta, Seafood"
        />
      </View>
      
      <View style={styles.field}>
        <Text style={styles.label}>Cuisine/Area</Text>
        <TextInput
          style={styles.input}
          value={area}
          onChangeText={setArea}
          placeholder="e.g., Italian, Mexican, Chinese"
        />
      </View>
      
      <View style={styles.field}>
        <Text style={styles.label}>Image URL</Text>
        <TextInput
          style={styles.input}
          value={imageUrl}
          onChangeText={setImageUrl}
          placeholder="Enter image URL"
        />
        {imageUrl ? (
          <Image source={{ uri: imageUrl }} style={styles.previewImage} />
        ) : null}
      </View>
      
      <View style={styles.field}>
        <View style={styles.headerRow}>
          <Text style={styles.label}>Ingredients *</Text>
          <TouchableOpacity onPress={handleAddIngredient} style={styles.addButton}>
            <Icon name="add-circle" size={24} color="#ff6b6b" />
          </TouchableOpacity>
        </View>
        
        {ingredients.map((ingredient, index) => (
          <View key={index} style={styles.ingredientRow}>
            <TextInput
              style={styles.ingredientInput}
              value={ingredient.name}
              onChangeText={(value) => handleIngredientChange(index, 'name', value)}
              placeholder="Ingredient"
            />
            <TextInput
              style={styles.measureInput}
              value={ingredient.measure}
              onChangeText={(value) => handleIngredientChange(index, 'measure', value)}
              placeholder="Amount"
            />
            <TouchableOpacity onPress={() => handleRemoveIngredient(index)}>
              <Icon name="close-circle" size={24} color="#ff4757" />
            </TouchableOpacity>
          </View>
        ))}
      </View>
      
      <View style={styles.field}>
        <Text style={styles.label}>Instructions *</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={instructions}
          onChangeText={setInstructions}
          placeholder="Enter step-by-step instructions"
          multiline
          textAlignVertical="top"
        />
      </View>
      
      <TouchableOpacity style={styles.saveButton} onPress={handleSaveRecipe}>
        <Text style={styles.saveButtonText}>Save Recipe</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  field: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  textArea: {
    minHeight: 120,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  addButton: {
    padding: 4,
  },
  ingredientRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  ingredientInput: {
    flex: 2,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    marginRight: 8,
  },
  measureInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    marginRight: 8,
  },
  previewImage: {
    width: '100%',
    height: 200,
    marginTop: 8,
    borderRadius: 8,
  },
  saveButton: {
    backgroundColor: '#ff6b6b',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 20,
  },
  saveButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default AddRecipeScreen;