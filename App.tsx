import React from 'react';
import Navigators from 'src/navigators';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

const App = () => {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <Navigators />
    </GestureHandlerRootView>
  );
};

export default App;
