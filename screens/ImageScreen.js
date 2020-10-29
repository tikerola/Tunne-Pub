import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import CustomButton from '../components/CustomButton'
import ImageSlider from '../components/ImageSlider'
import { colors } from '../constants/colors'


export default function ImageScreen({ navigation }) {


  return (
    <View style={styles.container}>
      <Text style={styles.info}>*Kuvalista jatkuu vierittämällä näyttöä</Text>
      <ImageSlider />
      <View testID="buttonContainer" style={styles.button}>
        <CustomButton title="Tallenna" onPress={() => {
          navigation.navigate('MainScreen')
        }} />
      </View>
    </View>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bodyBg
  },

  button: {
    marginTop: 10,
    marginBottom: 15
  },

  info: {
    width: '100%',
    marginTop: 10,
    marginLeft: 15,
    marginBottom: 5,
    fontSize: 16,
    fontFamily: 'Roboto-Light',
    color: '#999'
  },

})
