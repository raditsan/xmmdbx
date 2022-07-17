import * as React from 'react';
import {createContext, useContext, useEffect, useRef, useState} from 'react';
import {Dimensions, TouchableOpacity} from 'react-native';
import {Colors, Image, Label, RNImage, View} from 'src/components';
import {getStorage, setStorage, tmdbImage} from 'src/utils';
import {Modalize} from 'react-native-modalize';
import {useTranslation} from 'react-i18next';
import {MovieModel} from 'src/types';
import i18n from 'src/i18n';

const CounterContext = createContext({
  lang: 'en',
  setLang: (() => {}) as any,
  watchList: [],
  setWatchList: (() => {}) as any,
  addToWatchList: (value: any) => {},
  onOpenMovieItemModal: (data: MovieModel) => {},
  removeFromWatchList: (id: any) => {},
});

export const useCounter = () => useContext(CounterContext);
export const useApp = () => useContext(CounterContext);

export const AppContextProvider = ({children}) => {
  const {t} = useTranslation();
  const [heightItem, setHeightItem] = useState(0);
  const APP_LANG_KEY = 'APP_LANG_KEY';
  const APP_WATCHLIST_KEY = 'APP_WATCHLIST_KEY2';

  const [isReady, setIsReady] = useState(false);
  const [lang, setLang] = useState('en');
  const [watchList, setWatchList] = useState([]);
  const modalizeRef = useRef<Modalize>(null);
  const [selectedData, setSelectedData] = useState(null);
  const onOpenMovieItemModal = (data: any) => {
    setSelectedData(data);
    modalizeRef.current?.open();
  };
  const addToWatchList = (value: any) => {
    setWatchList(prevState => [...prevState, value]);
  };
  const removeFromWatchList = (id: any) => {
    setWatchList(prevState => [...prevState.filter((el: any) => el.id !== id)]);
  };

  //SET VALUE
  useEffect(() => {
    if (watchList && isReady) {
      setStorage(APP_WATCHLIST_KEY, JSON.stringify(watchList));
    }
  }, [watchList, isReady]);

  useEffect(() => {
    if (lang && isReady) {
      setStorage(APP_LANG_KEY, lang);
      i18n.changeLanguage(lang);
    }
  }, [lang, isReady]);

  //INIT VALUE
  useEffect(() => {
    setInitialData().then(() => {});
  }, []);

  const setInitialData = async () => {
    try {
      const val_lang = await getStorage(APP_LANG_KEY);
      if (val_lang) {
        setLang(val_lang);
      }
      const val_watchlist = await getStorage(APP_WATCHLIST_KEY);
      if (val_watchlist) {
        setWatchList(JSON.parse(val_watchlist || '[]'));
      }
    } catch (e) {
    } finally {
      setIsReady(true);
    }
  };

  return (
    // @ts-ignore
    <CounterContext.Provider
      value={{
        watchList,
        setWatchList,
        lang,
        setLang,
        addToWatchList,
        removeFromWatchList,
        onOpenMovieItemModal,
      }}>
      {children}
      <Modalize
        onClosed={() => {
          setSelectedData(null);
        }}
        modalHeight={Dimensions.get('window').height / 2}
        onLayout={event => {
          const {width} = event.layout;
          setHeightItem(width / 2);
        }}
        ref={modalizeRef}
        modalStyle={{backgroundColor: Colors.color3}}>
        {selectedData && (
          <>
            <View
              borderTopRightRadius={12}
              borderTopLeftRadius={12}
              overflow={'hidden'}>
              <Image
                source={{uri: tmdbImage(selectedData?.backdrop_path)}}
                style={{
                  height: heightItem,
                  width: '100%',
                  backgroundColor: 'transparent',
                }}
              />
            </View>
            <View margin={24} flexDirection={'row'}>
              <View borderRadius={8} overflow={'hidden'}>
                <Image
                  source={{uri: tmdbImage(selectedData?.poster_path)}}
                  resizeMode={'cover'}
                  style={{
                    height: 120,
                    width: 80,
                    backgroundColor: 'transparent',
                  }}
                />
              </View>
              <View marginLeft={12} flex={1}>
                <Label numberOfLines={2} size={18} fontWeight={'500'}>
                  {selectedData?.title || selectedData?.name}
                </Label>
                <View flexDirection={'row'}>
                  <RNImage
                    source={require('src/assets/images/start.png')}
                    style={{height: 16, width: 16}}
                  />
                  <Label color={'color1'} size={12}>
                    {selectedData?.vote_average} ({selectedData?.vote_count})
                  </Label>
                </View>
                <View marginTop={4}>
                  <Label size={11} fontWeight={'400'} marginBottom={8}>
                    {t('release_date')} :
                    <Label size={11} fontWeight={'500'} marginBottom={2}>
                      {selectedData?.release_date}
                    </Label>
                  </Label>

                  <TouchableOpacity
                    onPress={() => {
                      watchList.find((el: any) => el.id === selectedData?.id)
                        ? removeFromWatchList(selectedData.id)
                        : addToWatchList(selectedData);
                      // setLang('radotsan')
                    }}>
                    <View
                      flexDirection={'row'}
                      borderRadius={8}
                      borderWidth={2}
                      borderColor={'color1'}
                      height={35}
                      paddingHorizontal={12}
                      alignItems={'center'}
                      justifyContent={'center'}>
                      {watchList.find(
                        (el: any) => el.id === selectedData?.id,
                      ) ? (
                        <>
                          <RNImage
                            source={require('src/assets/images/bookmark.png')}
                            style={{width: 16, height: 16}}
                          />
                          <Label size={12}>{t('remove_from_watch_list')}</Label>
                        </>
                      ) : (
                        <>
                          <RNImage
                            source={require('src/assets/images/bookmark_fill.png')}
                            style={{width: 16, height: 16}}
                          />
                          <Label size={12}>{t('add_to_watch_list')}</Label>
                        </>
                      )}
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View padding={24}>
              <Label marginBottom={4} size={20} fontWeight={'500'}>
                {t('overview')}
              </Label>
              <Label size={14}>{selectedData?.overview}</Label>
            </View>
          </>
        )}
      </Modalize>
    </CounterContext.Provider>
  );
};
