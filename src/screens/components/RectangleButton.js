import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import { Colors } from '../theme/color';
import {widthPercentageToDP as scaleWidth} from 'react-native-responsive-screen';

export const RectangleButton = ({
  title,
  onpress,
  buttonColor,
  txtColor,
  recWidth,
  recBorderColor
}) => {
  return (
    <TouchableOpacity onPress={onpress}>
      <View
        style={[
          styles.rectangleButton,
          styles.shadow,
          {backgroundColor: buttonColor, width: recWidth, borderColor: recBorderColor},
        ]}>
        <Text style={[styles.btnText, {color: txtColor}]}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  rectangleButton: {
    width: scaleWidth(80),
    height: 50,
    borderRadius: 4,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    margin:10
  },
  shadow: {
    shadowColor: Colors.dark,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  btnText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

