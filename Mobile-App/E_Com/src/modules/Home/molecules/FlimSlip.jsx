import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { RFValue } from 'react-native-responsive-fontsize'
import AutoScroll from '@homielab/react-native-auto-scroll';
import { slipData } from '@utils/db'
import Icon from '@components/atoms/icon'
import { LinearGradient } from 'expo-linear-gradient'

const FlimSlip = () => {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#FF6B6B', '#FF8E8E', '#FF6B6B']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.gradientBackground}
      >
        <AutoScroll
          styles={styles.scrollContainer}
          endPaddingWidth={0}
          duration={12000}
        >
          <View style={styles.contentContainer}>
            {slipData.map((item, index) => (
              <View key={index} style={styles.slipItem}>
                <View style={styles.iconContainer}>
                  <Icon 
                    name='star-four-points' 
                    iconFamily='MaterialCommunityIcons' 
                    color='#FFD700' 
                    size={16}
                  />
                </View>
                <Text style={styles.slipText}>
                  {item}
                </Text>
                <View style={styles.separator} />
              </View>
            ))}
          </View>
        </AutoScroll>
      </LinearGradient>
    </View>
  )
}

export default FlimSlip

const styles = StyleSheet.create({
  container: {
    height: 50,
    width: '100%',
    marginBottom: 8,
    borderRadius: 0,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  gradientBackground: {
    flex: 1,
    justifyContent: 'center',
  },
  scrollContainer: {
    height: 50,
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    paddingHorizontal: 20,
  },
  slipItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 30,
    paddingVertical: 8,
  },
  iconContainer: {
    marginRight: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 12,
    padding: 4,
  },
  slipText: {
    fontSize: RFValue(13),
    fontWeight: '600',
    color: '#fff',
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
    letterSpacing: 0.5,
  },
  separator: {
    width: 1,
    height: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    marginLeft: 15,
  },
})