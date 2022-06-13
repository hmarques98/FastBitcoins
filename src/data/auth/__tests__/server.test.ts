import { getMonitorSession, login, signUp } from '../services/server'
import MockAdapter from 'axios-mock-adapter'
import { instanceAPI } from '@services/http'

const mock = new MockAdapter(instanceAPI)

afterEach(() => {
  mock.reset()
})

describe('auth/server', () => {
  it('SHOULD get monitor session', async () => {
    mock
      .onGet('/access/magic/123')
      .replyOnce(200, { expired: false, secret: '4321' })

    const response = await getMonitorSession('123')

    expect(mock.history.get[0].url).toEqual('/access/magic/123')
    expect(response).toEqual({
      expired: false,
      secret: '4321',
    })
  })

  it('SHOULD login', async () => {
    mock.onPost('/access/login').replyOnce(200, {
      session_key: '123',
      new_account: false,
      reactivation: false,
    })

    const response = await login('email@email.com')

    expect(mock.history.post[0].url).toEqual('/access/login')
    expect(mock.history.post[0].data).toEqual(
      JSON.stringify({
        email_address: 'email@email.com',
        platform: '3',
      }),
    )
    expect(response).toEqual({
      sessionKey: '123',
      newAccount: false,
      reactivation: false,
    })
  })

  it('SHOULD sign up', async () => {
    mock.onPost('/access/create').replyOnce(200, { session_key: '123' })

    const response = await signUp({
      country: 'Isle of Man',
      email: 'email@email.com',
    })

    expect(mock.history.post[0].url).toEqual('/access/create')
    expect(mock.history.post[0].data).toEqual(
      JSON.stringify({
        email_address: 'email@email.com',
        platform: '3',
        language: 'en',
        country: 'Isle of Man',
      }),
    )
    expect(response).toEqual({
      sessionKey: '123',
    })
  })
})
