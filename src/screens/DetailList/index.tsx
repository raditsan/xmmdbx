import * as React from 'react';
import {MovieModel, PageProps} from 'src/types';
import {screenWidth, tmdbImage} from 'src/utils';
import {
  Layout,
  FlatListServerSide,
  View,
  Label,
  Image,
  RNImage,
} from 'src/components';
import {TouchableOpacity} from 'react-native';
import {fakeApiFunction, getDetailListApi} from 'src/apis';
import {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';

const ListItem = (props: {item: MovieModel; heightItem: number}) => {
  const {item, heightItem} = props;
  return (
    <View flex={1} flexDirection={'column'}>
      <TouchableOpacity key={item.id} onPress={() => {}}>
        <View marginRight={10}>
          <View borderRadius={10} overflow={'hidden'}>
            <Image
              source={{uri: tmdbImage(item.poster_path)}}
              resizeMode={'cover'}
              style={{
                width: '100%',
                height: heightItem,
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
                {item.vote_average}
              </Label>
            </View>
          </View>
          <View marginVertical={10}>
            <Label numberOfLines={2}>{item.title || item.name}</Label>
            {item.known_for && (
              <Label numberOfLines={2} fontWeight={'400'} size={11}>
                {item.known_for
                  .map((el: any) => el.title || el.name)
                  .join(', ')}
              </Label>
            )}
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export const DetailList = ({route}: PageProps) => {
  const {t} = useTranslation();
  const [heightItem, setHeightItem] = useState(screenWidth() / 1.8);
  const {paramsData = {}} = route.params || {};
  const apiFunction = getDetailListApi(paramsData.page);

  useEffect(() => {
    console.log('route', paramsData.page);
  }, [route]);

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
        // dataRequest={{
        //   params: {
        //     ...deleteNegativeValueInObject({
        //       emp_name: search,
        //       sort_by_emp_name: 'ASC',
        //     }),
        //   },
        // }}
        // onResponse={value => {
        //   setTotalEmployee(value?.data?.pagination?.total);
        // }}
        // ListHeaderComponent={
        //   <View
        //     backgroundColor={'color13'}
        //     paddingHorizontal={staticSize(24)}
        //     paddingVertical={staticSize(10)}>
        //     <Label size={10} fontWeight={'500'}>
        //       {t('employee_total')} (
        //       <Label size={10} fontWeight={'500'} color={'color2'}>
        //         {totalEmployee}
        //       </Label>
        //       )
        //     </Label>
        //   </View>
        // }
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
          return <ListItem item={item} heightItem={heightItem} />;
        }}
      />
    </Layout>
  );
};
