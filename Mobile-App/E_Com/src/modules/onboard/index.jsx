import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { Colors, screenHeight, screenWidth } from '@utils/Constants'
import { resetAndNavigate } from '@navigation/NavigationUtil'

const Splash = () => {
  useEffect(()=>{
    const timeoutId = setTimeout(() => {
      resetAndNavigate("MainNavigator")
    }, 1000);
    return ()=> clearTimeout(timeoutId)
  },[])
  return (
    <View style={styles.container}>
      <Image
        source={require('@assets/images/logo_t.png')}
        style={styles.image}
      />
    </View>
  )
}

export default Splash

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:Colors.primary

  },
  image:{
    width:screenWidth * 0.35,
    height:screenHeight * 0.35,
    resizeMode:'contain'
  }
})