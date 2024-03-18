// App.js
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import SimpleTextInput from './TodoList';

const App = () => {
 
  return (
    <View style={styles.container}>
      <SimpleTextInput/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:20,
    // justifyContent: 'center',
    // alignItems: 'center',
    // padding: 3,
    backgroundColor: '#f0f0f0',
  },
  input: {
    height: 40,
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 16,
    backgroundColor: '#ffffff',
  },
});

export default App;
