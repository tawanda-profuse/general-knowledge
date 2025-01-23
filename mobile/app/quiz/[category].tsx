import { View, Text } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'

const quiz = () => {
const {category} = useLocalSearchParams();

  return (
    <View>
      <Text>{category}read</Text>
    </View>
  )
}

export default quiz