import { Image, Pressable, SafeAreaView, StyleSheet, Text, View, Animated, Easing } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { RFValue } from 'react-native-responsive-fontsize'
import { Colors } from '@utils/Constants'
import Icon from '@components/atoms/icon'
import { searchItems } from '@utils/db'

const RollingContent = ({ children, interval = 3000, defaultStyle = true, customStyle }) => {
  const items = React.Children.toArray(children)
  const [currentIndex, setCurrentIndex] = useState(0)
  const opacity = useRef(new Animated.Value(1)).current

  useEffect(() => {
    if (!items || items.length === 0) return

    const tick = () => {
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0,
          duration: 200,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
      ]).start(() => {
        setCurrentIndex(prev => (prev + 1) % items.length)
        Animated.timing(opacity, {
          toValue: 1,
          duration: 250,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }).start()
      })
    }

    const id = setInterval(tick, interval)
    return () => clearInterval(id)
  }, [interval, items, opacity])

  if (!items || items.length === 0) {
    return null
  }

  const containerStyle = [defaultStyle ? rollingStyles.container : null, customStyle]

  return (
    <Animated.View style={[...containerStyle, { opacity }]}>
      {items[currentIndex]}
    </Animated.View>
  )
}

const rollingStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
})

const SearchBar = () => {

  const [isOn, setIsOn] = useState(false)

  const toggleSwitch = () => {
    setIsOn(!isOn)
  }

  return (
   <>
   <SafeAreaView/>
    <View style={styles.container}>
      <Pressable style={styles.toggleContainer} onPress={toggleSwitch}>
        <Text style={styles.brandText}>
          Brand Mall
        </Text>
        <Image
          source={isOn? require('@assets/icons/switch_on.png') : require('@assets/icons/switch_off.png')}
          style={styles.switchIcon}
        />
      </Pressable>
      <Pressable style={styles.searchContainer}>
          <Icon
            name='search' iconFamily='Ionicons' size={20} color='black'
          />

          <RollingContent interval={3000} defaultStyle={false} customStyle={styles.textContainer}>
            {searchItems?.map((item, index) =>{
              return(
                <Text key={index}  style={{fontSize:RFValue(14),color:Colors.text}}>
                  {item}
                </Text>
              )
            })}
          </RollingContent>
      </Pressable>
    </View>
   </>
  )
}

export default SearchBar

const styles = StyleSheet.create({
  container:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    paddingHorizontal:10,
    paddingVertical:10
  },
  toggleContainer:{
    width:'16%',
    justifyContent:'center',
    alignItems:'center'
  },
  brandText:{
    fontWeight:'700',
    fontSize:RFValue(8),
    color:Colors.text
  },
  switchIcon:{
    width:'100%',
    height:30,
    marginTop:4,
    resizeMode:'contain'
    
  },
  textContainer:{
    flex:1,
    height:40,
    color:"black",
    marginLeft:5,
    justifyContent:'center',
  },
  searchContainer:{
    flexDirection:'row',
    alignContent:'center',
    alignItems:'center',
    width:'80%',
    backgroundColor:'#fafafa',
    borderWidth:2,
    borderColor:'#ccc',
    paddingHorizontal:10,
    paddingVertical:5,
    borderRadius:15
  }
})