import {OFFLINE_ADD} from 'src/redux/types';

export function OfflineAction(payload: {[Key: string]: any}) {
  return {
    type: OFFLINE_ADD,
    payload,
  };
}
