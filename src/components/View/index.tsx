import React from 'react';
import {View as RNView} from 'react-native';
import {ViewProps} from 'src/types';
import {colorsFix} from 'src/utils';

const View = (props: ViewProps) => {
  const styleProps = {
    ...props,
    children: undefined,
    style: undefined,
  };
  return (
    <RNView
      onLayout={props.onLayout}
      style={[
        {
          ...styleProps,
          backgroundColor: colorsFix(styleProps.backgroundColor),
          borderColor: colorsFix(styleProps.borderColor),
        },
        props.style,
      ]}>
      {props.children}
    </RNView>
  );
};
export {View};
