import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'


const Icon = ({color , size ,name , iconFamily }) => {
  return (
    <>
    {iconFamily === 'Ionicons' && <Ionicons name={name} size={size} color={color}/>}
    
    {iconFamily === 'MaterialCommunityIcons' && <MaterialCommunityIcons name={name} size={size} color={color}/>}

    {iconFamily === 'MaterialIcons' && <MaterialIcons name={name} size={size} color={color}/>}
    
    </>
  )
}

export default Icon

const styles = StyleSheet.create({})