import { useFonts } from 'expo-font'
import { Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { StatusBar } from 'expo-status-bar'
import { useEffect } from 'react'
import { Appearance } from 'react-native'

import { Colors } from '@/constants/Colors'

import Sidebar from './sidebar'
import React from 'react'
import Footer from './footer'

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

export default function RootLayout () {
  const colorScheme = Appearance.getColorScheme()
  const theme = colorScheme === 'dark' ? Colors.dark : Colors.light
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf')
  })

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync()
    }
  }, [loaded])

  if (!loaded) {
    return null
  }

  return (
    <>
      <Sidebar />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: theme.headerBackground },
          headerShown: false,
          headerTintColor: theme.text
        }}
      >
        <Stack.Screen name='index' options={{ title: 'Home' }} />
        <Stack.Screen name='create' options={{ title: 'Create' }} />
        <Stack.Screen name='quiz/[category]' options={{ title: 'Quiz' }} />
        <Stack.Screen name='+not-found' />
      </Stack>
      <Footer/>
      <StatusBar style='auto' />
    </>
  )
}
