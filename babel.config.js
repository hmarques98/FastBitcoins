module.exports = function (api) {
  api.cache(true)
  return {
    presets: ['module:metro-react-native-babel-preset'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./src'],
          alias: [
            { '@shared-components': './src/shared/components' },
            { '@shared-constants': './src/shared/constants' },
            { '@domain': './src/domain' },
            { '@data': './src/data' },
            { '@ui': './src/ui' },
            { '@font-size': './src/shared/theme/font-size' },
            { '@api': './src/services/api/index' },
            { '@fonts': './src/shared/theme/fonts' },
            { '@colors': './src/shared/theme/colors' },
            { '@theme': './src/shared/theme' },
            { '@models': './src/services/models' },
            { '@services': './src/services' },
            { '@screens': './src/screens' },
            { '@utils': './src/utils/' },
            { '@assets': './src/assets/' },
            { '@event-emitter': './src/services/event-emitter' },
            { '@local-storage': './src/services/local-storage' },
            { '@mocks': './__mocks__' },
          ],
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
      ],
      'react-native-reanimated/plugin',
    ],
  }
}
