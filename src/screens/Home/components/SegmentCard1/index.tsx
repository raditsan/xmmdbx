import * as React from 'react';
import {MovieModel} from 'src/types';
import {useTranslation} from 'react-i18next';
import {tmdbImage, useFetch} from 'src/utils';
import {useMemo} from 'react';
import {Image, Label, RNImage, RNScrollView, View} from 'src/components';
import {TouchableOpacity} from 'react-native';

export const SegmentCard1 = (props: {
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
