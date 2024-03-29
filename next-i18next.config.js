/** @type {import('next-i18next').UserConfig} */
module.exports = {
    i18n: {
        defaultLocale: 'en',
        locales: ['en', 'bn'],
        localeDetection: true,
        reloadOnPrerender: true
    },
    localePath:
    typeof window === 'undefined'
      ? require('path').resolve('./public/locales')
      : '/locales',
    
    reloadOnPrerender: process.env.NODE_ENV === 'development'
}
