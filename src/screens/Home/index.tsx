import * as React from 'react';
import {
  Colors,
  Image,
  Label,
  Layout,
  RNImage,
  RNScrollView,
  View,
} from 'src/components';
import {Dimensions, TouchableOpacity} from 'react-native';
import {useTranslation} from 'react-i18next';
import moment from 'moment';
import {tmdbImage, useApp} from 'src/utils';
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
import {useRef, useState} from 'react';
import config from 'src/configs';
import {DrawerActions} from '@react-navigation/native';
import {Modalize} from 'react-native-modalize';
import {
  SegmentCard1,
  SegmentCard,
  SegmentCard2,
} from 'src/screens/Home/components';
import {MovieModel} from 'src/types';

export const Home = ({navigation}) => {
  const {watchList, addToWatchList, removeFromWatchList} = useApp();
  const [heightItem, setHeightItem] = useState(0);
  const [selectedData, setSelectedData] = useState<MovieModel>(null);
  const {onOpenMovieItemModal} = useApp()
  const {t} = useTranslation();
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
      <RNScrollView style={{flex: 1}}>
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
        />
      </RNScrollView>
    </Layout>
  );
};
