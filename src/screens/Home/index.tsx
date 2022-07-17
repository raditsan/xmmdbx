import * as React from 'react';
import {Label, Layout, RNImage, RNScrollView, View} from 'src/components';
import {TouchableOpacity} from 'react-native';
import {useTranslation} from 'react-i18next';
import moment from 'moment';
import {fakePromise, randomString, useApp, useScrollView} from 'src/utils';
import {
  getMoviePopularApi,
  getMovieTopRatedApi,
  getMovieUpcomingApi,
  getNowPlayingApi,
  getTvAiringTodayApi,
  getTvOnTheAirApi,
  getTvPopularApi,
  getTvTopRatedApi,
} from 'src/apis';
import config from 'src/configs';
import {DrawerActions} from '@react-navigation/native';
import {
  SegmentCard1,
  SegmentCard,
  SegmentCard2,
} from 'src/screens/Home/components';
import {useState} from 'react';

export const Home = ({navigation}) => {
  const [flagRefresh, setFlagRefresh] = useState(randomString());
  const {onOpenMovieItemModal} = useApp();
  const {t} = useTranslation();
  const {setIsRefreshing, scrollViewProps} = useScrollView({
    scrollViewProps: {
      showsVerticalScrollIndicator: false,
    },
    onRefresh: async () => {
      setFlagRefresh(randomString());
      setIsRefreshing(true);
      await fakePromise(2000);
      setIsRefreshing(false);
      // onRefreshing();
    },
  });
  return (
    <Layout
      showHeader
      headerProps={{
        title: config.appName,
        headerButtonLeft: (
          <TouchableOpacity
            onPress={() => {
              navigation.dispatch(DrawerActions.toggleDrawer());
            }}
            style={{
              height: 45,
              width: 45,
              justifyContent: 'center',
            }}>
            <RNImage
              source={require('src/assets/images/line_horizontal_3.png')}
              style={{height: 18, width: 18}}
            />
          </TouchableOpacity>
        ),
        headerButtonRight: (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('WatchList');
            }}
            style={{
              height: 45,
              width: 45,
              justifyContent: 'center',
              // backgroundColor: 'blue',
              alignItems: 'center',
            }}>
            <RNImage
              source={require('src/assets/images/bookmark-2.png')}
              style={{height: 18, width: 18}}
            />
          </TouchableOpacity>
        ),
      }}>
      <RNScrollView {...scrollViewProps}>
        <Label
          color={'color2'}
          size={14}
          fontWeight={'700'}
          marginBottom={4}
          marginHorizontal={24}
          marginTop={24}>
          {moment().format('dddd, MMMM D')}
        </Label>
        <SegmentCard1
          flagRefresh={flagRefresh}
          title={t('movie_now_playing')}
          apiFunction={getNowPlayingApi}
          onTapItem={item => {
            onOpenMovieItemModal(item);
          }}
          onTapViewMore={() => {
            navigation.navigate('DetailList', {
              paramsData: {
                page: 'movie_top_rated',
              },
            });
          }}
        />
        <View height={24} />
        <SegmentCard
          title={t('movie_top_rated')}
          subtitle={t('top')}
          apiFunction={getMovieTopRatedApi}
          onTapItem={item => {
            onOpenMovieItemModal(item);
          }}
          onTapViewMore={() => {
            navigation.navigate('DetailList', {
              paramsData: {
                page: 'movie_top_rated',
              },
            });
          }}
          flagRefresh={flagRefresh}
        />
        <View height={24} />
        <SegmentCard
          title={t('movie_popular')}
          subtitle={t('top')}
          apiFunction={getMoviePopularApi}
          onTapItem={item => {
            onOpenMovieItemModal(item);
          }}
          onTapViewMore={() => {
            navigation.navigate('DetailList', {
              paramsData: {
                page: 'movie_popular',
              },
            });
          }}
          flagRefresh={flagRefresh}
        />
        <View height={24} />
        <SegmentCard
          title={t('movie_upcoming')}
          subtitle={t('top')}
          apiFunction={getMovieUpcomingApi}
          onTapItem={item => {
            onOpenMovieItemModal(item);
          }}
          onTapViewMore={() => {
            navigation.navigate('DetailList', {
              paramsData: {
                page: 'movie_upcoming',
              },
            });
          }}
          flagRefresh={flagRefresh}
        />
        <View height={24} />
        <SegmentCard1
          title={t('tv_aring_today')}
          apiFunction={getTvAiringTodayApi}
          onTapItem={item => {
            onOpenMovieItemModal(item);
          }}
          onTapViewMore={() => {
            navigation.navigate('DetailList', {
              paramsData: {
                page: 'tv_aring_today',
              },
            });
          }}
          flagRefresh={flagRefresh}
        />
        <View height={24} />
        <SegmentCard
          title={t('tv_on_the_air')}
          subtitle={t('top')}
          apiFunction={getTvOnTheAirApi}
          onTapItem={item => {
            onOpenMovieItemModal(item);
          }}
          onTapViewMore={() => {
            navigation.navigate('DetailList', {
              paramsData: {
                page: 'tv_on_the_air',
              },
            });
          }}
          flagRefresh={flagRefresh}
        />
        <View height={24} />
        <SegmentCard
          title={t('tv_top_rated')}
          subtitle={t('top')}
          apiFunction={getTvTopRatedApi}
          onTapItem={item => {
            onOpenMovieItemModal(item);
          }}
          onTapViewMore={() => {
            navigation.navigate('DetailList', {
              paramsData: {
                page: 'tv_top_rated',
              },
            });
          }}
          flagRefresh={flagRefresh}
        />
        <View height={24} />
        <SegmentCard
          title={t('tv_popular')}
          subtitle={t('top')}
          apiFunction={getTvPopularApi}
          onTapItem={item => {
            onOpenMovieItemModal(item);
          }}
          onTapViewMore={() => {
            navigation.navigate('DetailList', {
              paramsData: {
                page: 'tv_popular',
              },
            });
          }}
          flagRefresh={flagRefresh}
        />
        <View height={24} />
        <SegmentCard2
          title={t('popular_person')}
          onTapItem={() => {
            // onOpenMovieItemModal(item);
          }}
          onTapViewMore={() => {
            navigation.navigate('DetailList', {
              paramsData: {
                page: 'popular_person',
              },
            });
          }}
          flagRefresh={flagRefresh}
        />
      </RNScrollView>
    </Layout>
  );
};
