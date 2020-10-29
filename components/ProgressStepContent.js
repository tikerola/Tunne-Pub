import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { colors } from '../constants/colors'
import CustomButton from './CustomButton'
import CustomTextInput from './CustomTextInput'



const ProgressStepContent = ({ description, answer, setAnswer, error, handleSubmit, pad = false }) => {

  return (
    <View style={pad && styles.pad}>
      <CustomTextInput description={description} value={answer} handleChange={setAnswer} />
      <Text style={styles.error}>{error}</Text>
      <CustomButton title="Tallenna" onPress={() => handleSubmit(answer)} touchable={true} />
    </View>
  )
}

export default ProgressStepContent

const styles = StyleSheet.create({
  error: {
    textAlign: 'center',
    fontSize: 16,
    fontFamily: 'Roboto-Bold',
    color: 'red',
  },
  pad: {
    backgroundColor: colors.stepperContentBg,
    padding: 50,
    borderRadius: 10
  }
})
