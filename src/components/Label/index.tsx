import React from 'react';
import {Text} from 'react-native';
import {Colors} from 'src/components';
import {LabelProps} from 'src/types';
import {colorsFix, deleteNegativeValueInObject} from 'src/utils';
import config from 'src/configs';

function Label(props: LabelProps) {
  const {
    numberOfLines,
    lineBreakMode,
    ellipsizeMode,
    children,
    style,
    color = 'color1',
    size = 14,
    textAlign = 'left',
    fontSize,
    onPress,
    backgroundColor,
  } = props;
  let alignSelf;
  switch (textAlign) {
    case 'left':
      alignSelf = 'flex-start';
      break;
    case 'right':
      alignSelf = 'flex-end';
      break;
    default:
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      alignSelf = undefined;
  }

  const styleProps = deleteNegativeValueInObject({
    ...props,
    backgroundColor: backgroundColor ? colorsFix(backgroundColor) : undefined,
    numberOfLines: undefined,
    lineBreakMode: undefined,
    ellipsizeMode: undefined,
    children: undefined,
    style: undefined,
    size: undefined,
    onPress: undefined,
    color: undefined,
  });

  return (
    // <TouchableOpacity
    //   style={[{alignSelf}]}
    //   activeOpacity={0.8}
    //   onPress={onPress}
    //   disabled={!onPress}>
    //
    // </TouchableOpacity>
    <Text
      allowFontScaling={false}
      lineBreakMode={lineBreakMode}
      numberOfLines={numberOfLines}
      ellipsizeMode={ellipsizeMode}
      onPress={onPress}
      style={[
        {
          // alignSelf
          ...styleProps,
          color: Colors[color] || color || Colors.color1,
          // fontSize: Sizes.aspectRatio(fontSize || size).size,
          fontSize: fontSize || size,
          fontFamily: config.fontFamily,
        },
        style,
      ]}>
      {children}
    </Text>
  );
}
export {Label};
