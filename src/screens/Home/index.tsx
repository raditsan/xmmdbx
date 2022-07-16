import * as React from 'react';
import {
  Image,
  Label,
  Layout,
  RNImage,
  RNScrollView,
  View,
} from 'src/components';
import {FlatList, TouchableOpacity} from 'react-native';
import {useTranslation} from 'react-i18next';
import moment from 'moment';
import {limitArrayTo, screenWidth, tmdbImage, useFetch} from 'src/utils';
import {
  getMoviePopularApi,
  getMovieTopRatedApi,
  getMovieUpcomingApi,
  getNowPlayingApi,
  getPersonPopularApi,
  getTvAiringTodayApi,
  getTvOnTheAirApi,
  getTvPopularApi,
  getTvTopRatedApi,
} from 'src/apis';
import {MovieModel} from 'src/types';
import {useMemo, useState} from 'react';
import config from 'src/configs';
import {DrawerActions} from '@react-navigation/native';

const SegmentCard = (props: {
  title: string;
  subtitle?: string;
  apiFunction: (data: any) => Promise<any>;
  onTapItem: (data: MovieModel) => void;
  onTapViewMore: () => void;
}) => {
  const {t} = useTranslation();
  const api = useFetch({
    apiFunction: props.apiFunction,
    fetchOnMounted: true,
  });

  const list = useMemo(() => {
    let listHolder = [
      {id: '1', vote_average: '-'},
      {id: '2', vote_average: '-'},
      {id: '3', vote_average: '-'},
    ];
    if (api.isLoading) {
      return listHolder;
    }
    return api.list;
  }, [api.isLoading]);
  return (
    <>
      <View marginHorizontal={24} marginBottom={12}>
        <View flexDirection={'row'} justifyContent={'space-between'}>
          <View display={'flex'} flexDirection={'row'}>
            <Label size={18} fontWeight={'700'}>
              {props.title}
            </Label>
            {props.subtitle && (
              <Label size={13} color={'color9'} marginLeft={8} marginTop={6}>
                {`${props.subtitle} ${api.list.length}`}
              </Label>
            )}
          </View>
          <TouchableOpacity onPress={() => props.onTapViewMore()}>
            <Label>{t('more')}</Label>
          </TouchableOpacity>
        </View>
      </View>
      <RNScrollView
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        contentContainerStyle={{
          paddingLeft: 24,
          paddingRight: 14,
        }}>
        {list.map((el: MovieModel) => (
          <View key={el.id} marginRight={10} width={120}>
            <View borderRadius={10} overflow={'hidden'} marginBottom={10}>
              <TouchableOpacity>
                <Image
                  source={{uri: tmdbImage(el.poster_path)}}
                  style={{
                    height: 190,
                    width: 120,
                    backgroundColor: 'transparent',
                  }}
                />
                <View
                  position={'absolute'}
                  left={-4}
                  top={0}
                  backgroundColor={'rgba(0,0,0,0.63)'}
                  display={'flex'}
                  flexDirection={'row'}
                  alignItems={'center'}
                  paddingHorizontal={8}
                  paddingVertical={2}
                  borderBottomRightRadius={4}>
                  <RNImage
                    source={require('src/assets/images/start.png')}
                    style={{height: 15, width: 15}}
                  />
                  <Label color={'color1'} size={10}>
                    {el.vote_average}
                  </Label>
                </View>
              </TouchableOpacity>
            </View>
            <Label numberOfLines={2}>{el.title || el.name}</Label>
          </View>
        ))}
      </RNScrollView>
    </>
  );
};

