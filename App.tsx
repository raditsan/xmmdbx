import React from 'react';
import Navigators from 'src/navigators';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import i18n from 'src/i18n';
import {setStorage, setupAxios} from 'src/utils';
import config from 'src/configs';
import GlobalFont from 'react-native-global-font';
import {LogBox} from 'react-native';
import {AppContextProvider} from 'src/contexts';
import {Provider as ProviderRedux} from 'react-redux';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {legacy_createStore as createStore} from 'redux';
export const init_i18n = i18n;
setupAxios({});
LogBox.ignoreLogs([
  'Task orphaned for request',
  'Require cycle',
  'VirtualizedLists should never be nested inside plain ScrollViews with the same orientation',
]);
const App = () => {
  GlobalFont.applyGlobal(config.fontFamily);
  function offlineReducer(state = {offline: {}}, action) {
    switch (action.type) {
      case 'offline::add':
        return {
          offline: {
            ...state.offline,
            ...action.payload,
          },
        };
      default:
        return state;
    }
  }

  // function offlineReducer(state = {value: 0}, action) {
  //   switch (action.type) {
  //     case 'counter/incremented':
  //       return {value: state.value + 1};
  //     case 'counter/decremented':
  //       return {value: state.value - 1};
  //     default:
  //       return state;
  //   }
  // }

  // @ts-ignore
  const store = createStore(offlineReducer);

  store.subscribe(() => {
    if (Object.keys(store.getState()).includes('offline')) {
      setStorage('offline', JSON.stringify(store.getState().offline))
        .then(() => {})
        .catch(() => {});
    }
  });
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <AppContextProvider>
        <ProviderRedux store={store}>
          <SafeAreaProvider>
            <Navigators />
          </SafeAreaProvider>
        </ProviderRedux>
      </AppContextProvider>
    </GestureHandlerRootView>
  );
};

export default App;
