import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView
} from 'react-native'
import axios from 'axios'
import { Link } from 'expo-router'
import Toast from 'react-native-toast-message'

const Sidebar = () => {
  const apiUrl = __DEV__
    ? 'http://localhost:8000'
    : 'https://general-knowledge-eta.vercel.app'
  const [sideMenu, setSideMenu] = useState(false)
  const [categories, setCategories] = useState<{ category: string }[]>([])
  const [isLoading, setIsLoading] = useState(true)

  type CategoryType = {
    category: any
  }

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${apiUrl}/categories`)
        setCategories(response.data.categories)
      } catch (error: any) {
        console.error('Error: ', error)
        Toast.show({ type: 'error', text1: 'Error fetching quiz categories' })
        // You can use a Toast library like `react-native-toast-message` for notifications
        console.log(error.response?.data?.message || error.message)
      } finally {
        setIsLoading(false)
      }
    }

    fetchCategories()
  }, [sideMenu, categories])

  return (
    <>
      {!sideMenu && (
        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => setSideMenu(true)}
          accessibilityLabel='Open menu'
        >
          <Image
            source={require('../assets/images/menu_white_48dp.svg')}
            style={styles.icon}
          />
        </TouchableOpacity>
      )}

      {sideMenu && (
        <View style={styles.sidebar}>
          <TouchableOpacity
            style={styles.homeButton}
            onPress={() => {
              setSideMenu(false)
            }}
            accessibilityLabel='Go to home'
          >
            <Link href='/'>
              <Image
                source={require('../assets/images/house.svg')}
                style={styles.icon}
              />
            </Link>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setSideMenu(false)}
            accessibilityLabel='Close menu'
          >
            <Image
              source={require('../assets/images/close_white_24dp.svg')}
              style={styles.icon}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.createButton}
            onPress={() => {
              setSideMenu(false)
            }}
          >
            <Link href='/create' style={styles.createButtonText}>
              <Text>Create Quiz</Text>
            </Link>
          </TouchableOpacity>

          <Text style={styles.heading}>All Quizzes ({categories.length})</Text>

          <ScrollView>
            {isLoading ? (
              [1, 2, 3].map((_, index) => (
                <View key={index} style={styles.loadingItem}></View>
              ))
            ) : categories.length > 0 ? (
              categories.map((category: CategoryType, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.categoryItem}
                  onPress={() => {
                    setSideMenu(false)
                  }}
                >
                  <Link
                    href='/'
                    // href={'/quiz/${category.category}'}
                    style={styles.categoryText}
                  >
                    <Text>{category.category}</Text>
                  </Link>
                </TouchableOpacity>
              ))
            ) : (
              <Text style={styles.createButtonText}>No data available...</Text>
            )}
          </ScrollView>
        </View>
      )}
    </>
  )
}

const styles = StyleSheet.create({
  menuButton: {
    position: 'absolute',
    zIndex: 100,
    backgroundColor: 'green',
    borderRadius: 3,
    left: 40,
    top: 25,
    padding: 10
  },
  sidebar: {
    position: 'absolute',
    zIndex: 1100,
    top: 0,
    left: 0,
    width: '80%',
    height: '100%',
    backgroundColor: 'tomato',
    padding: 20
  },
  homeButton: {
    position: 'absolute',
    left: 10,
    top: 25,
    padding: 10,
    backgroundColor: 'green',
    borderRadius: 3
  },
  closeButton: {
    position: 'absolute',
    right: 10,
    top: 25,
    padding: 10,
    backgroundColor: 'green',
    borderRadius: 3
  },
  createButton: {
    marginTop: 70,
    paddingVertical: 20,
    backgroundColor: 'orange',
    borderRadius: 3
  },
  createButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold'
  },
  heading: {
    marginTop: 20,
    color: 'green',
    textAlign: 'center',
    backgroundColor: 'black',
    padding: 20,
    fontSize: 20
  },
  loadingItem: {
    backgroundColor: '#999',
    height: 50,
    marginVertical: 5,
    borderRadius: 5,
    opacity: 0.6
  },
  categoryItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    marginVertical: 5
  },
  categoryText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 16
  },
  icon: {
    width: 24,
    height: 24,
    resizeMode: 'contain'
  }
})

export default Sidebar