const SegmentCard1 = (props: {
  title: string;
  subtitle?: string;
  apiFunction: (data: any) => Promise<any>;
  onTapItem: (data: MovieModel) => void;
  onTapViewMore: () => void;
}) => {
  const {t} = useTranslation();
  const api = useFetch({
    apiFunction: props.apiFunction,
    fetchOnMounted: true,
  });

  const list = useMemo(() => {
    let listHolder = [
      {id: '1', vote_average: '-'},
      {id: '2', vote_average: '-'},
      {id: '3', vote_average: '-'},
    ];
    if (api.isLoading) {
      return listHolder;
    }
    return api.list;
  }, [api.isLoading]);
  return (
    <>
      <View marginHorizontal={24} marginBottom={12}>
        <View flexDirection={'row'} justifyContent={'space-between'}>
          <View display={'flex'} flexDirection={'row'}>
            <Label size={18} fontWeight={'700'}>
              {props.title}
            </Label>
            {props.subtitle && (
              <Label size={13} color={'color9'} marginLeft={8} marginTop={6}>
                {`${props.subtitle} ${api.list.length}`}
              </Label>
            )}
          </View>
          <TouchableOpacity onPress={() => props.onTapViewMore()}>
            <Label>{t('more')}</Label>
          </TouchableOpacity>
        </View>
      </View>
      <RNScrollView
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        contentContainerStyle={{
          paddingLeft: 24,
          paddingRight: 14,
        }}>
        {list.map((el: MovieModel) => (
          <TouchableOpacity key={el.id} onPress={() => props.onTapItem(el)}>
            <View marginRight={10} height={190} width={350}>
              <View borderRadius={10} overflow={'hidden'}>
                <Image
                  source={{uri: tmdbImage(el.backdrop_path)}}
                  style={{
                    height: '100%',
                    width: '100%',
                    backgroundColor: 'transparent',
                  }}
                />
                <View
                  position={'absolute'}
                  left={0}
                  right={0}
                  top={0}
                  bottom={0}
                  backgroundColor={'rgba(0,0,0,0.50)'}
                />
                <View
                  position={'absolute'}
                  left={18}
                  bottom={8}
                  flexDirection={'row'}>
                  <View borderRadius={8} overflow={'hidden'}>
                    <Image
                      source={{uri: tmdbImage(el.poster_path)}}
                      resizeMode={'cover'}
                      style={{
                        height: 120,
                        width: 80,
                        backgroundColor: 'transparent',
                      }}
                    />
                  </View>
                  <View flex={1}>
                    <View position={'absolute'} bottom={0} left={10} right={10}>
                      <Label numberOfLines={2} size={16} fontWeight={'500'}>
                        {el.title || el.name}
                      </Label>
                      <View flexDirection={'row'}>
                        <RNImage
                          source={require('src/assets/images/start.png')}
                          style={{height: 15, width: 15}}
                        />
                        <Label color={'color1'} size={10}>
                          {el.vote_average} ({el.vote_count})
                        </Label>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </RNScrollView>
    </>
  );
};

const SegmentCard2 = (props: {
  title: string;
  onTapItem: (data: MovieModel) => void;
  onTapViewMore?: () => void;
}) => {
  const {t} = useTranslation();
  const [heightItem, setHeightItem] = useState(screenWidth() / 1.8);
  const api = useFetch({
    apiFunction: getPersonPopularApi,
    fetchOnMounted: true,
  });
  return (
    <>
      <View marginHorizontal={24} marginBottom={12}>
        <View flexDirection={'row'} justifyContent={'space-between'}>
          <View display={'flex'} flexDirection={'row'}>
            <Label size={18} fontWeight={'700'}>
              {props.title}
            </Label>
          </View>
          <TouchableOpacity onPress={() => props.onTapViewMore()}>
            <Label>{t('more')}</Label>
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        onLayout={event => {
          const {width} = event.nativeEvent.layout;
          setHeightItem(width / 1.8);
        }}
        scrollEnabled={false}
        data={limitArrayTo(api.list, 4)}
        contentContainerStyle={{
          paddingLeft: 24,
          paddingRight: 14,
        }}
        renderItem={({item}) => {
          return (
            <View flex={1} flexDirection={'column'}>
              <TouchableOpacity
                key={item.id}
                onPress={() => props.onTapItem(item)}>
                <View marginRight={10}>
                  <View borderRadius={10} overflow={'hidden'}>
                    <Image
                      source={{uri: tmdbImage(item.profile_path)}}
                      resizeMode={'cover'}
                      style={{
                        width: '100%',
                        height: heightItem,
                      }}
                    />
                  </View>
                  <View marginVertical={10}>
                    <Label numberOfLines={2}>{item.name}</Label>
                    <Label numberOfLines={2} fontWeight={'400'} size={11}>
                      {item.known_for
                        .map((el: any) => el.title || el.name)
                        .join(', ')}
                    </Label>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          );
        }}
        //Setting the number of column
        numColumns={2}
        keyExtractor={(item, index) => index.toString()}
      />
    </>
  );
};

export const Home = ({navigation}) => {
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
              marginRight: 10,
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
          onTapItem={() => {}}
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
          onTapItem={item => {}}
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
          onTapItem={() => {}}
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
          onTapItem={() => {}}
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
          onTapItem={() => {}}
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
          onTapItem={() => {}}
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
          onTapItem={() => {}}
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
          onTapItem={() => {}}
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
          onTapItem={() => {}}
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
