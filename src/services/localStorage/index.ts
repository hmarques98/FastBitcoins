import AsyncStorage from '@react-native-async-storage/async-storage'

const getStorageValue = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key)
    return value ?? null
  } catch (error) {
    console.error(error)
  }
}

const setStorageValue = async (
  key: string,
  value: string | Record<string, unknown>,
) => {
  if (typeof value !== 'string') value = JSON.stringify(value)
  await AsyncStorage.setItem(key, value)
}

export { getStorageValue, setStorageValue }
