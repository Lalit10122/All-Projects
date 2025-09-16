import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { RFValue } from 'react-native-responsive-fontsize'
import AutoScroll from '@homielab/react-native-auto-scroll';
import { slipData } from '@utils/db'
import Icon from '@components/atoms/icon'


const FlimSlip = () => {
  return (
    <AutoScroll
      styles={styles.container}
      endPaddingWidth={0}
      duration={14000}>
        
        <View style={styles.gridcontainer}>
          {slipData.map((item, index) => (
            <View key={index} style={styles.gridItem}>
              <Text style={styles.gridText}>
                {"    "}{item}
              </Text>

              <Text style={styles.gridTextStar}>
              {"    "}
              </Text>
              <Icon name='star-four-points' iconFamily='MaterialCommunityIcons' color='white' size={18}/>
            </View>
          ))}
        </View>

    </AutoScroll>
  )
}

export default FlimSlip

const styles = StyleSheet.create({
  container: {
    height: 40,
    width: '100%'

  },
  gridcontainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  gridItem: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    flexDirection: 'row',
  },
  gridText: {
    fontSize: RFValue(12),
    fontWeight: '500',
    textAlign: 'center',
    color: 'white'
  },
  gridTextStar: {
    fontSize: RFValue(12),
    color: '#999',
    fontWeight: 'bold',
    textAlign: 'center'
  }
})