/**
 * @format
 */
import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { PersistGate } from 'redux-persist/integration/react';
import {Provider} from 'react-redux'
import { persister,store } from './Redux/Store';
const AppRedux=()=>{
    return (
        <Provider store={store}>
          <PersistGate loading={null} persistor={persister}>
            <App/>
          </PersistGate>
        </Provider>
      );
}
AppRegistry.registerComponent(appName, () => AppRedux);
