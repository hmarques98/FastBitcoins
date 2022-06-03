import { http } from '@services/http'
import { GetCountries, GetStatesByCountry } from './models'

const getCountries = async () => {
  const response = await http.get<GetCountries[]>(
    'https://restcountries.com/v3.1/all',
  )

  return response.data
}

const getStatesByCountry = async (country: string) => {
  const response = await http.post<GetStatesByCountry>(
    'https://countriesnow.space/api/v0.1/countries/states',
    { country },
  )
  return response.data.data.states
}

export { getCountries, getStatesByCountry }
