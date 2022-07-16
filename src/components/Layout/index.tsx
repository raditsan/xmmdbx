import React from 'react';
import {Header, View} from 'src/components';
import {LayoutProps} from 'src/types';
import {useSafeAreaInsets, useHeaderHeight, colorsFix} from 'src/utils';

const Layout = (props: LayoutProps) => {
  const {
    style,
    headerProps,
    showHeader,
    children,
    safeAreaBottom,
    safeAreaTopStatusbar,
    safeAreaTopHeaderAndStatusbar,
    padding,
    paddingHorizontal,
    paddingBottom,
    paddingTop,
    paddingLeft,
    paddingRight,
    paddingVertical,
    showShadowHeader,
    backgroundColor,
  } = props;
  const inset = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();
  let safeAreaStyle = {
    padding,
    paddingHorizontal,
    paddingBottom,
    paddingTop,
    paddingLeft,
    paddingRight,
    paddingVertical,
    showShadowHeader,
    backgroundColor: colorsFix(backgroundColor || 'color3'),
  };
  if (safeAreaTopStatusbar) {
    safeAreaStyle = {
      ...safeAreaStyle,
      paddingTop: inset.top,
    };
  }
  if (safeAreaTopHeaderAndStatusbar) {
    safeAreaStyle = {
      ...safeAreaStyle,
      paddingTop: headerHeight,
    };
  }
  if (safeAreaBottom) {
    safeAreaStyle = {
      ...safeAreaStyle,
      paddingBottom: inset.bottom,
    };
  }
  return (
    <>
      {showHeader && <Header {...headerProps} />}
      <View flex={1} style={[safeAreaStyle, style]}>
        {/*// @ts-ignore*/}
        {children}
      </View>
    </>
  );
};
export {Layout};
