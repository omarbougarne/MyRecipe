import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

type RecipeCardProps = {
  title: string;
  image: string;
  cookTime: string;
};

const RecipeCard = ({ title, image, cookTime }: RecipeCardProps) => (
  <View style={styles.card}>
    <Image source={{ uri: image }} style={styles.image} />
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.time}>⏱ {cookTime}</Text>
  </View>
);

const styles = StyleSheet.create({
  card: { /* ... */ },
  image: { /* ... */ },
  title: { /* ... */ },
  time: { /* ... */ }
});

export default RecipeCard;