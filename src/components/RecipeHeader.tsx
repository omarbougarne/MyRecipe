import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import FavoriteButton from './UI/FavoriteButton';

type RecipeHeaderProps = {
  title: string;
  category: string;
  area: string;
  image: string;
  isFavorite: boolean;
  onToggleFavorite: () => void;
};

const RecipeHeader = ({ title, category, area, image, isFavorite, onToggleFavorite }: RecipeHeaderProps) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: image }} style={styles.image} />
      <View style={styles.overlay}>
        <FavoriteButton isFavorite={isFavorite} onPress={onToggleFavorite} size={28} />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.tags}>
          <View style={styles.tag}>
            <Text style={styles.tagText}>{category}</Text>
          </View>
          <View style={styles.tag}>
            <Text style={styles.tagText}>{area}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  image: {
    width: width,
    height: 250,
    resizeMode: 'cover',
  },
  overlay: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderRadius: 20,
  },
  infoContainer: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  tags: {
    flexDirection: 'row',
  },
  tag: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
  },
  tagText: {
    fontSize: 14,
    color: '#666',
  },
});

export default RecipeHeader;