import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import en from './en';
import id from './id';
i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  lng: 'en',
  fallbackLng: 'en',
  resources: {
    en: {
      translation: en,
    },
    id: {
      translation: id,
    },
  },
});

export default i18n;
