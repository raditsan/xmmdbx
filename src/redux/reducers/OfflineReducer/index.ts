import {OFFLINE_ADD} from 'src/redux/types';

export function OfflineReducer(state = {offline: {}}, action) {
  switch (action.type) {
    case OFFLINE_ADD:
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
