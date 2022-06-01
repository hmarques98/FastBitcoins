import LocalizedStrings from 'react-native-localization'

export const localTranslate = new LocalizedStrings({
  'tr-TR': {
    noLocationService: 'Lokasyon Servisi Kapalı',
    logout: 'Çıkış',
    yes: 'Evet',
    no: 'Hayır',
    cancel: 'İptal',
    areYouSure: 'Emin misiniz?',
    logoutDesc: 'Çıkış yapmak üzeresiniz onaylıyor musunuz?',
    noInternet: 'İnternet Bağlantısı Yok',
    auth: {
      home: {
        fullName: 'ldklad',
      },
    },
  },
  en: {
    noLocationService: 'Location Service Not Available',
    logout: 'Logout',
    yes: 'Yes',
    no: 'No',
    cancel: 'Cancel',
    areYouSure: 'Are you sure?',
    logoutDesc: 'You are about to log out, confirm?',
    noInternet: 'No Internet Connection',
    auth: {
      home: {
        fullName: 'My fullName is {0} and I am {1}',
      },
    },
  },
})

export const localTranslateFormat = (
  translate?: string,
  ...args: Partial<string | number>[]
) =>
  localTranslate.formatString(translate ?? 'invalid translated string', ...args)

localTranslate.setLanguage('en')
