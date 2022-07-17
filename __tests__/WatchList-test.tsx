/**
 * @format
 */

import 'react-native';
import React from 'react';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import { WatchList } from "../src/screens";

it('renders correctly', () => {
  renderer.create(<WatchList />);
});
