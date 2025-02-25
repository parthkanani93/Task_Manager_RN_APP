import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import CText from './CText';

// Local Imports
import {moderateScale} from '../../common/constants';
import {styles} from '../../themes';
import {BackIcon} from '../../assets/svg';

export default function CHeader(props) {
  const {title, onPressBack, rightIcon = false, leftIcon = false} = props;
  const navigation = useNavigation();

  const goBack = () => navigation.goBack();
  return (
    <View style={localStyles.container}>
      <View style={styles.rowCenter}>
        {leftIcon ? (
          leftIcon
        ) : (
          <TouchableOpacity style={styles.pr10} onPress={onPressBack || goBack}>
            <BackIcon width={moderateScale(24)} height={moderateScale(24)} />
          </TouchableOpacity>
        )}
        <CText
          numberOfLines={1}
          align={'center'}
          style={localStyles.titleText}
          type={'B24'}>
          {title}
        </CText>
      </View>
      {!!rightIcon ? (
        rightIcon
      ) : (
        <View style={localStyles.rightContainer}></View>
      )}
    </View>
  );
}

const localStyles = StyleSheet.create({
  container: {
    ...styles.rowSpaceBetween,
    ...styles.ph20,
    ...styles.pv15,
  },
  titleText: {
    ...styles.pr10,
  },
  rightContainer: {
    height: moderateScale(24),
    width: moderateScale(24),
  },
});
