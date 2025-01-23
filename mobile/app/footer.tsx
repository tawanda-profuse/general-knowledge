import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

const Footer = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.footerText}>
        &copy;Quiz App. designed by{' '}
        <Link
          href='https://tawanda-dev.netlify.app'
          target='_blank'
          rel='noreferrer'
          style={styles.link}
        >
          Tawanda
        </Link>
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    backgroundColor: 'tomato',
    width: '100%',
    fontFamily: 'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif',
    paddingVertical: 5,
  },
  footerText: {
    wordWrap: 'wrap',
    color: 'white',
    textTransform: 'capitalize',
    textAlign: 'center'
  },
  link: {
    textTransform: 'uppercase',
    color: 'green',
    fontWeight: 'bold'
  }
})

export default Footer
