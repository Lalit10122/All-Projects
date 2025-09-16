import { StyleSheet, Text, TouchableOpacity, View ,Image} from 'react-native'
import React from 'react'
import { RFValue } from 'react-native-responsive-fontsize'

const MenuItem = ({item,isFocused,onSelect}) => {
  return (
    <TouchableOpacity style={[styles.conatiner , isFocused && styles.focused]}
      onPress={onSelect}
    >
      <Image source={item.iconUri} style={styles.icon} />
      <Text style={[styles.text,isFocused?styles.textFocused:styles.textUnfocused]}>
        {item.name}
      </Text>
    </TouchableOpacity>
  )
}

export default MenuItem

const styles = StyleSheet.create({
  conatiner:{
    padding:5,
    width:"23%",
    justifyContent:'center',
    alignItems:'center',
    borderRadius:12,
    backgroundColor:'#f0f0f0'
  },
  focused:{
    backgroundColor:'black'
  },
  icon:{
    width:RFValue(18),
    height:RFValue(18),
    marginVertical:4
  
  },
  text:{
    fontSize:RFValue(10),
    fontStyle:'italic',
    fontWeight:'bold'
  },
  textFocused:{
    color:'white',
  },
  textUnfocused:{
    color:'black'
  }

})