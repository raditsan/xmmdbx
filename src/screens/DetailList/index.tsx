import * as React from 'react';
import {MovieModel, PageProps} from 'src/types';
import {screenWidth} from 'src/utils';
import {Layout, FlatListServerSide, ListItem} from 'src/components';
import {getDetailListApi} from 'src/apis';
import {useState} from 'react';
import {useTranslation} from 'react-i18next';
export const DetailList = ({route}: PageProps) => {
  const {t} = useTranslation();
  const [heightItem, setHeightItem] = useState(screenWidth() / 1.8);
  const {paramsData = {}} = route.params || {};
  const apiFunction = getDetailListApi(paramsData.page);

  return (
    <Layout
      showHeader
      headerProps={{
        title: t(paramsData.page),
      }}>
      <FlatListServerSide
        onLayout={event => {
          const {width} = event.nativeEvent.layout;
          setHeightItem(width / 1.8);
        }}
        apiFunction={apiFunction}
        // style={{backgroundColor: Colors.color1}}
        name={t(paramsData.page)}
        contentContainerStyle={{
          paddingTop: 24,
          paddingLeft: 24,
          paddingRight: 14,
        }}
        uniqueKey={'id'}
        numColumns={2}
        renderItem={props => {
          const {item} = props as {item: MovieModel; index: number};
          return (
            <ListItem
              isPerson={paramsData.page.includes('person')}
              item={item}
              heightItem={heightItem}
            />
          );
        }}
      />
    </Layout>
  );
};
