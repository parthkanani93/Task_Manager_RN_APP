import {ActivityIndicator, StyleSheet, View} from 'react-native';
import React, {useEffect} from 'react';

// Local Imports
import {colors, styles} from '../themes';
import {ACCESS_TOKEN} from '../common/constants';
import {getAsyncStorageData} from '../utils/helpers';
import {StackNav} from '../navigation/NavigationKeys';

export default function Splash({navigation}) {
  useEffect(() => {
    setTimeout(() => {
      asyncProcess();
    }, 1500);
  }, []);

  const asyncProcess = async () => {
    try {
      const accessToken = await getAsyncStorageData(ACCESS_TOKEN);
      global.accessToken = accessToken;
      if (!!accessToken) {
        navigation.replace(StackNav.HomeScreen);
      } else {
        navigation.replace(StackNav.Connect);
      }
    } catch (e) {
      console.log('error ', e);
    }
  };

  return (
    <View style={localStyles.root}>
      <ActivityIndicator size={'large'} color={colors.black} />
    </View>
  );
}

const localStyles = StyleSheet.create({
  root: {
    ...styles.center,
    ...styles.flex,
  },
});
