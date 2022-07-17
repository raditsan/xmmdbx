import * as React from 'react';
import {MovieModel} from 'src/types';
import {useTranslation} from 'react-i18next';
import {tmdbImage, useFetch} from 'src/utils';
import {useEffect, useMemo} from 'react';
import {Image, Label, RNImage, RNScrollView, View} from 'src/components';
import {TouchableOpacity} from 'react-native';

export const SegmentCard = (props: {
  title: string;
  flagRefresh: string;
  subtitle?: string;
  apiFunction: (data: any) => Promise<any>;
  onTapItem: (data: MovieModel) => void;
  onTapViewMore: () => void;
}) => {
  const {t} = useTranslation();
  const api = useFetch({
    apiFunction: props.apiFunction,
  });

  useEffect(() => {
    api.fetch().then(() => {});
  }, [props.flagRefresh]);

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
              <TouchableOpacity onPress={() => props.onTapItem(el)}>
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
