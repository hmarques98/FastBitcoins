import React, { useMemo, useRef, useState } from 'react'
import { Keyboard, View, TouchableWithoutFeedback, Text } from 'react-native'
import {
  useFocusEffect,
  useNavigation,
  useTheme,
} from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import Button from '@shared-components/Button'

import { RootStackParamList } from '@services/navigation'
import { SCREENS } from '@services/navigation/Navigation.enums'
import TextField from '@shared-components/TextField'

import createStyles from './NewAccountScreen.styles'
import BottomSheet, {
  BottomSheetFlatList,
  TouchableOpacity,
} from '@gorhom/bottom-sheet'
import useCountriesService from 'domain/Countries/hooks/useCountriesService'
import useCountriesState from 'domain/Countries/hooks/useCountriesState'

type NavigationProps = StackNavigationProp<
  RootStackParamList,
  SCREENS.AUTH_NEW_ACCOUNT
>

const NewAccountScreen = () => {
  const theme = useTheme()

  const styles = useMemo(() => createStyles(theme), [theme])

  const { push } = useNavigation<NavigationProps>()

  const sheetRefCountry = useRef<BottomSheet>(null)
  const sheetRefState = useRef<BottomSheet>(null)
  const snapPoints = useMemo(() => ['98%'], [])

  const {
    filterCountriesByText,
    isLoadingCountries,
    filterStatesByText,
    isCountrySelectedUnitedStates,
  } = useCountriesService()
  const { country, handleSelectedCountry, handleSelectedState, state } =
    useCountriesState()

  const [searchedCountry, setSearchedCountry] = useState('')
  const [searchedState, setSearchedState] = useState('')

  if (isLoadingCountries) return <></>

  return (
    <TouchableWithoutFeedback
      style={styles.touchableContainer}
      onPress={Keyboard.dismiss}
      accessible={false}
    >
      <View style={styles.container}>
        <View style={styles.searchBarContainer}>
          <View style={styles.infoHeaderContainer}>
            <Text style={styles.infoHeaderText}>
              Bacon ipsum dolor amet kielbasa filet mignon biltong hamburger
              tri-tip sirloin.
            </Text>
          </View>

          <TextField
            value={country}
            onPress={() => sheetRefCountry.current?.snapToIndex(0)}
            label="What country do you live in?"
            placeholder="Select country"
            editable={false}
            numberOfLines={1}
            icon={<MaterialCommunityIcons name="arrow-right" size={30} />}
          />
          {isCountrySelectedUnitedStates && (
            <TextField
              value={state}
              onPress={() => sheetRefState.current?.snapToIndex(0)}
              label="Which state do you live in?"
              placeholder="Select state"
              editable={false}
              numberOfLines={1}
              icon={<MaterialCommunityIcons name="arrow-right" size={30} />}
            />
          )}
        </View>

        <View style={styles.buttonContainer}>
          <Button
            title="Continue"
            onPress={() => push(SCREENS.AUTH_HOME)}
            disabled={!country}
          />
        </View>

        <BottomSheet
          enablePanDownToClose
          index={-1}
          handleIndicatorStyle={styles.indicatorBottomSheet}
          ref={sheetRefCountry}
          snapPoints={snapPoints}
          style={styles.bottomSheet}
        >
          <TextField
            placeholder="Search"
            onChangeText={setSearchedCountry}
            value={searchedCountry}
          />
          <BottomSheetFlatList
            focusHook={useFocusEffect}
            data={filterCountriesByText(searchedCountry)}
            keyExtractor={i => i.name.official}
            style={{ marginVertical: 32 }}
            ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
            renderItem={({ item }) => {
              const countryName = item.name.common
              return (
                <TouchableOpacity
                  style={styles.itemListButtonContainer}
                  key={countryName}
                  onPress={() => {
                    handleSelectedCountry(countryName)
                    sheetRefCountry.current?.close()
                    setSearchedCountry('')
                  }}
                >
                  <View style={styles.itemListContainer}>
                    <Text>{item.flag}</Text>
                  </View>

                  <Text numberOfLines={1} style={styles.itemListText}>
                    {countryName}
                  </Text>
                </TouchableOpacity>
              )
            }}
          />
        </BottomSheet>

        <BottomSheet
          enablePanDownToClose
          index={-1}
          handleIndicatorStyle={styles.indicatorBottomSheet}
          ref={sheetRefState}
          snapPoints={snapPoints}
          style={styles.bottomSheet}
        >
          <TextField
            placeholder="Search"
            onChangeText={setSearchedState}
            value={searchedState}
          />
          <BottomSheetFlatList
            focusHook={useFocusEffect}
            data={filterStatesByText(searchedState)}
            keyExtractor={i => i.name}
            style={{ marginVertical: 32 }}
            ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
            renderItem={({ item }) => {
              const countryName = item.name
              return (
                <TouchableOpacity
                  style={styles.itemListButtonContainer}
                  key={countryName}
                  onPress={() => {
                    handleSelectedState(item.name)
                    sheetRefState.current?.close()
                    setSearchedState('')
                  }}
                >
                  <Text numberOfLines={1} style={styles.itemListText}>
                    {countryName}
                  </Text>
                </TouchableOpacity>
              )
            }}
          />
        </BottomSheet>
      </View>
    </TouchableWithoutFeedback>
  )
}
export default NewAccountScreen
