import React from 'react';
import Navigators from 'src/navigators';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import i18n from 'src/i18n';
import {setupAxios} from 'src/utils';
import config from 'src/configs';
import GlobalFont from 'react-native-global-font';
import { LogBox } from "react-native";
export const init_i18n = i18n;
setupAxios({});
LogBox.ignoreLogs([
  'Task orphaned for request',
  'Require cycle',
  'VirtualizedLists should never be nested inside plain ScrollViews with the same orientation',
]);
const App = () => {
  GlobalFont.applyGlobal(config.fontFamily);
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <Navigators />
    </GestureHandlerRootView>
  );
};

export default App;
