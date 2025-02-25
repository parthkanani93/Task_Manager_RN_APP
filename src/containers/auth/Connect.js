import {StyleSheet, View} from 'react-native';
import React from 'react';

// Custom imports
import CSafeAreaView from '../../components/common/CSafeAreaView';
import CText from '../../components/common/CText';
import CButton from '../../components/common/CButton';
import {colors, styles} from '../../themes';
import {moderateScale} from '../../common/constants';
import {StackNav} from '../../navigation/NavigationKeys';
import strings from '../../i18n/strings';
import KeyBoardAvoidWrapper from '../../components/common/KeyBoardAvoidWrapper';

export default function Connect({navigation}) {
  const onPressLogin = () => navigation.navigate(StackNav.Login);
  const onPressSignup = () => navigation.navigate(StackNav.Signup);

  return (
    <CSafeAreaView>
      <KeyBoardAvoidWrapper contentContainerStyle={localStyles.root}>
        <View style={localStyles.titleContainer}>
          <CText type={'b32'} align={'center'} color={colors.black}>
            {strings.todoList}
          </CText>
          <CText
            type={'r16'}
            color={colors.grayScale5}
            align={'center'}
            style={localStyles.descStyle}>
            {strings.todoListDesc}
          </CText>
        </View>

        <View style={localStyles.buttonContainer}>
          <CButton title={strings.login} onPress={onPressLogin} />
          <CButton
            title={strings.signup}
            onPress={onPressSignup}
            containerStyle={localStyles.buttonStyle}
            bgColor={colors.white}
            color={colors.black}
          />
        </View>
      </KeyBoardAvoidWrapper>
    </CSafeAreaView>
  );
}

const localStyles = StyleSheet.create({
  root: {
    ...styles.flexCenter,
    ...styles.ph25,
  },
  titleContainer: {
    ...styles.mb40,
    gap: moderateScale(10),
  },
  buttonContainer: {
    width: '100%',
    gap: moderateScale(15),
  },
  buttonStyle: {
    width: '100%',
    borderWidth: moderateScale(1),
    borderColor: colors.black,
  },
  descStyle: {
    lineHeight: moderateScale(24),
  },
});
