import * as React from 'react';
import {MovieModel} from 'src/types';
import {useTranslation} from 'react-i18next';
import {useState} from 'react';
import {limitArrayTo, screenWidth, tmdbImage, useFetch} from 'src/utils';
import {getPersonPopularApi} from 'src/apis';
import {Image, Label, View} from 'src/components';
import {FlatList, TouchableOpacity} from 'react-native';

export const SegmentCard2 = (props: {
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
