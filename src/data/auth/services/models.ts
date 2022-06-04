export enum PlatformEnum {
  ANDROID = '2',
  IOS = '3',
}

export interface ILoginResponse {
  session_key: string
  new_account: boolean
  reactivation: boolean
}

export interface ILoginRequest {
  email_address: string
  platform: PlatformEnum
}

export interface IMonitorSessionResponse {
  expired: boolean
  secret: string
}

export interface ISignUpRequest {
  email_address: string
  platform: PlatformEnum
  language: string
  country: string
  state?: string
}

export interface ISignUp {
  email: string
  country: string
  countryState?: string
}
