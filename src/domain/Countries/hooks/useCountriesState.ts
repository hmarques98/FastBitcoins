import { setCountry } from '@services/redux/slices/user/UserReducers'
import { useAppDispatch, useAppSelector } from '@services/redux/Store'

const useCountriesState = () => {
  const { country } = useAppSelector(state => state.user.userData)
  const dispatch = useAppDispatch()

  const handleSelectedCountry = (selectedCountry: string) => {
    dispatch(setCountry({ country: selectedCountry }))
  }

  return {
    country,
    handleSelectedCountry,
  }
}

export default useCountriesState
