import {StyleSheet, View, Alert} from 'react-native';
import React, {useState} from 'react';

//custom imports
import {requestApi} from '../../api/apiService';
import CInput from '../../components/common/CInput';
import CButton from '../../components/common/CButton';
import strings from '../../i18n/strings';
import CText from '../../components/common/CText';
import {colors, styles} from '../../themes';
import CSafeAreaView from '../../components/common/CSafeAreaView';
import {ACCESS_TOKEN, moderateScale} from '../../common/constants';
import {FORGOT_PASSWORD, LOGIN_ACCOUNT} from '../../api/url';
import CHeader from '../../components/common/CHeader';
import {setAsyncStorageData} from '../../utils/helpers';
import CLoader from '../../components/common/CLoader';
import {StackNav} from '../../navigation/NavigationKeys';
import KeyBoardAvoidWrapper from '../../components/common/KeyBoardAvoidWrapper';

export default function ForgotPassword({navigation}) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const onChangeEmail = text => setEmail(text);

  const handleLogin = async () => {
    // Basic validation
    if (!email) {
      Alert.alert('Error', 'Please fill all the fields');
      return;
    }

    const params = {
      email: email,
    };

    navigation.navigate(StackNav.ResetPassword);
    // try {
    //   setLoading(true);
    //   const response = await requestApi('POST', FORGOT_PASSWORD, params);
    //   if (!!response) {
    //   }
    // } catch (error) {
    //   console.log('Signup error:', error);
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
            <CText type={'b24'}>{strings.forgotPasswordTitle}</CText>
            <CText
              type={'r14'}
              color={colors.grayScale5}
              style={localStyles.descStyle}>
              {strings.forgotPasswordDesc}
            </CText>
          </View>
          <CInput
            label={strings.email}
            _value={email}
            toGetTextFieldValue={onChangeEmail}
            placeHolder={strings.enterEmail}
            keyBoardType="email-address"
            autoCapitalize="none"
            required={true}
          />
        </View>
        <CButton title={strings.continue} onPress={handleLogin} />
      </KeyBoardAvoidWrapper>
      {!!loading && <CLoader />}
    </CSafeAreaView>
  );
}

const localStyles = StyleSheet.create({
  loginLink: {
    ...styles.rowCenter,
  },
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
