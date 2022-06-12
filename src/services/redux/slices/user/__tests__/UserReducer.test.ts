import * as UserReducer from '../UserReducer'

const userReducer = UserReducer.default
const { resetUser, setCountry, setCountryState, setEmail } = UserReducer

const initialState = {
  alphaCountryCode: '',
  country: '',
  email: '',
  state: '',
  stateCode: '',
}
const fakeEmail = 'email@email.com'
const mockCountry = {
  country: 'Isle of man',
  alphaCountryCode: 'IM',
}
const mockCountryState = {
  state: 'California',
  stateCode: 'CA',
}

describe('User Slice', () => {
  test('should return the initial state', () => {
    expect(userReducer(undefined, { type: '' })).toEqual(initialState)
  })

  test('should handle email value', () => {
    const newState = {
      ...initialState,
      email: fakeEmail,
    }
    expect(userReducer(initialState, setEmail({ email: fakeEmail }))).toEqual(
      newState,
    )
  })

  test('should handle country value', () => {
    const newState: UserReducer.IUserInitialState = {
      ...initialState,
      ...mockCountry,
    }

    expect(userReducer(initialState, setCountry(mockCountry))).toEqual(newState)
  })

  test('should handle country state value', () => {
    const newState: UserReducer.IUserInitialState = {
      ...initialState,
      ...mockCountryState,
    }

    expect(
      userReducer(initialState, setCountryState(mockCountryState)),
    ).toEqual(newState)
  })

  test('should reset user state value to initial state', () => {
    const previousState: UserReducer.IUserInitialState = {
      ...initialState,
      ...mockCountryState,
      ...mockCountry,
    }
    expect(userReducer(previousState, resetUser())).toEqual(initialState)
  })
})
