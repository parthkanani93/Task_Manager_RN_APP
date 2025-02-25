import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert} from 'react-native';

//Show Popup Alert
const showPopupWithOk = (title, message, okClicked) => {
  Alert.alert(title ? title : 'RN', message ? message : '', [
    {text: 'OK', onPress: () => okClicked && okClicked()},
  ]);
};

//Show Popup with ok and cancel
const showPopupWithOkAndCancel = (title, message, okClicked, cancelClicked) => {
  Alert.alert(title ? title : 'RN', message ? message : '', [
    {
      text: 'cancel',
      onPress: () => cancelClicked && cancelClicked(),
      style: 'cancel',
    },
    {
      text: 'OK',
      onPress: () => okClicked && okClicked(),
    },
  ]);
};

// validate
const validateField = (val, msg) => {
  if (!val) {
    return {
      status: false,
      msg: msg,
    };
  } else {
    return {status: true, msg: ''};
  }
};

const setAsyncStorageData = async (key, value) => {
  const stringData = JSON.stringify(value);
  await AsyncStorage.setItem(key, stringData);
};

const getAsyncStorageData = async key => {
  const data = await AsyncStorage.getItem(key);
  return JSON.parse(data);
};

export {
  showPopupWithOk,
  showPopupWithOkAndCancel,
  validateField,
  setAsyncStorageData,
  getAsyncStorageData,
};
