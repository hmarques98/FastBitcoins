import React from 'react'

import AccountEmailScreen from '../AccountEmailScreen'

import { render } from 'utils/testUtils'

jest.mock('domain/User/useUserClientState', () =>
  jest.fn(() => {
    return {
      setEmail: jest.fn(),
      user: {
        email: 'email@email.com',
      },
    }
  }),
)

describe('AccountEmailScreen', () => {
  it('SHOULD render correctly', () => {
    render(<AccountEmailScreen />)
  })
})
