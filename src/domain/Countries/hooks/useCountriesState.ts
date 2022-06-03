import { setCountry, setState } from '@services/redux/slices/user/UserReducers'
import { useAppDispatch, useAppSelector } from '@services/redux/Store'

const useCountriesState = () => {
  const { country, state } = useAppSelector(({ user }) => user.userData)
  const dispatch = useAppDispatch()

  const handleSelectedCountry = (selectedCountry: string) => {
    dispatch(setCountry({ country: selectedCountry }))
  }
  const handleSelectedState = (selectedState: string) => {
    dispatch(setState({ state: selectedState }))
  }

  return {
    country,
    state,
    handleSelectedCountry,
    handleSelectedState,
  }
}

export default useCountriesState
