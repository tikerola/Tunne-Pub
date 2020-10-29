import React from 'react'
import { ProgressStep, ProgressSteps } from '@tkkortit/own-stepper'
import { StyleSheet } from 'react-native'

export default function CustomProgressStep({ children, last = false, ...props }) {
  return (
    <ProgressStep
      previousBtnText="Edellinen"
      nextBtnText="Seuraava"
      finishBtnText={last ? "Tallenna" : "Seuraava"}
      nextBtnTextStyle={styles.buttonStyle}
      previousBtnTextStyle={styles.buttonStyle}
      scrollViewProps={{ keyboardShouldPersistTaps: 'handled' }}
      {...props}
    >
      {children}
    </ProgressStep>
  )
}

const styles = StyleSheet.create({
  buttonStyle: {
    color: '#bbb',
    fontSize: 18,
    fontFamily: 'Roboto-Light'
  },
})