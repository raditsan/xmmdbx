import * as React from 'react';
import {Layout, EmptyPlaceholderView, ListItem} from 'src/components';
import {useTranslation} from 'react-i18next';
import {useApp} from 'src/contexts';
import {FlatList} from 'react-native';
import {screenWidth} from 'src/utils';
import {useState} from 'react';
import {MovieModel} from 'src/types';
export const WatchList = () => {
  const {watchList} = useApp();
  const {t} = useTranslation();
  const [heightItem, setHeightItem] = useState(screenWidth() / 1.8);

  return (
    <Layout
      showHeader
      headerProps={{
        title: t('watch_list'),
      }}>
      <FlatList
        onLayout={event => {
          const {width} = event.nativeEvent.layout;
          setHeightItem(width / 1.8);
        }}
        contentContainerStyle={{
          paddingTop: 24,
          paddingLeft: 24,
          paddingRight: 14,
        }}
        ListEmptyComponent={
          <EmptyPlaceholderView generalMessage={t('watch_list')} />
        }
        style={{flex: 1}}
        onEndReachedThreshold={0.7}
        data={watchList}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item.id}
        renderItem={props => {
          const {item} = props as {item: MovieModel; index: number};
          return (
            <ListItem item={item} heightItem={heightItem} isPerson={false} />
          );
        }}
        numColumns={2}
      />
    </Layout>
  );
};
