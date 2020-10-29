import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default function CustomHeaderTitle({ name, letterNum, ...props }) {

  return (
    <View>
      <Text
        style={[props.style, { color: props.tintColor, fontSize: 20 }]}
      >
        TUNNE_APP <Text style={styles.name}>
          {
            name.length <= letterNum ? name : `${name.substring(0, letterNum)}...`
          }
        </Text></Text>
    </View>
  )
}

const styles = StyleSheet.create({

  name: {
    fontSize: 15,
    color: '#bbb'
  }
})
