import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import {FlatList, RefreshControl} from 'react-native';
import {EmptyPlaceholderView, FlatListFooterIndicator} from 'src/components';
import {
  deleteNegativeValueInObject,
  fakePromise,
  setRefreshControlProps,
  useFetch,
  useIsMounted,
} from 'src/utils';
import config from 'src/configs';
import {FlatListServerSideProps} from 'src/types';

export const FlatListServerSide = forwardRef(
  (
    {
      name = 'Data ',
      flagRefresh,
      uniqueKey,
      apiFunction,
      forceLocalSide,
      onResponse,
      dataRequest,
      fetchOnMount,
      onFetching,
      emptyPlaceholderViewProps,
      noPagination,
      refreshAble = true,
      ...flatListProps
    }: FlatListServerSideProps<any>,
    ref,
  ) => {
    useImperativeHandle(ref, () => ({
      fetchData() {
        onRefresh();
      },
    }));
    const fetchOnMount2 = fetchOnMount === undefined ? true : fetchOnMount;
    const isFetching = useRef(false);
    const api = useFetch({apiFunction});
    const pageSize = config.pageSize;
    const isMounted = useIsMounted();
    const [loading, setLoading] = useState(true);
    const [loadingLoadMore, setLoadingLoadMore] = useState(false);
    const [listData, setListData] = useState([]);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [isMax, setIsMax] = useState(false);
    const [page, setPage] = useState(1);
    useEffect(() => {
      if (api.response && !forceLocalSide) {
        onResponse && onResponse(api.response);
      }
    }, [api.response]);

    useEffect(() => {
      if (!forceLocalSide && onFetching) {
        onFetching(api.isLoading);
      }
    }, [api.isLoading]);

    useEffect(() => {
      if (api.isError) {
        setLoading(false);
        setIsRefreshing(false);
        setLoadingLoadMore(false);
      }
    });

    const onEndReached = () => {
      if (forceLocalSide || noPagination) {
        return;
      }
      if (!isMax && !loadingLoadMore && !loading) {
        setLoadingLoadMore(true);
        getData(page, pageSize, false);
      } else {
        console.log('cant load more because data is max');
      }
    };
    const onRefresh = () => {
      if (forceLocalSide) {
        setIsRefreshing(false);
        return;
      }
      setIsRefreshing(true);
      getData(1, pageSize, true).then(() => {}).catch(() => {});
    };

    const checkIsFetching = () => {
      return (
        isRefreshing || loadingLoadMore || api.isLoading || isFetching.current
      );
    };
    const getData = async (_page, _size, _isRefreshing) => {
      if (!isMounted.current) {
        return;
      }
      if (checkIsFetching()) {
        return;
      }
      if (forceLocalSide) {
        console.log('forceLocalSide');
        return;
      }
      await fakePromise(200);
      if (checkIsFetching()) {
        return;
      }
      isFetching.current = true;
      await fakePromise(200);
      // setLoading(true);
      try {
        console.log('onGet', {_page, _size});
        const response = await api.fetch(
          deleteNegativeValueInObject({
            id: dataRequest?.id,
            params: {
              page: _page,
              ...dataRequest?.params,
            },
          }),
        );
        let data = [];
        if (response) {
          // @ts-ignore
          const rawDataList = response?.data?.results || response?.data;
          if (Array.isArray(rawDataList)) {
            data = rawDataList;
          }
        }

        if (!isMounted.current) {
          return;
        }
        const dataLess = data.length < pageSize;
        console.log('dataLess', {
          dataLess,
          'data.length': data.length,
          _page,
        });
        setPage(dataLess ? _page : _page + 1);
        setIsMax(dataLess);
        setLoading(false);
        setLoadingLoadMore(false);
        setIsRefreshing(false);
        if (_isRefreshing) {
          setListData(data);
        } else {
          setListData(prevState => [...prevState, ...data]);
        }
      } catch (e) {
        if (!isMounted) {
          return;
        }
        // setLoading(false)
        setLoadingLoadMore(false);
      } finally {
        isFetching.current = false;
      }
    };

    useEffect(() => {
      if (isMounted.current && fetchOnMount2) {
        onRefresh();
      }
    }, [dataRequest]);

    useEffect(() => {
      if (isMounted.current && flagRefresh) {
        onRefresh();
      }
    }, [flagRefresh]);
    return (
      <FlatList
        // ListHeaderComponent={
        //   <>
        //   </>
        // }
        contentContainerStyle={{flexGrow: 1}}
        ListFooterComponent={
          <FlatListFooterIndicator active={loadingLoadMore} />
        }
        ListEmptyComponent={
          <EmptyPlaceholderView
            generalMessage={!emptyPlaceholderViewProps && name}
            {...emptyPlaceholderViewProps}
          />
        }
        refreshControl={
          refreshAble && (
            <RefreshControl
              {...setRefreshControlProps({refreshing: isRefreshing, onRefresh})}
            />
          )
        }
        onEndReached={onEndReached}
        // onRefresh={onRefresh}
        style={{flex: 1}}
        onEndReachedThreshold={0.7}
        data={listData}
        // refreshing={isRefreshing}
        // renderItem={props.renderItem}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item[uniqueKey]}
        {...flatListProps}
      />
    );
  },
);
