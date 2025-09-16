import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import {Provider} from 'react-redux'
import {PersistGate} from 'redux-persist/integration/react'
import Navigation from '@navigation/Navigation'
import { store, persistor } from './src/store/store'

const App = () => {
  return (
   <Provider store={store}>
     <PersistGate loading={null} persistor={persistor}>
       <SafeAreaProvider>
        <Navigation/>
      </SafeAreaProvider>
     </PersistGate>
   </Provider>
  )
}

export default App
