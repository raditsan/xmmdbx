import * as React from 'react';
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {Dimensions, TouchableOpacity} from 'react-native';
import {
  Colors,
  Image,
  Label,
  RNImage,
  RNScrollView,
  View,
} from 'src/components';
import {getStorage, setStorage, tmdbImage} from 'src/utils';
import {Modalize} from 'react-native-modalize';
import {useTranslation} from 'react-i18next';
import {MovieModel, PersonModel} from 'src/types';
import i18n from 'src/i18n';

const CounterContext = createContext({
  lang: 'en',
  setLang: (() => {}) as any,
  watchList: [],
  setWatchList: (() => {}) as any,
  addToWatchList: (value: any) => {},
  onOpenMovieItemModal: (data: MovieModel) => {},
  onOpenPersonItemModal: (data: PersonModel) => {},
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
  const modalizePersonRef = useRef<Modalize>(null);
  const [selectedData, setSelectedData] = useState(null);
  const [selectedDataPerson, setSelectedDataPerson] = useState(null);
  const onOpenMovieItemModal = (data: any) => {
    if (Object.keys(data).length <= 2) {
      return;
    }
    setSelectedData(data);
    modalizeRef.current?.open();
  };
  const onOpenPersonItemModal = (data: any) => {
    if (Object.keys(data).length <= 1) {
      return;
    }
    setSelectedDataPerson(data);
    modalizePersonRef.current?.open();
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

  const personData = useMemo<PersonModel>(() => {
    return selectedDataPerson;
  }, [selectedDataPerson]);

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
        onOpenPersonItemModal,
      }}>
      {children}
      <Modalize
        onClosed={() => {
          setSelectedDataPerson(null);
        }}
        ref={modalizePersonRef}
        modalStyle={{backgroundColor: Colors.color3}}>
        {personData && (
          <>
            <View alignItems={'center'} margin={24}>
              <Image
                borderRadius={10}
                source={{uri: tmdbImage(personData.profile_path)}}
                resizeMode={'cover'}
                style={{
                  width: 150,
                  height: 250,
                }}
              />
              <Label size={18} fontWeight={'700'} marginTop={12}>
                {personData.name}
              </Label>
            </View>
            <View marginTop={12} paddingHorizontal={24}>
              <Label size={16} fontWeight={'700'} marginBottom={10}>
                {t('known_for_department')}
              </Label>
              <Label size={14}>{personData.known_for_department || '-'}</Label>
            </View>
            <View marginTop={12} paddingHorizontal={24}>
              <Label size={16} fontWeight={'700'} marginBottom={10}>
                {t('popularity')}
              </Label>
              <Label size={14}>{personData.popularity}</Label>
            </View>

            <View marginTop={12}>
              <Label
                size={16}
                fontWeight={'700'}
                paddingHorizontal={24}
                marginBottom={10}>
                {t('known_for')}
              </Label>
              <RNScrollView
                showsHorizontalScrollIndicator={false}
                horizontal={true}
                contentContainerStyle={{
                  paddingLeft: 24,
                  paddingRight: 14,
                }}>
                {personData.known_for.map(el => (
                  <View key={el.id} marginRight={10} width={120}>
                    <View
                      borderRadius={10}
                      overflow={'hidden'}
                      marginBottom={10}>
                      <TouchableOpacity
                        onPress={() => {
                          onOpenMovieItemModal(el);
                        }}>
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
                    <Label numberOfLines={2}>{el.name}</Label>
                  </View>
                ))}
              </RNScrollView>
            </View>
          </>
        )}
      </Modalize>
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
