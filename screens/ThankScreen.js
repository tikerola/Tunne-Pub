import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { colors } from '../constants/colors';
import { dimensions } from '../constants/dimensions';


export default function ThankScreen() {

  const { width } = Dimensions.get('window')


  return (
    <View style={{ flex: 1, alignItems: 'center', backgroundColor: colors.bodyBg }}>
      <View style={styles.container}>
        <View style={[styles.textContainer, { width: width <= dimensions.phoneMaxWidth ? '100%' : '75%' }]}>
          <Text style={styles.title}>Onneksi olkoon!</Text>
          <Text style={styles.text}>Olet nyt tallentanut vastauksesi ja voit alavalikon
          Tallennetut-napista valita tallennetun istunnon, tutkailla sitä ja tarpeen tullen
          tehdä lisämuutoksia.
        </Text>
        </View>
      </View>
    </View>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },

  textContainer: {
    backgroundColor: 'rgba(0, 0,0, 0.8)',
    borderRadius: 8,
    padding: 15
  },

  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },

  title: {
    fontSize: 20,
    fontFamily: 'Roboto-Light',
    marginBottom: 25,
    color: '#bbb',
    textAlign: 'center'
  },

  text: {
    color: '#bbb',
    fontSize: 18,
    fontFamily: 'Roboto-Light',
    marginBottom: 30
  }

})
