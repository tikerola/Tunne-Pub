import { AntDesign } from '@expo/vector-icons'
import React, { useEffect, useRef, useState } from 'react'
import { Button, FlatList, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View, Dimensions } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { addAnswerToAQuestion } from '../store/actions/cards'
import CustomTextInput from './CustomTextInput'
import CustomButton from './CustomButton'


import { QUESTIONS } from '../data/questions'


export default function Questions({ summaryItemId, navigation }) {

  const [answer, setAnswer] = useState('')
  const [questionIndex, setQuestionIndex] = useState(1)

  const dispatch = useDispatch()
  const summaryItem = useSelector(state => state.cards.summaryOfChosenItems.find(item => item.id === summaryItemId))

  const flatListRef = useRef()

  useEffect(() => {
    for (let question of summaryItem.questions) {
      if (Object.keys(question)[0] === QUESTIONS[questionIndex])
        setAnswer(Object.values(question)[0])
    }

  }, [questionIndex])

  const handleQuestionChange = direction => {
    if (direction === 'forward' && questionIndex + 1 < QUESTIONS.length) {
      setAnswer('')
      flatListRef.current.scrollToIndex({ index: questionIndex + 1, animated: false })
      setQuestionIndex(prev => prev + 1)
    }
    else if (direction === 'backward' && questionIndex - 1 >= 0) {
      setAnswer('')
      flatListRef.current.scrollToIndex({ index: questionIndex - 1, animated: false })
      setQuestionIndex(prev => prev - 1)
    }
  }


  return (
    <View>
      <View style={styles.arrowContainer}>
        <TouchableOpacity style={styles.container} onPress={() => handleQuestionChange('backward')}>
          <Text style={{ marginRight: 7 }}>Edellinen</Text><AntDesign name="stepbackward" size={24} color="black" />
        </TouchableOpacity>
        <Text style={{ alignSelf: 'center' }}>{questionIndex}/{QUESTIONS.length - 1}</Text>
        <TouchableOpacity style={styles.container} onPress={() => handleQuestionChange('forward')}>
          <AntDesign name="stepforward" size={24} color="black" /><Text style={{ marginLeft: 7 }}>Seuraava</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        scrollEnabled={false}
        ref={flatListRef}
        data={QUESTIONS}
        style={styles.flatListContainer}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        extraData={answer, questionIndex}

        renderItem={({ item, index }) => (
          <TouchableWithoutFeedback onPress={() => questionIndex === 4 && navigation.navigate('WordScreen')} >
            <View>
              <CustomTextInput
                description={QUESTIONS[questionIndex]}
                handleChange={setAnswer}
                value={answer}
              />
            </View>
          </TouchableWithoutFeedback>
        )}
      />

      <CustomButton
        title="Tallenna"
        handlePress={() => dispatch(addAnswerToAQuestion(summaryItemId, QUESTIONS[questionIndex], answer))}
      />

    </View>
  )
}

const styles = StyleSheet.create({

  arrowContainer: {
    marginTop: 15,
    width: 250,
    alignSelf: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  flatListContainer: {
    width: Dimensions.get('screen').width - 20,
    padding: 0,
  },

  buttonContainer: {
    marginTop: 8,
    width: 100,
    alignSelf: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.44,
    shadowRadius: 5,

    elevation: 5,
  }
})
