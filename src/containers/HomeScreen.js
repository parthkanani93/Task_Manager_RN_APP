import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {FlashList} from '@shopify/flash-list';
import {useIsFocused} from '@react-navigation/native';

// Local Imports
import CSafeAreaView from '../components/common/CSafeAreaView';
import {colors, styles} from '../themes';
import CHeader from '../components/common/CHeader';
import strings from '../i18n/strings';
import {AddIcon, DeleteIcon, EditIcon} from '../assets/svg';
import {ACCESS_TOKEN, moderateScale} from '../common/constants';
import CText from '../components/common/CText';
import {StackNav} from '../navigation/NavigationKeys';
import {useDispatch, useSelector} from 'react-redux';
import {deleteTaskAction, getTaskAction} from '../redux/action/homeAction';
import CLoader from '../components/common/CLoader';
import {setAsyncStorageData, showPopupWithOkAndCancel} from '../utils/helpers';
import CButton from '../components/common/CButton';
import {requestApi} from '../api/apiService';
import {LOGOUT_ACCOUNT} from '../api/url';

export default function HomeScreen({navigation}) {
  const iconScale = moderateScale(22);
  const tasks = useSelector(state => state.home.tasks);
  const isLoading = useSelector(state => state.home.loader);
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const [refreshing, setRefreshing] = useState(false);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    isFocused && fetchTasks();
  }, [isFocused]);

  const fetchTasks = async () => {
    dispatch(getTaskAction());
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchTasks();
    setRefreshing(false);
  };

  const onPressAdd = () =>
    navigation.navigate(StackNav.AddProductScreen, {isEdit: false});

  const onPressEdit = item =>
    navigation.navigate(StackNav.AddProductScreen, {isEdit: true, item});

  const handleLogout = async () => {
    try {
      setLoading(true);
      const response = await requestApi('POST', LOGOUT_ACCOUNT);
      if (!!response) {
        setLoading(false);
        await setAsyncStorageData(ACCESS_TOKEN, '');
        navigation.reset({
          index: 0,
          routes: [{name: StackNav.Connect}],
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const onPressLogout = async () => {
    showPopupWithOkAndCancel(strings.logout, strings.areYouSureToLogout, () =>
      handleLogout(),
    );
  };

  const onPressDetail = item =>
    navigation.navigate(StackNav.ProductDetailScreen, {id: item._id});

  const onPressDelete = id => {
    showPopupWithOkAndCancel(
      strings.deleteProduct,
      strings.areYouSureToDeleteProduct,
      () => dispatch(deleteTaskAction(id)),
    );
  };

  const formatDate = isoString => {
    const date = new Date(isoString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  };

  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => onPressDetail(item)}
        style={localStyles.productContainer}>
        <CText type={'B20'}>{item.title}</CText>
        <CText type={'M16'} numberOfLines={2}>
          {item.description}
        </CText>
        <CText type={'S14'} numberOfLines={2}>
          {strings.taskDueDate + ' : ' + formatDate(item?.dueDate)}
        </CText>
        <View style={localStyles.priceContainer}>
          <CText type={'S14'} numberOfLines={2}>
            {strings.status + ' : '}
            <CText color={colors.alertColor}>{item?.status}</CText>
          </CText>
          <View style={styles.rowCenter}>
            <TouchableOpacity
              onPress={() => onPressEdit(item)}
              style={styles.ph5}>
              <EditIcon width={iconScale} height={iconScale} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => onPressDelete(item?._id)}
              style={styles.ph5}>
              <DeleteIcon width={iconScale} height={iconScale} />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const RenderEmptyContainer = () => {
    return (
      <View style={localStyles.emptyContainer}>
        {!tasks?.length && !isLoading && (
          <CText type={'B18'} align={'center'}>
            {strings.noProductsFound}
          </CText>
        )}
      </View>
    );
  };

  const RightIcon = () => (
    <CButton
      title={strings.logout}
      type="s14"
      containerStyle={localStyles.containerStyle}
      onPress={onPressLogout}
    />
  );

  return (
    <CSafeAreaView>
      <CHeader leftIcon title={strings.home} rightIcon={<RightIcon />} />
      <View style={styles.flex}>
        <FlashList
          data={tasks?.data}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          estimatedItemSize={5}
          ListEmptyComponent={<RenderEmptyContainer />}
          contentContainerStyle={localStyles.flatListContainer}
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
        <TouchableOpacity
          onPress={onPressAdd}
          style={localStyles.addButtonStyle}>
          <AddIcon width={moderateScale(24)} height={moderateScale(24)} />
        </TouchableOpacity>
      </View>
      {(isLoading || loading) && <CLoader />}
    </CSafeAreaView>
  );
}

const localStyles = StyleSheet.create({
  productContainer: {
    ...styles.flex,
    ...styles.mv10,
    gap: moderateScale(7),
  },
  priceContainer: {
    ...styles.rowSpaceBetween,
  },
  addButtonStyle: {
    position: 'absolute',
    bottom: moderateScale(25),
    right: moderateScale(20),
    backgroundColor: colors.black,
    borderRadius: moderateScale(30),
    height: moderateScale(55),
    width: moderateScale(55),
    ...styles.center,
  },
  flatListContainer: {
    ...styles.ph20,
    ...styles.pb90,
  },
  emptyContainer: {
    ...styles.p20,
  },
  containerStyle: {
    ...styles.ph20,
    borderRadius: moderateScale(10),
    height: moderateScale(35),
  },
});
