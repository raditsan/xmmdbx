import * as React from 'react';
import {DrawerActions, NavigationContainer} from '@react-navigation/native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer';
import {useEffect} from 'react';
import RNBootSplash from 'react-native-bootsplash';
import {Home, DetailList, WatchList} from 'src/screens';
import config from 'src/configs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useTranslation} from 'react-i18next';
import {Colors, Label, RNImage, View} from 'src/components';
import {fakePromise, useApp} from 'src/utils';

function CustomDrawerContent(props) {
  const {t} = useTranslation();
  const {setLang} = useApp();
  const menus = [
    'movie_now_playing',
    'movie_top_rated',
    'movie_upcoming',
    'movie_popular',
    'popular_person',
    'tv_aring_today',
    'tv_top_rated',
    'tv_on_the_air',
    'tv_popular',
  ];
  const setLanguage = (value: string) => {
    setLang(value);
    props.navigation.dispatch(DrawerActions.closeDrawer());
  };
  return (
    <View flex={1}>
      <View
        backgroundColor={'color3'}
        alignItems={'center'}
        justifyContent={'center'}>
        <RNImage
          source={require('src/assets/images/logo.png')}
          resizeMode={'contain'}
          style={{height: 40, width: 120, marginTop: 60}}
        />
      </View>
      <DrawerContentScrollView
        {...props}
        style={{
          backgroundColor: Colors.color3,
        }}>
        <Label
          paddingHorizontal={16}
          marginTop={12}
          color={'color9'}
          fontWeight={'700'}>
          {t('menu')}
        </Label>
        {menus.map(el => (
          <DrawerItem
            key={el}
            label={t(el)}
            labelStyle={{
              color: Colors.color1,
            }}
            onPress={() =>
              props.navigation.navigate('DetailList', {
                paramsData: {
                  page: el,
                },
              })
            }
          />
        ))}
        <View
          height={1}
          backgroundColor={'color9'}
          marginHorizontal={16}
          marginVertical={12}
        />
        <Label
          paddingHorizontal={16}
          marginTop={12}
          color={'color9'}
          fontWeight={'700'}>
          {t('language')}
        </Label>
        <DrawerItem
          label={t('en')}
          labelStyle={{
            color: Colors.color1,
          }}
          onPress={() => {
            setLanguage('en');
          }}
        />
        <DrawerItem
          label={t('id')}
          labelStyle={{
            color: Colors.color1,
          }}
          onPress={() => {
            setLanguage('id');
          }}
        />
      </DrawerContentScrollView>
    </View>
  );
}

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

function Root() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="DetailList" component={DetailList} />
    </Stack.Navigator>
  );
}
function MyDrawer() {
  return (
    <Drawer.Navigator
      initialRouteName="Root"
      screenOptions={{
        headerShown: false,
        headerTitleAlign: 'center',
        headerShadowVisible: false,
        headerTitleStyle: {
          fontFamily: config.fontFamily,
        },
      }}
      useLegacyImplementation
      drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="Root" component={Root} />
      <Drawer.Screen name="WatchList" component={WatchList} />
    </Drawer.Navigator>
  );
}

export default function Navigators() {
  useEffect(() => {
    const init = async () => {
      await fakePromise(1000);
    };

    init().finally(async () => {
      await RNBootSplash.hide({fade: true});
      console.log('Bootsplash has been hidden successfully');
    });
  }, []);
  return (
    <NavigationContainer>
      <MyDrawer />
    </NavigationContainer>
  );
}
