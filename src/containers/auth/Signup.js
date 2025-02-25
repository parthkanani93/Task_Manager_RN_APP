import {StyleSheet, View, TouchableOpacity, Alert} from 'react-native';
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
import {SIGNUP_ACCOUNT} from '../../api/url';
import {StackNav} from '../../navigation/NavigationKeys';
import {setAsyncStorageData} from '../../utils/helpers';
import CLoader from '../../components/common/CLoader';
import KeyBoardAvoidWrapper from '../../components/common/KeyBoardAvoidWrapper';
import CHeader from '../../components/common/CHeader';

export default function Signup({navigation}) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const onChangePassword = text => setPassword(text);
  const onChangeEmail = text => setEmail(text);
  const onChangeName = text => setName(text);

  const onPressLogin = () => navigation.navigate(StackNav.Login);

  const handleSignup = async () => {
    if (!name || !email || !password) {
      Alert.alert('Error', 'Please fill all the fields');
      return;
    }

    const params = {
      name: name,
      email: email,
      password: password,
    };

    try {
      setLoading(true);
      const response = await requestApi('POST', SIGNUP_ACCOUNT, params);
      if (!!response) {
        setLoading(false);
        await setAsyncStorageData(ACCESS_TOKEN, response.token);
        global.accessToken = response.token;
        navigation.reset({
          index: 0,
          routes: [{name: StackNav.HomeScreen}],
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <CSafeAreaView>
      <CHeader />
      <KeyBoardAvoidWrapper contentContainerStyle={localStyles.root}>
        <View>
          <View style={localStyles.titleContainer}>
            <CText type={'b24'}>{strings.createAccount}</CText>
            <CText
              type={'r14'}
              color={colors.grayScale5}
              style={localStyles.descStyle}>
              {strings.createAccountDesc}
            </CText>
          </View>
          <CInput
            label={strings.fullName}
            _value={name}
            toGetTextFieldValue={onChangeName}
            placeHolder={strings.enterFullName}
            required={true}
          />
          <CInput
            label={strings.email}
            _value={email}
            toGetTextFieldValue={onChangeEmail}
            placeHolder={strings.enterEmail}
            keyBoardType="email-address"
            autoCapitalize="none"
            required={true}
          />
          <CInput
            label={strings.password}
            _value={password}
            toGetTextFieldValue={onChangePassword}
            placeHolder={strings.enterPassword}
            _isSecure={true}
            required={true}
          />
        </View>
        <View style={localStyles.bottomContainer}>
          <CButton title={strings.signup} onPress={handleSignup} />
          <TouchableOpacity
            style={localStyles.loginLink}
            onPress={onPressLogin}>
            <CText type={'r14'}>{strings.alreadyHaveAccount}</CText>
            <CText type={'s14'}>{strings.loginHere}</CText>
          </TouchableOpacity>
        </View>
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
  bottomContainer: {
    gap: moderateScale(16),
  },
  titleContainer: {
    gap: moderateScale(10),
    ...styles.mb20,
  },
  descStyle: {
    lineHeight: moderateScale(20),
  },
});
