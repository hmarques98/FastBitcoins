const RNN = require('@react-navigation/native')
let listeners = {}
const setOptions = jest.fn()
const navigate = jest.fn()
const dispatch = jest.fn()
const canGoBack = jest.fn().mockReturnValue(true)
const goBack = jest.fn()
const reset = jest.fn()

const navigation = {
  reset,
  setOptions,
  navigate,
  canGoBack,
  goBack,
  dispatch,
  addListener: jest.fn((name, l) => (listeners[name] = jest.fn(l))),
  getListener: (name) => listeners[name],
  triggerListener: (name, ...params) => listeners[name]?.(...params),
  resetListeners: () => {
    listeners = {}
  },
  emit: jest.fn().mockReturnValue({ defaultPrevented: false }),
}

const useNavigation = () => navigation
let navigationState = {
  index: 0,
  routes: [],
  routeNames: [],
  key: 'stack',
  stale: false,
  type: 'stack',
}
module.exports = {
  ...RNN,
  useNavigation,
  useRoute: jest.fn(() => ({ params: {} })),
  useNavigationState: (callback) => callback(navigationState),
  setState: (state) => (navigationState = { ...navigationState, ...state }),
}
