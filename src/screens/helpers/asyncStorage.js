import AsyncStorage from "@react-native-async-storage/async-storage"


export const STORAGE_KEYS = {
  IS_FULL_APP_PURCHASED: "@is_full_app_purchased",
}
export const storeBooleanData = async (key, value) => {
  try {
    const stringValue = value.toString()
    await AsyncStorage.setItem(key, stringValue)
  } catch (e) {
    console.log(e)
  }
}
// getItem returns a promise that either resolves to stored value when data is found for given key, or returns null otherwise.
export const getBooleanData = async key => {
  try {
    const value = await AsyncStorage.getItem(key)
    return value === "true"
  } catch (e) {
    console.log(e)
  }
}


export const storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value)
  } catch (e) {
    console.log(e)
  }
}
// getItem returns a promise that either resolves to stored value when data is found for given key, or returns null otherwise.
export const getData = async key => {
  try{
    const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        return value; // Parse JSON string back to object
      }
      return null;
    } catch (e) {
      console.error('Error reading value from AsyncStorage:', e);
  }
}


export const removeData = async key => {
  try {
    const value = await AsyncStorage.removeItem(key)
    console.log(value)
  } catch (e) {
    console.log(e)
  }
}
