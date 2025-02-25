import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import DateTimePicker from 'react-native-modal-datetime-picker';

// Local Imports
import CSafeAreaView from '../components/common/CSafeAreaView';
import CHeader from '../components/common/CHeader';
import strings from '../i18n/strings';
import KeyBoardAvoidWrapper from '../components/common/KeyBoardAvoidWrapper';
import {colors, styles} from '../themes';
import CInput from '../components/common/CInput';
import CButton from '../components/common/CButton';
import {showPopupWithOk, validateField} from '../utils/helpers';
import {addTaskAction, updateTaskAction} from '../redux/action/homeAction';
import CLoader from '../components/common/CLoader';
import {Alert, StyleSheet, TouchableOpacity, View} from 'react-native';
import CText from '../components/common/CText';
import {moderateScale, taskStatusData} from '../common/constants';
import {Dropdown} from 'react-native-element-dropdown';

export default function AddProductScreen({navigation, route}) {
  const isLoading = useSelector(state => state.home.loader);
  const isEdit = route.params?.isEdit;
  const item = route.params?.item;
  const dispatch = useDispatch();

  const [taskTitle, setTaskTitle] = useState(item?.title || '');
  const [taskDescription, setTaskDescription] = useState(
    item?.description || '',
  );
  const [taskStatus, setTaskStatus] = useState(item?.status || '');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [dueDate, setDueDate] = useState(item?.dueDate || '');
  const [taskTitleError, setTaskTitleError] = useState('');
  const [taskDescriptionError, setTaskDescriptionError] = useState('');

  const handleConfirm = date => {
    const formattedDate = date.toISOString();
    setDueDate(formattedDate);
    hideDatePicker();
  };

  const showDatePicker = () => setDatePickerVisibility(true);
  const hideDatePicker = () => setDatePickerVisibility(false);
  const onChangeTaskStatus = val => setTaskStatus(val.value);

  const onChangeTaskTitle = val => {
    const {msg} = validateField(val.trim(), strings.plsEnterTaskTitle);
    setTaskTitle(val);
    setTaskTitleError(msg);
  };

  const onChangeTaskDescription = val => {
    const {msg} = validateField(val.trim(), strings.plsEnterTaskDescription);
    setTaskDescription(val);
    setTaskDescriptionError(msg);
  };

  const successAdd = desc => {
    if (!isLoading) {
      setTimeout(() => {
        showPopupWithOk(strings.appTitle, desc, () => navigation.goBack());
      }, 1000);
    }
  };

  const onPressAddProduct = () => {
    if (!taskTitle || !taskDescription || !taskStatus || !dueDate) {
      Alert.alert('Error', 'Please fill all the fields');
      return;
    }

    if (isEdit) {
      dispatch(
        updateTaskAction(item?._id, {
          _id: item?._id,
          title: taskTitle,
          description: taskDescription,
          status: taskStatus,
          dueDate: dueDate,
        }),
      ).then(() => successAdd(strings.taskUpdatedSuccessfully));
    } else {
      dispatch(
        addTaskAction({
          title: taskTitle,
          description: taskDescription,
          status: taskStatus,
          dueDate: dueDate,
        }),
      ).then(() => successAdd(strings.taskAddedSuccessfully));
    }
  };

  const formatDate = isoString => {
    const date = new Date(isoString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  };

  return (
    <CSafeAreaView>
      <CHeader title={isEdit ? strings.editProduct : strings.addProduct} />
      <KeyBoardAvoidWrapper contentContainerStyle={styles.ph20}>
        <CInput
          label={strings.taskTitle}
          placeholder={strings.enterTaskTitle}
          toGetTextFieldValue={onChangeTaskTitle}
          _value={taskTitle}
          _errorText={taskTitleError}
        />
        <CInput
          label={strings.taskDescription}
          placeholder={strings.enterTaskDescription}
          toGetTextFieldValue={onChangeTaskDescription}
          _value={taskDescription}
          _errorText={taskDescriptionError}
          multiline
        />
        <View>
          <CText type={'b16'} style={localStyles.dateLabelStyle}>
            {strings.taskStatus}
          </CText>
          <Dropdown
            data={taskStatusData}
            style={localStyles.datePikerStyle}
            placeholder={strings.enterTaskStatus}
            labelField="label"
            valueField="value"
            value={taskStatus}
            onChange={onChangeTaskStatus}
            placeholderStyle={{color: colors.placeHolderColor}}
          />
        </View>
        <View>
          <CText type={'b16'} style={localStyles.dateLabelStyle}>
            {strings.taskDueDate}
          </CText>
          <TouchableOpacity
            style={localStyles.datePikerStyle}
            onPress={showDatePicker}>
            <CText
              type={'s14'}
              color={dueDate ? colors.black : colors.placeHolderColor}
              style={styles.ml5}>
              {dueDate ? formatDate(dueDate) : strings.enterTaskDueDate}
            </CText>
            <DateTimePicker
              isVisible={isDatePickerVisible}
              mode="date"
              onCancel={hideDatePicker}
              onConfirm={handleConfirm}
              date={new Date()}
              maximumDate={new Date()}
            />
          </TouchableOpacity>
        </View>
      </KeyBoardAvoidWrapper>
      <CButton
        title={isEdit ? strings.save : strings.add}
        onPress={onPressAddProduct}
        containerStyle={styles.m20}
      />
      {isLoading && <CLoader />}
    </CSafeAreaView>
  );
}
const localStyles = StyleSheet.create({
  datePikerStyle: {
    backgroundColor: colors.white,
    width: '100%',
    ...styles.selfCenter,
    borderRadius: moderateScale(8),
    height: moderateScale(48),
    ...styles.ph10,
    borderWidth: moderateScale(1),
    borderColor: colors.bColor1,
    ...styles.mv5,
    ...styles.rowSpaceBetween,
    gap: moderateScale(7),
  },
  dateLabelStyle: {
    ...styles.mb5,
    ...styles.mt10,
  },
});
