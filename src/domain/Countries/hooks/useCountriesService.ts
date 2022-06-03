import {
  getCountries,
  getStatesByCountry as _getStatesByCountry,
} from 'data/countries/services'
import { GetCountries } from 'data/countries/services/models'
import { useCallback } from 'react'
import { useQuery, useMutation } from 'react-query'

const useCountriesService = () => {
  const {
    data,
    refetch,
    error: errorCountries,
    isLoading: isLoadingCountries,
  } = useQuery('countries', getCountries)

  const {
    mutate,
    data: statesByCountry,
    error: errorStatesByCountry,
  } = useMutation(_getStatesByCountry)

  const countriesOrderedByName = useCallback(
    () => data?.sort((a, b) => (a.name.common > b.name.common ? 0 : -1)),
    [data],
  )

  const filterCountriesByText = useCallback(
    (text: string) => {
      if (!text) return data
      return data
        ? data.filter(item =>
            item.name.common.toLowerCase().includes(text.toLowerCase()),
          )
        : ([] as GetCountries[])
    },
    [data],
  )

  return {
    countries: countriesOrderedByName(),
    refetchCountries: refetch,
    errorCountries,
    filterCountriesByText,
    isLoadingCountries,

    statesByCountry,
    getStatesByCountry: mutate,
    errorStatesByCountry,
  }
}

export default useCountriesService
