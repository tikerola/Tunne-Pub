import React from 'react'
import { View, StyleSheet } from 'react-native'

export const Divider = ({ width }) => {
  return (
    <View style={[styles.divider, { width }]} />
  )
}

const styles = StyleSheet.create({
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: '#bbb',
    alignSelf: 'center',
    marginTop: 12,
    marginBottom: 12
  }
})

