import {
  setCountry,
  setCountryState,
} from '@services/redux/slices/user/UserReducers'
import { useAppDispatch, useAppSelector } from '@services/redux/Store'

const useCountriesClientState = () => {
  const { country, state } = useAppSelector(({ user }) => user.userData)
  const dispatch = useAppDispatch()

  const handleSelectedCountry = ({
    selectedCountry,
    alphaCountryCode,
  }: {
    selectedCountry: string
    alphaCountryCode: string
  }) => {
    dispatch(setCountry({ country: selectedCountry, alphaCountryCode }))
  }
  const handleSelectedState = ({
    selectedState,
    stateCode,
  }: {
    selectedState: string
    stateCode: string
  }) => {
    dispatch(setCountryState({ state: selectedState, stateCode }))
  }

  const resetCountryState = () => {
    dispatch(setCountryState({ state: '', stateCode: '' }))
  }

  return {
    country,
    state,
    handleSelectedCountry,
    handleSelectedState,
    resetCountryState,
  }
}

export default useCountriesClientState
