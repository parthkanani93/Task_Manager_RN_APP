import {StyleSheet, View, ActivityIndicator, Modal} from 'react-native';
import {useIsFocused} from '@react-navigation/native';

// Local Imports
import React from 'react';
import {colors, styles} from '../../themes';

const CLoader = () => {
  const isFocused = useIsFocused();

  if (!isFocused) {
    return <View />;
  }

  return (
    <Modal transparent>
      <View style={localStyles.vwMainStyle}>
        <ActivityIndicator size={'large'} color={colors.textColor} />
      </View>
    </Modal>
  );
};

const localStyles = StyleSheet.create({
  vwMainStyle: {
    ...styles.flex,
    ...styles.center,
    ...StyleSheet.absoluteFill,
    backgroundColor: '#11111150',
  },
});

export default React.memo(CLoader);
