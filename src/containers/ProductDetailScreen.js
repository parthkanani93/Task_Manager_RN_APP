import {ScrollView, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';

// Local Imports
import CSafeAreaView from '../components/common/CSafeAreaView';
import CText from '../components/common/CText';
import {styles} from '../themes';
import CHeader from '../components/common/CHeader';
import strings from '../i18n/strings';
import {requestApi} from '../api/apiService';
import CLoader from '../components/common/CLoader';
import {GET_TASKS} from '../api/url';

export default function ProductDetailScreen({navigation, route}) {
  const id = route.params?.id;
  const [detail, setDetail] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getProductDetail();
  }, []);

  const getProductDetail = async () => {
    setLoading(true);
    try {
      const response = await requestApi('GET', GET_TASKS + '/' + id);
      if (!!response) {
        console.log(response);
        setDetail(response);
      }
    } finally {
      setLoading(false);
    }
  };

  const RenderDetailComponent = ({title, description}) => {
    return (
      <View>
        <CText type={'B16'} style={styles.mt10}>
          {title + ': '}
        </CText>
        <CText type={'M16'} style={styles.mt5}>
          {description}
        </CText>
      </View>
    );
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
      <CHeader />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={localStyles.rootContainer}>
        <CText type={'B20'}>{detail?.title}</CText>
        <RenderDetailComponent
          title={strings.taskDescription}
          description={detail?.description}
        />
        <RenderDetailComponent
          title={strings.taskStatus}
          description={detail?.status}
        />
        <RenderDetailComponent
          title={strings.taskDueDate}
          description={formatDate(detail?.dueDate)}
        />
      </ScrollView>
      {!!loading && <CLoader />}
    </CSafeAreaView>
  );
}

const localStyles = StyleSheet.create({
  rootContainer: {
    ...styles.ph20,
    ...styles.pv10,
  },
});
