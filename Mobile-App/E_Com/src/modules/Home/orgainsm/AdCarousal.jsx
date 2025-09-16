import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { screenWidth } from '@utils/Constants'
import Carosal from 'react-native-reanimated';
import FlimSlip from '../molecules/FlimSlip';

const AdCarousal = ({data}) => {

  const [active,setActive] = useState(0)
  const baseOptions ={
    vertical: false,
    width:screenWidth,
    height:screenWidth*0.8

  }


  return (
    <View>
     <FlimSlip/>
    </View>
  )
}

export default AdCarousal

const styles = StyleSheet.create({})