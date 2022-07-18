import * as React from 'react';
import {FetchProps, HookScrollViewProps} from 'src/types';
import {useCallback, useEffect, useRef, useState} from 'react';
import axios, {AxiosResponse} from 'axios';
import {ApiGetProps} from 'src/apis';
import {
  errorMessage,
  getStorage,
  setRefreshControlProps,
  showToast,
} from './index';
import {RefreshControl, ScrollViewProps} from 'react-native';
import {useDispatch} from 'react-redux';
import {OfflineAction} from 'src/redux/actions';
export * from 'src/contexts';
let fetchData = {};
const getInitialFetchDataList = (props: any): any[] => {
  // @ts-ignore
  const response = fetchData[props.saveDataWithName];
  let list = [];
  if (response) {
    // @ts-ignore
    list = response?.data?.data || response?.data;
  }
  return list;
};
export function useFetch<P>(props: FetchProps<P>) {
  const dispatch = useDispatch();
  const [totalData, setTotalData] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState<AxiosResponse>();
  const [list, setList] = useState<any[]>(getInitialFetchDataList(props));
  const CancelToken = axios.CancelToken;
  const source = CancelToken.source();
  const fetch = useCallback(
    (dataOrParams: ApiGetProps = props.initialParamOrDataForFetch) =>
      new Promise(async (resolve, reject) => {
        setIsLoading(true);
        setError(null);
        setIsError(false);
        try {
          const responseApi = await props.apiFunction({
            ...dataOrParams,
            cancelToken: source.token,
          });
          if (props.offlineIdentifier) {
            dispatch(OfflineAction({[props.offlineIdentifier]: responseApi}));
          }
          // @ts-ignore
          setResponse(responseApi);
          if (props.saveDataWithName) {
            fetchData = {
              ...fetchData,
              [props.saveDataWithName]: responseApi,
            };
          }
          if (props.showToastWhenSuccess) {
            // @ts-ignore
            // toast.success(reactIntlDirectMessage('MESSAGE.SUCCESS'));
            showToast.success({
              text1: 'Success',
            });
          }
          resolve(responseApi);
        } catch (e) {
          console.log('e nih', e.message);
          if (axios.isCancel(e)) {
            console.log('Request canceled =>', e.message);
            return;
          }

          if (e.message === 'Network Error' && props.offlineIdentifier) {
            getStorage('offline', true)
              .then(value => {
                if (value) {
                  setResponse(value[props.offlineIdentifier]);
                }
              })
              .catch(() => {});
          }
          // console.log('e_getData', JSON.stringify(e.response, null, 3));
          const {config, data, status, headers} = e.response || {};
          const {url, params, method} = config || {};
          console.log(
            'errorUseFetch',
            JSON.stringify(
              {
                e_message: e.message,
                headers,
                url,
                method,
                responseStatus: status,
                params,
                responseData: data,
              },
              null,
              3,
            ),
          );

          const text1 = `Error ${status || ''}`;
          // @ts-ignore
          setError(e);
          setIsError(true);
          if (
            props.showToastWhenFailed === undefined ||
            props.showToastWhenFailed
          ) {
            showToast.error({
              text1: errorMessage(e),
            });
          }
          reject(e);
        }
        setIsLoading(false);
      }),
    [],
  );
  useEffect(() => {
    if (props.fetchOnMounted) {
      fetch(props.initialParamOrDataForFetch)
        .then()
        .catch(() => {});
    }

    // @ts-ignore
    if (props.saveDataWithName && !!fetchData[props.saveDataWithName]) {
      // @ts-ignore
      setResponse(fetchData[props.saveDataWithName]);
    }
    return () => {
      source.cancel('Operation canceled by the user.');
    };
  }, []);

  useEffect(() => {
    if (response) {
      // @ts-ignore
      const rawDataList = response?.data?.results || response?.data;
      setTotalData(response?.data?.pagination?.total || 0);
      setList(rawDataList);
    }
    // eslint-disable-next-line
  }, [props.listValueAndLabel?.labelKey1, props.listValueAndLabel?.labelKey2, props.listValueAndLabel?.valueKey, response])

  const filterListData = (data: any = {}) => {
    return list.filter(el => {
      const holder = [];
      for (const key in data) {
        holder.push(data[key] === el[key]);
      }
      return !holder.includes(false);
    });
  };
  const reset = () => {
    setList([]);
    setIsLoading(false);
    setIsError(false);
    // @ts-ignore
    setResponse(null);
    setError(null);
  };
  return {
    isError,
    isLoading,
    error,
    response,
    list,
    fetch,
    filterListData,
    reset,
    totalData,
  };
}
export function useIsMounted() {
  const isMounted = useRef(true);
  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);
  return isMounted;
}
export const useScrollView = ({
  onRefresh,
  scrollViewProps,
}: HookScrollViewProps) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [refreshingIdentifier, setRefreshingIdentifier] = useState('');

  const spRefreshing: ScrollViewProps = {
    style: {flex: 1},
    refreshControl: (
      <RefreshControl
        {...setRefreshControlProps({
          refreshing: isRefreshing,
          onRefresh,
        })}
      />
    ),
  };
  const fixScrollViewProps = {
    ...spRefreshing,
    scrollViewProps,
  };
  return {
    scrollViewProps: fixScrollViewProps,
    isRefreshing,
    setIsRefreshing,
    refreshingIdentifier,
    setRefreshingIdentifier,
  };
};
