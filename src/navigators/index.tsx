import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer';
import {useEffect} from 'react';
import RNBootSplash from 'react-native-bootsplash';
import {Home, DetailList} from 'src/screens';
import config from 'src/configs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useTranslation} from 'react-i18next';
import {Colors, RNImage, View} from '../components';

function CustomDrawerContent(props) {
  const {t} = useTranslation();
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
        {/*<DrawerItemList {...props} />*/}
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
        {/*<DrawerItem*/}
        {/*  label="Close drawer"*/}
        {/*  onPress={() => props.navigation.dispatch(DrawerActions.closeDrawer())}*/}
        {/*/>*/}
        {/*<DrawerItem*/}
        {/*  label="Toggle drawer"*/}
        {/*  onPress={() => props.navigation.dispatch(DrawerActions.toggleDrawer())}*/}
        {/*/>*/}
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
    </Drawer.Navigator>
  );
}

export default function Navigators() {
  useEffect(() => {
    const init = async () => {
      // …do multiple sync or async tasks
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
