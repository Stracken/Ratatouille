import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import Colors from '../constants/Colors';

export default  CustomButton = ({ onPress, title, color = Colors.danger }) => (
  <Pressable 
    style={({ pressed }) => [
      styles.button,
      { backgroundColor: pressed ? Colors.greenAgri : color }
    ]}
    onPress={onPress}
  >
    <Text style={styles.text}>{title}</Text>
  </Pressable>
);

const styles = StyleSheet.create({
  button: {
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    margin:5,
    borderRadius:10,
    width:200,
    
  },
  text: {
    color: 'white',
    fontSize: 16,
  },
});