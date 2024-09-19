import { StyleSheet, TextInput,Text, View,SafeAreaView } from 'react-native'
import React from 'react'
import { useState } from 'react';

const TextInputEx = () => {
        const [name, onChangeName] = useState('');
        const [lastName, onChangeLastName] = useState('');
        const [adress, onChangeAdress] = useState('');
        const [cp, onChangeCp] = useState('');
        const [number, onChangeNumber] = useState('');
        
  return (
    <View>

<SafeAreaView>
  <View style={styles.firstLine}>
    <View style={styles.box}>
    <Text>Nom</Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangeName}
        value={name}
        placeholder="inscrivez votre Nom"
      />
    </View>
    <View style={styles.box}>
      <Text>Prénom</Text>
    <TextInput
        style={styles.input}
        onChangeText={onChangeLastName}
        value={lastName}
        placeholder="inscrivez votre Prénom"
      />
    </View>
      
  </View>
  <View style={styles.secondLine}>
  <TextInput
        style={styles.inputAdress}
        onChangeText={onChangeAdress}
        value={adress}
        placeholder="inscrivez votre Adresse"
      />
  <TextInput
        style={styles.inputCP}
        onChangeText={onChangeCp}
        value={cp}
        placeholder="inscrivez votre Code Postal"
      />
  </View>
  
    
        <TextInput
          style={styles.input}
          onChangeText={onChangeNumber}
          value={number}
          placeholder="useless placeholder"
          keyboardType="numeric"
        />
      </SafeAreaView>
    </View>
  )
}

export default TextInputEx

const styles = StyleSheet.create({
    input: {
        height: 40,
        borderWidth: 1,
        padding: 10,
      },
    inputAdress: {
        height: 100,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        width:"60%"
      },
      inputCP: {
        height: 100,
        marginVertical: 12,
        marginLeft:10,
        borderWidth: 1,
        padding: 10,
        width:"27%"
      },
    firstLine:{
      flexDirection: 'row',
      marginHorizontal: 10
    },
    secondLine:{
      flexDirection: 'row',
    },
    box:{
    alignItems:"flex-start"
    }
})