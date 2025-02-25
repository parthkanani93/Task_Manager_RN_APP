import {StyleSheet, View, Alert} from 'react-native';
import React, {useState} from 'react';

//custom imports
import CInput from '../../components/common/CInput';
import CButton from '../../components/common/CButton';
import strings from '../../i18n/strings';
import CText from '../../components/common/CText';
import {colors, styles} from '../../themes';
import CSafeAreaView from '../../components/common/CSafeAreaView';
import {moderateScale} from '../../common/constants';
import CHeader from '../../components/common/CHeader';
import CLoader from '../../components/common/CLoader';
import KeyBoardAvoidWrapper from '../../components/common/KeyBoardAvoidWrapper';

export default function ResetPassword({navigation}) {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const onChangeNewPassword = text => setNewPassword(text);
  const onChangeConfirmPassword = text => setConfirmPassword(text);

  const handleResetPassword = async () => {
    // Basic validation
    if (!newPassword || !confirmPassword) {
      Alert.alert('Error', 'Please fill all the fields');
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    if (newPassword.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters');
      return;
    }

    const params = {
      password: newPassword,
    };

    // try {
    //   setLoading(true);
    //   const response = await requestApi('POST', RESET_PASSWORD);
    //   if (!!response) {
    //     Alert.alert('Success', 'Password reset successfully');
    //     navigation.navigate(StackNav.Login);
    //   }
    // } catch (error) {
    //   console.log('Reset password error:', error);
    // } finally {
    //   setLoading(false);
    // }
  };

  return (
    <CSafeAreaView>
      <CHeader />
      <KeyBoardAvoidWrapper contentContainerStyle={localStyles.root}>
        <View>
          <View style={localStyles.titleContainer}>
            <CText type={'b24'}>{strings.resetPasswordTitle}</CText>
            <CText
              type={'r14'}
              color={colors.grayScale5}
              style={localStyles.descStyle}>
              {strings.resetPasswordDesc}
            </CText>
          </View>
          <CInput
            label={strings.newPassword}
            _value={newPassword}
            toGetTextFieldValue={onChangeNewPassword}
            placeHolder={strings.enterNewPassword}
            _isSecure={true}
            required={true}
          />
          <CInput
            label={strings.confirmPassword}
            _value={confirmPassword}
            toGetTextFieldValue={onChangeConfirmPassword}
            placeHolder={strings.confirmPassword}
            _isSecure={true}
            required={true}
          />
        </View>
        <CButton title={strings.resetPassword} onPress={handleResetPassword} />
      </KeyBoardAvoidWrapper>
      {!!loading && <CLoader />}
    </CSafeAreaView>
  );
}

const localStyles = StyleSheet.create({
  root: {
    ...styles.ph25,
    ...styles.pb20,
    ...styles.flex,
    ...styles.justifyBetween,
    ...styles.pt40,
  },
  titleContainer: {
    gap: moderateScale(10),
    ...styles.mb20,
  },
  descStyle: {
    lineHeight: moderateScale(20),
  },
});
