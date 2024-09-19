import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import CustomHeader from './components/CustomHeader'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'

export const unstable_settings = {
    initialRouteName:'App'
}

const _layout = () => {
  return (
    <BottomSheetModalProvider>
        <Stack>
        <Stack.Screen
        name='App'
        options={
            {
                header:() => <CustomHeader/>
            }
        }
        />
        </Stack>
    </BottomSheetModalProvider>
   
  )
}

export default _layout

const styles = StyleSheet.create({})