/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {Provider} from 'react-redux';

// Local Imports
import {name as appName} from './app.json';
import App from './src/index';
import store from './src/redux/store';

const RNRoot = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

AppRegistry.registerComponent(appName, () => RNRoot);
