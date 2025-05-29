import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (keyBy, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(keyBy, jsonValue);
  } catch (error) {
    console.log('error storeData', error);
  }
};

export const getData = async (key) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    console.log('error getData', error);
    return null;
  }
};
