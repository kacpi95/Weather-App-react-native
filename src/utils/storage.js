import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (keyBy, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(keyBy, jsonValue);
    return true;
  } catch (error) {
    console.error('error storeData', error);
    throw error;
  }
};

export const getData = async (key) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return {
      success: true,
      data: jsonValue != null ? JSON.parse(jsonValue) : null,
    };
  } catch (error) {
    console.error('error getData', error);
    return { success: false, error };
  }
};
