import {legacy_createStore as createStore} from 'redux';
import {OfflineReducer} from 'src/redux/reducers/OfflineReducer';

export const store = createStore(OfflineReducer);
