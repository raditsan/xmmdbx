import React from 'react';
import {Colors, Label, RNImage, View} from 'src/components';
import {useSafeAreaInsets} from 'src/utils';
import {StatusBar, TouchableOpacity} from 'react-native';
import {useSafeAreaFrame} from 'react-native-safe-area-context';
import {getDefaultHeaderHeight} from '@react-navigation/elements';
import {useNavigation} from '@react-navigation/native';
import {HeaderProps} from 'src/types';

export const Header = (props: HeaderProps) => {
  const navigation = useNavigation();
  const frame = useSafeAreaFrame();
  const insets = useSafeAreaInsets();

  const headerHeight = getDefaultHeaderHeight(frame, false, insets.top);
  const iconBackSize = 18;
  const iconBackProps = {height: iconBackSize, width: iconBackSize};
  const onPress = () => {
    navigation.goBack();
  };
  const inset = useSafeAreaInsets();

  return (
    <>
      <StatusBar
        barStyle={props.barStyle || 'light-content'}
        backgroundColor={Colors[props.style?.backgroundColor || 'color4']}
      />
      <View
        backgroundColor={Colors.color4}
        height={headerHeight + 10}
        justifyContent={'center'}
        style={props.style}>
        {/*<View position={'absolute'} left={0}  bottom={staticSize(20)} right={0}>*/}
        {/*  */}
        {/*</View>*/}
        <View
          marginTop={inset.top}
          paddingHorizontal={22}
          justifyContent={'space-between'}
          flexDirection={'row'}
          alignItems={'center'}>
          {!props.headerButtonLeft && !props.hideBackButton && (
            <TouchableOpacity
              onPress={onPress}
              style={{
                marginRight: 10,
                height: 45,
                width: 45,
                justifyContent: 'center',
              }}>
              <RNImage
                source={require('src/assets/images/arrow_left.png')}
                style={iconBackProps}
              />
            </TouchableOpacity>
          )}
          {props.headerButtonLeft as any}

          {props.title && (
            <Label
              color={props.tintColor}
              size={14}
              numberOfLines={1}
              onPress={onPress}
              fontWeight={'600'}
              textAlign={'left'}
              flex={1}>
              {props.title}
            </Label>
          )}
          {props.headerButtonRight && (
            <View>
              <>{props.headerButtonRight}</>
            </View>
          )}
        </View>
      </View>
      {/*{showDivider && (*/}
      {/*  <Divider backgroundColor={'color2'} height={staticSize(2)} />*/}
      {/*)}*/}
    </>
  );
};
