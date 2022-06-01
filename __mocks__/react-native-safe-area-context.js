import { moduleExpression } from '@babel/types'
import * as RNSA from 'react-native-safe-area-context'

const useSafeAreaInsets = jest.fn().mockReturnValue({
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
})

module.exports = {
  ...RNSA,
  useSafeAreaInsets,
}
