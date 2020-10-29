import React from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'

export default function CustomTextInput({ description, value, handleChange, placeholder = 'Kirjoita omin sanoin...', ...otherProps }) {

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{description}</Text>
      <TextInput
        {...otherProps}
        testID="custom-input"
        style={styles.textInput}
        onChangeText={text => handleChange(text)}
        placeholder={placeholder}
        placeholderTextColor="#555"
        keyboardAppearance='dark'
        value={value}
        multiline
        numberOfLines={5}
        textAlignVertical={"top"}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 0,
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    alignItems: 'center'
  },

  text: {
    width: '95%',
    fontSize: 18,
    fontFamily: 'Roboto-Light',
    color: '#bbb'
  },

  textInput: {
    width: '95%',
    borderWidth: 1,
    backgroundColor: '#333',
    borderRadius: 5,
    padding: 5,
    borderColor: '#bbb',
    color: '#bbb'
  }

})
