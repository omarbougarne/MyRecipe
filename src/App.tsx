import React from 'react';
import { StatusBar } from 'react-native';
import AppNavigator from './navigation/AppNavigator';
import { FavoritesProvider } from './context/FavoritesContext';
import { UserRecipesProvider } from './context/UserRecipesContext';

function App(): React.JSX.Element {
  return (
    <FavoritesProvider>
      <UserRecipesProvider>
        <StatusBar />
        <AppNavigator />
      </UserRecipesProvider>
    </FavoritesProvider>
  );
}

export default App;