//Library Imports
import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';

//Local Imports
import {getHeight, moderateScale} from '../../common/constants';
import {colors, styles} from '../../themes';
import CText from './CText';

export default function CButton({
  title,
  type = 'B16',
  color,
  onPress,
  containerStyle,
  style,
  icon = null,
  frontIcon = null,
  bgColor = null,
  children,
  ...props
}) {
  return (
    <TouchableOpacity
      style={[
        localStyle.btnContainer,
        styles.rowCenter,
        containerStyle,
        bgColor ? {backgroundColor: bgColor} : {backgroundColor: colors.black},
      ]}
      onPress={onPress}
      {...props}>
      {frontIcon}
      <CText type={type} style={style} color={color ? color : colors.white}>
        {title}
      </CText>
      {icon}
      {children}
    </TouchableOpacity>
  );
}

const localStyle = StyleSheet.create({
  btnContainer: {
    height: getHeight(58),
    borderRadius: moderateScale(25),
  },
});
