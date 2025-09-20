import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useMemo } from 'react'
import { screenWidth } from '@utils/Constants'
import { RFValue } from 'react-native-responsive-fontsize'
import { LinearGradient } from 'expo-linear-gradient'
import Icon from '@components/atoms/icon'

const Sponser = ({ data }) => {
  const items = useMemo(() => {
    if (Array.isArray(data?.data)) return data.data
    if (Array.isArray(data)) return data
    return []
  }, [data])

  const raw = items?.[0]?.image_uri ?? items?.[0]?.image_url ?? items?.[0]?.image
  const src = typeof raw === 'string' ? { uri: raw } : raw

  if (!src) return null

  return (
    <Pressable style={styles.container}>
      <View style={styles.imageContainer}>
        <Image style={styles.img} source={src} />
        <LinearGradient
          colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.3)']}
          style={styles.gradientOverlay}
        />
        <View style={styles.contentOverlay}>
          <View style={styles.badgeContainer}>
            <Icon name="star" iconFamily="AntDesign" color="#FFD700" size={16} />
            <Text style={styles.badgeText}>Sponsored</Text>
          </View>
          <Text style={styles.offerText}>Limited Time Offer</Text>
        </View>
      </View>
    </Pressable>
  )
}

export default Sponser

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 16,
    marginVertical: 8,
  },
  imageContainer: {
    width: '100%',
    height: screenWidth * 0.25,
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    position: 'relative',
  },
  img: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  gradientOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  contentOverlay: {
    position: 'absolute',
    top: 12,
    right: 12,
    alignItems: 'flex-end',
  },
  badgeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 8,
  },
  badgeText: {
    fontSize: RFValue(10),
    fontWeight: '600',
    color: '#374151',
    marginLeft: 4,
  },
  offerText: {
    fontSize: RFValue(12),
    fontWeight: 'bold',
    color: '#fff',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
})