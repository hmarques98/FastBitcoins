import React, { useCallback, useMemo, useRef, useState } from 'react'
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
import { fonts } from '@fonts'
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

  const sheetRef = useRef<BottomSheet>(null)
  const snapPoints = useMemo(() => ['98%'], [])

  const closeBottomSheet = useCallback(() => {
    sheetRef.current?.close()
  }, [])

  const { filterCountriesByText, isLoadingCountries } = useCountriesService()
  const { country, handleSelectedCountry } = useCountriesState()

  const [searchedCountry, setSearchedCountry] = useState('')

  if (isLoadingCountries) return <></>

  return (
    <TouchableWithoutFeedback
      style={styles.touchableContainer}
      onPress={Keyboard.dismiss}
      accessible={false}
    >
      <View style={styles.container}>
        <View style={{ width: '100%' }}>
          <View
            style={{ width: '100%', alignItems: 'center', marginBottom: 30 }}
          >
            <Text
              style={{
                textAlign: 'center',
                fontFamily: fonts.body,
                color: theme.colors.text,
              }}
            >
              Bacon ipsum dolor amet kielbasa filet mignon biltong hamburger
              tri-tip sirloin.
            </Text>
          </View>

          <TextField
            value={country}
            onPress={() => sheetRef.current?.snapToIndex(0)}
            label="What country do you live in?"
            placeholder="Select country"
            editable={false}
            numberOfLines={1}
            icon={<MaterialCommunityIcons name="arrow-right" size={30} />}
          />
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
          handleIndicatorStyle={{
            width: 82,
            backgroundColor: theme.colors.gray,
          }}
          ref={sheetRef}
          snapPoints={snapPoints}
          style={{
            shadowColor: 'rgba(0, 0, 0, 0.1)',
            shadowOffset: {
              width: 0,
              height: -0.5,
            },
            shadowOpacity: 1,
            shadowRadius: 9,

            elevation: 9,
            paddingHorizontal: 24,
          }}
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
            ItemSeparatorComponent={() => (
              <View
                style={{
                  width: '100%',
                  height: 1,
                  backgroundColor: theme.colors.gray,
                }}
              />
            )}
            renderItem={({ item }) => {
              const countryName = item.name.common
              return (
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    paddingVertical: 14,
                  }}
                  key={countryName}
                  onPress={() => {
                    handleSelectedCountry(countryName)
                    closeBottomSheet()
                  }}
                >
                  <View style={{ marginRight: 12 }}>
                    <Text>{item.flag}</Text>
                  </View>

                  <Text>{countryName}</Text>
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
