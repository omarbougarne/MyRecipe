import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Category } from '../types/types';

type CategoryListProps = {
  categories: Category[];
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
};

const CategoryList = ({ categories, selectedCategory, onSelectCategory }: CategoryListProps) => {
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <TouchableOpacity
          style={[
            styles.categoryItem,
            !selectedCategory && styles.selectedCategory
          ]}
          onPress={() => onSelectCategory(null)}
        >
          <Text style={[
            styles.categoryText,
            !selectedCategory && styles.selectedCategoryText
          ]}>
            All
          </Text>
        </TouchableOpacity>
        
        {categories.map((category) => (
          <TouchableOpacity
            key={category.idCategory}
            style={[
              styles.categoryItem,
              selectedCategory === category.strCategory && styles.selectedCategory
            ]}
            onPress={() => onSelectCategory(category.strCategory)}
          >
            <Image
              source={{ uri: category.strCategoryThumb }}
              style={styles.categoryImage}
            />
            <Text style={[
              styles.categoryText,
              selectedCategory === category.strCategory && styles.selectedCategoryText
            ]}>
              {category.strCategory}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  scrollContent: {
    paddingHorizontal: 16,
  },
  categoryItem: {
    marginRight: 12,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectedCategory: {
    backgroundColor: '#ff6b6b',
  },
  categoryImage: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 8,
  },
  categoryText: {
    fontSize: 14,
    color: '#333',
  },
  selectedCategoryText: {
    color: 'white',
    fontWeight: '600',
  },
});

export default CategoryList;