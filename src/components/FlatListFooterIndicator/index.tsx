import React from 'react';
import {View} from 'src/components';
import {ActivityIndicator} from 'react-native';
import {colorsFix} from 'src/utils';
import {FlatListFooterIndicatorProps} from 'src/types';

export function FlatListFooterIndicator({
  active,
  color = 'color2',
}: FlatListFooterIndicatorProps) {
  if (!active) {
    return null;
  }
  if (active) {
    return (
      <View
        flex={1}
        justifyContent={'center'}
        alignItems={'center'}
        height={40}>
        <ActivityIndicator size={'small'} color={colorsFix(color)} />
      </View>
    );
  }
}
