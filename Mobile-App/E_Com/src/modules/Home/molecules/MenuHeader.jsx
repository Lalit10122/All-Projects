import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import Animated, { interpolate, useAnimatedStyle } from 'react-native-reanimated'
import { menuData } from '@utils/db'
import MenuItem from '../atoms/MenuItem'
import Icon from '@components/atoms/icon'
import { RFValue } from 'react-native-responsive-fontsize'
import { Colors } from '@utils/Constants'


const MenuHeader = ({scrollY}) => {

  const [foucesedIndex , setFocusedIndex] =useState(0)

  const opacityFadingStyle = useAnimatedStyle(()=>{
    const opacity = interpolate(scrollY.value, [0, 80], [1, 0])
    return {opacity }
  })
  return (
  <Animated.View style={[styles.container , opacityFadingStyle]}  >
    <SafeAreaView/>
    <View style={styles.flexRow}>
      {menuData.map((item, index)=>(
        <MenuItem 
          key={index}
          item={item}
          isFocused={foucesedIndex === index}
          onSelect={()=> setFocusedIndex(index)}
        
        />
      ))}
    </View>

    <View style={styles.addressContainer}>
      <Icon size={16} name='home' iconFamily='Ionicons' />
      <Text style={styles.homeText}>Home</Text>
      <Text numberOfLines={1} style={styles.addressText}>Random address</Text>
      <Icon size={16} name='chevron-forward-sharp' iconFamily='Ionicons'/>
    </View>
  </Animated.View>
  )
}

export default MenuHeader

const styles = StyleSheet.create({
  container:{
    padding:10
  },
  flexRow:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    marginVertical:5
  },
  addressContainer:{
    flexDirection:'row',
    alignItems:'center',
    marginVertical:5
  },
  homeText:{
    marginHorizontal:5,
    fontWeight:'bold',
    color:Colors.text,
    fontSize:RFValue(12)
  },
  addressText:{
    flex:1,
    fontSize:RFValue(9),
    color:Colors.text
  }
})