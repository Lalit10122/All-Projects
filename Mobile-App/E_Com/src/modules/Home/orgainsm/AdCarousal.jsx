import { Image, Pressable, StyleSheet, Text, View, Dimensions } from 'react-native'
import React, { useMemo, useState } from 'react'
import { screenWidth } from '@utils/Constants'
import Carousel from 'react-native-reanimated-carousel'
import FlimSlip from '../molecules/FlimSlip'
import { RFValue } from 'react-native-responsive-fontsize'
import { LinearGradient } from 'expo-linear-gradient'

const { width: deviceWidth } = Dimensions.get('window')

const AdCarousal = ({ data }) => {
  const [active, setActive] = useState(0)

  const items = useMemo(() => {
    if (Array.isArray(data?.data)) return data.data
    if (Array.isArray(data)) return data
    return []
  }, [data])

  const baseOptions = {
    vertical: false,
    width: screenWidth,
    height: screenWidth * 0.5,
  }

  return (
    <View style={styles.container}>
      <FlimSlip />
      <View style={styles.carouselContainer}>
        <Carousel
          {...baseOptions}
          loop
          pagingEnabled
          snapEnabled
          autoPlay
          autoPlayInterval={4000}
          onSnapToItem={(index) => setActive(index)}
          data={items}
          renderItem={({ item, index }) => {
            const raw = item?.image_uri ?? item?.image_url ?? item?.image
            const src = typeof raw === 'string' ? { uri: raw } : raw
            return (
              <Pressable key={index} style={styles.imageContainer}>
                <Image
                  source={src}
                  style={styles.img}
                />
                <LinearGradient
                  colors={['transparent', 'rgba(0,0,0,0.3)']}
                  style={styles.gradientOverlay}
                />
                <View style={styles.contentOverlay}>
                  <Text style={styles.offerText}>Special Offer</Text>
                  <Text style={styles.discountText}>Up to 70% OFF</Text>
                </View>
              </Pressable>
            )
          }}
        />
        
        {active != null && items.length > 0 && (
          <View style={styles.dotsContainer}>
            {items.map((_, index) => (
              <Pressable
                key={`dot-${index}`}
                style={[
                  styles.dot,
                  active === index ? styles.dotActive : styles.dotInactive
                ]}
                onPress={() => setActive(index)}
              />
            ))}
          </View>
        )}
      </View>
    </View>
  )
}

export default AdCarousal

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    marginBottom: 8,
  },
  carouselContainer: {
    position: 'relative',
  },
  imageContainer: {
    width: '100%',
    height: '100%',
    borderRadius: 16,
    marginHorizontal: 16,
    overflow: 'hidden',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  img: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  gradientOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '50%',
  },
  contentOverlay: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  offerText: {
    fontSize: RFValue(12),
    color: '#fff',
    fontWeight: '500',
    marginBottom: 4,
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  discountText: {
    fontSize: RFValue(18),
    color: '#fff',
    fontWeight: 'bold',
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 8,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 6,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  dotActive: {
    backgroundColor: '#FF6B6B',
    borderColor: '#FF6B6B',
    transform: [{ scale: 1.2 }],
  },
  dotInactive: {
    backgroundColor: '#E5E7EB',
    borderColor: '#D1D5DB',
  },
})