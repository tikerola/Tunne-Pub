import AsyncStorage from '@react-native-community/async-storage'

export const setItem = async items => {
  try {
    await AsyncStorage.setItem('items', JSON.stringify(items))

    return true
  } catch (err) {
    return false
  }
}