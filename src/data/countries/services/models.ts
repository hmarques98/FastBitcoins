export interface GetCountries {
  name: {
    official: string
    common: string
  }
  translations: {
    [key: string]: {
      official: string
    }
  }
  fifa: string
  flag: string
  cca2: string
}

export interface GetStatesByCountry {
  data: { states: [{ name: string; state_code: string }] }
}
