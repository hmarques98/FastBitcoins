import AsyncStorage from '@react-native-async-storage/async-storage'

const getStorageValue = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key)
    return value != null ? value : null
  } catch (error) {
    console.log(error)
  }
}

const setStorageValue = async (key: string, value: string) =>
  await AsyncStorage.setItem(key, value)

export { getStorageValue, setStorageValue }
