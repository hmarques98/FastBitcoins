module.exports = {
  preset: '@testing-library/react-native',
  testEnvironment: 'node',
  setupFilesAfterEnv: [
    '@testing-library/jest-native/extend-expect',
    './jest.setup.js',
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transformIgnorePatterns: [
    'node_modules/(?!(@react-native|react-native|react-native-vector-icons|react-native-iphone-x-helper|react-native-flipper|expo-linear-gradient|@react-native-community||expo(nent)?|@expo(nent)?/.*|@react-navigation|.|react-navigation|react-native-animatable)/)',
  ],
  moduleNameMapper: {
    '.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$':
      'jest-transform-stub',
    '\\.(css|less)$': 'identity-obj-proxy',
    '^.+\\.tsx?$': 'ts-jest',
  },
}
