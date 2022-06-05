import { useCallback, useEffect, useMemo } from 'react'
import { useQuery, useMutation } from 'react-query'

import {
  getCountries,
  getStatesByCountry as _getStatesByCountry,
} from 'data/countries/services'
import { GetCountries } from 'data/countries/services/models'

import useCountriesClientState from '../useCountriesClientState'

const UNITED_STATES = 'United States'

const useCountriesService = () => {
  const {
    data: countries,
    refetch,
    error: errorCountries,
    isLoading: isLoadingCountries,
  } = useQuery('countries', getCountries)

  const {
    mutate,
    data: statesByCountry,
    error: errorStatesByCountry,
  } = useMutation(_getStatesByCountry)
  const { country } = useCountriesClientState()

  const countriesOrderedByName = useMemo(
    () => countries?.sort((a, b) => (a.name.common > b.name.common ? 0 : -1)),
    [countries],
  )

  const isCountrySelectedUnitedStates = useMemo(
    () => country === UNITED_STATES,
    [country],
  )

  const filterCountriesByText = useCallback(
    (text: string) => {
      if (!text) return countries
      return countries
        ? countries.filter(item =>
            item.name.common.toLowerCase().includes(text.toLowerCase()),
          )
        : ([] as GetCountries[])
    },
    [countries],
  )
  const filterStatesByText = useCallback(
    (text: string) => {
      if (!text) return statesByCountry
      return statesByCountry
        ? statesByCountry.filter(item =>
            item.name.toLowerCase().includes(text.toLowerCase()),
          )
        : []
    },
    [statesByCountry],
  )

  const getStatesByCountry = useCallback(() => {
    if (isCountrySelectedUnitedStates) {
      mutate(country)
    }
  }, [country, isCountrySelectedUnitedStates, mutate])

  useEffect(() => {
    getStatesByCountry()
  }, [getStatesByCountry])

  return {
    countries: countriesOrderedByName,
    refetchCountries: refetch,
    errorCountries,
    filterCountriesByText,
    isLoadingCountries,

    statesByCountry,
    errorStatesByCountry,
    filterStatesByText,

    isCountrySelectedUnitedStates,
  }
}

export default useCountriesService
