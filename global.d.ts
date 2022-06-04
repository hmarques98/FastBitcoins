import { theme } from './src/shared/theme/themes'

declare module '@react-navigation/native' {
  export type ExtendedTheme = typeof theme
  export function useTheme(): ExtendedTheme
}

declare module '*.svg' {
  import Svg from 'react-native-svg'

  const content: Svg
  export default content
}
