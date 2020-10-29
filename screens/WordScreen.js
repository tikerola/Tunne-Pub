import React from 'react'
import { StyleSheet, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import CustomButton from '../components/CustomButton'
import TextSlider from '../components/TextSlider'
import { colors } from '../constants/colors'
import { setScreenNumber, toggleWord } from '../store/actions/cards'

export default function WordScreen({ route, navigation }) {

  const { title, wordType, navigateBackTo, question } = route ? route.params : {}
  
  const words = useSelector(state => wordType === 'sentences' 
  ? 
  state.cards.sentences 
  : 
  (wordType === 'needs' || wordType === 'needsBehindAFeeling' ? state.cards.needs : state.cards.words))

  const dispatch = useDispatch()

  const onSave = () => {
    const screenNumber = (wordType === 'needs' || wordType === 'sentences')
      ?
      3
      :
      (wordType === 'feelingsYouMissWords' ? 2 : 1)

    dispatch(setScreenNumber(screenNumber))
    navigation.navigate(`${navigateBackTo}`)
  }

  return (
    <View style={styles.container}>
      <TextSlider
        textData={words}
        saveToRedux={toggleWord}
        question={question}
        title={title}
        columns={wordType === 'needs' || wordType === 'needsBehindAFeeling' || wordType === 'sentences' ? 1 : 2}
        wordType={wordType}
      />
      <CustomButton title="Tallenna" onPress={onSave} />

    </View>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.bodyBg
  }
})
