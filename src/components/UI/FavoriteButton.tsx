import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

type FavoriteButtonProps = {
  isFavorite: boolean;
  onPress: () => void;
  size?: number;
};

const FavoriteButton = ({ isFavorite, onPress, size = 24 }: FavoriteButtonProps) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Icon
        name={isFavorite ? 'heart' : 'heart-outline'}
        size={size}
        color={isFavorite ? '#ff6b6b' : '#666'}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
  },
});

export default FavoriteButton;