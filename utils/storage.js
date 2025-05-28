import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (keyBy, value) => {
  try {
    await AsyncStorage.setItem(keyBy, value);
  } catch (error) {
    console.log('error', error);
  }
};

export const getData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value;
  } catch (error) {
    console.log('error', error);
  }
};
