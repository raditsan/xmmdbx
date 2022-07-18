import {Colors} from 'src/components';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {
  getDefaultHeaderHeight,
  useHeaderHeight,
} from '@react-navigation/elements';
import axios, {AxiosRequestConfig, AxiosResponse} from 'axios';
import config from 'src/configs';
import {Dimensions, RefreshControlProps} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast, {ToastShowParams} from 'react-native-toast-message';
export * from './hookFunction';
export {useSafeAreaInsets, useHeaderHeight, getDefaultHeaderHeight};
export const colorsFix: any = name => {
  return Colors[name] || name;
};
export function errorMessage(e: any) {
  let defaultMsg: string = 'An error occurred, please try again.';
  const {response, message: messageE} = e || {};
  let message;
  try {
    if (response) {
      const {data} = response;
      const {message: messageResponse} = data;
      if (data && messageResponse) {
        message = messageResponse;
      } else {
        message = messageE || defaultMsg;
      }
    } else {
      message = messageE || defaultMsg;
    }
  } catch (err) {
    message = defaultMsg;
  }

  const isArray = Array.isArray(message);
  if (isArray) {
    defaultMsg = '' as any;
    const msgs = message as [];
    (message as []).forEach((el: any, index: number) => {
      let br;
      if (msgs.length - 1 > index) {
        br = '<br>';
      } else {
        br = '';
      }
      defaultMsg += String('- ' + el + br);
    });
  }
  return typeof message === 'string' ? message : defaultMsg;
}
export const showToast = {
  success: (params?: ToastShowParams) => {
    Toast.show({
      type: 'success',
      ...params,
    });
  },
  error: (params?: ToastShowParams) => {
    Toast.show({
      type: 'error',
      ...params,
    });
  },
};
export function deleteNegativeValueInObject(value: object): object {
  const p = {
    ...value,
  };
  Object.keys(p).forEach(key => {
    if ([undefined, '', 'null', 'undefined', null].includes(p[key])) {
      delete p[key];
    }
  });
  return p;
}
export const setupAxios = store => {
  axios.interceptors.request.use(
    async (conf: any = {}) => {
      if (conf.url.includes(config.api_url_prod)) {
        // @ts-ignore
        conf.params = {...conf.params, api_key: config.env.api_key};
      }
      return conf;
    },
    (err: any) => Promise.reject(err),
  );
};
export function apiGet<T = any, R = AxiosResponse<T>>(
  url: string,
  // eslint-disable-next-line @typescript-eslint/no-shadow
  config?: AxiosRequestConfig,
): Promise<R> {
  return axios.get(url, config);
}
export const tmdbImage = (urlPath: string) => {
  return `https://image.tmdb.org/t/p/w500${urlPath}`;
};
export const screenWidth = () => {
  const {width} = Dimensions.get('window');
  return width;
};
export function limitArrayTo<T>(data: T[], limit): T[] {
  const l = data.length < limit ? data.length : limit;
  return data.slice(0, l);
}
export const fakePromise = (
  waitMs: number,
  isReject: boolean = false,
  resolveResult: any = !!1,
  rejectResult: any = !!0,
) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (isReject) {
        reject(rejectResult);
        return;
      }
      resolve(resolveResult);
    }, waitMs);
  });
export const setRefreshControlProps = (props: RefreshControlProps) => {
  return {
    tintColor: Colors.color2,
    colors: [Colors.color2],
    refreshing: props.refreshing,
    onRefresh: props.onRefresh,
  };
};
export function randomString(length: number = 8): string {
  const letters = 'abcdefghijklmnopqrstuvwxyz';
  const numbers = '';
  const charset = `${letters}${letters.toUpperCase()}${numbers}`;

  const randomCharacter = (character: string) =>
    character[Math.floor(Math.random() * character.length)];

  let R = '';
  for (let i = 0; i < length; i++) {
    R += randomCharacter(charset);
  }
  return R;
}
export function setStorage(key: string, value: string): Promise<any> {
  return new Promise(async (resolve, reject) => {
    try {
      const val = await AsyncStorage.setItem(key, value);
      resolve(val);
    } catch (e) {
      reject(e);
    }
  });
}
export function getStorage(key: string, parse = false): Promise<any> {
  return new Promise(async resolve => {
    try {
      const val = (await AsyncStorage.getItem(key)) as any;
      const fix_val = !['', null, 'null'].includes(val)
        ? parse
          ? JSON.parse(val)
          : val
        : null;
      resolve(fix_val);
    } catch (e) {
      console.log('e_getStorage', e.message);
      resolve(null);
    }
  });
}
