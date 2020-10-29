import React, { useState } from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions
} from 'react-native';

import { useDispatch, useSelector } from 'react-redux'


export default function TextSlider({ textData, saveToRedux, question, columns, wordType }) {

  const words = useSelector(state => state.cards.summaryOfChosenItems[state.cards.activeSummaryItemId][wordType])
  const dispatch = useDispatch()
  

  const toggleSelectedWords = word => {
    const wordExists = words.includes(word)
    
    if (wordExists) {
      dispatch(saveToRedux(wordType, word, false, question))
    }
    else {
      dispatch(saveToRedux(wordType, word, true, question))
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.info}>*{wordType === 'sentences' ? 'Lauselista' : 'Sanalista'} jatkuu vierittämällä näyttöä</Text>
      <FlatList
        testID="flatlist"
        style={styles.flatlist}
        data={textData}
        numColumns={columns}
        extraData={words}
        keyExtractor={item => item.id}
        initialNumToRender={20}
        renderItem={({ item }) => <TouchableOpacity
          onPress={() => {
            toggleSelectedWords(item.word)
          }}
          style={[styles.wordContainer, { transform: [{ scale: words.includes(item.word) ? 1.1 : 1 }], width: columns === 2 ? '50%' : '100%' }]}
        >
          <View>
            <Text style={[styles.word, words.includes(item.word) && { color: 'red', transform: [{ translateX: 3 }] }]}>{item.word}</Text>
          </View>
        </TouchableOpacity>}
      />
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  container: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },

  info: {
    width: '100%',
    marginTop: 10,
    marginLeft: '15%',
    marginBottom: 10,
    fontSize: 16,
    fontFamily: 'Roboto-Light',
    color: '#999'
  },

  flatlist: {
    marginTop: 10,
    width: '95%',
    height: Dimensions.get('screen').height * 0.55,
    marginBottom: 15
  },

  wordContainer: {
    padding: 5,
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 0,
    marginRight: 0,


    alignItems: 'center'
  },

  word: {
    fontSize: 18,
    fontFamily: 'Segoe-Print',
    color: '#bbb'
  }
});

