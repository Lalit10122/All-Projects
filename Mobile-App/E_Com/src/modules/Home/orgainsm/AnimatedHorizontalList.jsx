import { StyleSheet, Text, View, FlatList, Image, Pressable, Dimensions, Animated } from 'react-native'
import React, { useRef, useEffect } from 'react'
import { RFValue } from 'react-native-responsive-fontsize'
import { LinearGradient } from 'expo-linear-gradient'
import Icon from '@components/atoms/icon'
import { navigate } from '@navigation/NavigationUtil'

const { width: screenWidth } = Dimensions.get('window')

const AnimatedHorizontalList = ({ data }) => {
  const items = data?.data || []
  const scrollX = useRef(new Animated.Value(0)).current
  const fadeAnim = useRef(new Animated.Value(0)).current

  useEffect(() => {
    // Fade in animation
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start()
  }, [])

  const renderItem = ({ item, index }) => {
    const inputRange = [
      (index - 1) * screenWidth * 0.45,
      index * screenWidth * 0.45,
      (index + 1) * screenWidth * 0.45,
    ]

    const scale = scrollX.interpolate({
      inputRange,
      outputRange: [0.8, 1, 0.8],
      extrapolate: 'clamp',
    })

    const opacity = scrollX.interpolate({
      inputRange,
      outputRange: [0.6, 1, 0.6],
      extrapolate: 'clamp',
    })

    return (
      <Animated.View
        style={[
          styles.itemContainer,
          {
            transform: [{ scale }],
            opacity,
          },
        ]}
      >
        <Pressable 
          style={styles.pressableContainer}
          onPress={() => navigate('Categories')}
        >
          <View style={styles.imageWrapper}>
            <Image 
              source={{ uri: item.image_uri }} 
              style={styles.image} 
            />
            <LinearGradient
              colors={['transparent', 'rgba(0,0,0,0.3)']}
              style={styles.gradientOverlay}
            />
            <View style={styles.badgeContainer}>
              <Icon name="flash" iconFamily="Ionicons" color="#FFD700" size={12} />
              <Text style={styles.badgeText}>Trending</Text>
            </View>
            <View style={styles.priceContainer}>
              <Text style={styles.priceText}>$99</Text>
            </View>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.titleText} numberOfLines={2}>
              {data.title || 'Trending Now'}
            </Text>
            <Text style={styles.subtitleText}>
              Limited Time Offer
            </Text>
          </View>
        </Pressable>
      </Animated.View>
    )
  }

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <View style={styles.headerContainer}>
        <View style={styles.titleSection}>
          <Text style={styles.headerTitle}>
            {data.title || 'TOP PICKS GEN-Z'}
          </Text>
          <View style={styles.titleUnderline} />
          <Text style={styles.headerSubtitle}>
            Trending products for you
          </Text>
        </View>
        <Pressable style={styles.viewAllButton}>
          <Text style={styles.viewAllText}>Explore</Text>
          <Icon name="arrow-forward" iconFamily="Ionicons" color="#FF6B6B" size={16} />
        </Pressable>
      </View>

      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={(item, index) => String(item.id || index)}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
        decelerationRate="fast"
        snapToInterval={screenWidth * 0.45 + 16}
        snapToAlignment="start"
      />
    </Animated.View>
  )
}

export default AnimatedHorizontalList

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    marginVertical: 8,
    borderRadius: 20,
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    overflow: 'hidden',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
  },
  titleSection: {
    flex: 1,
  },
  headerTitle: {
    fontSize: RFValue(20),
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  titleUnderline: {
    width: 50,
    height: 3,
    backgroundColor: '#FF6B6B',
    borderRadius: 2,
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: RFValue(12),
    color: '#6B7280',
    fontWeight: '500',
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF6B6B',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 4,
    elevation: 2,
    shadowColor: '#FF6B6B',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  viewAllText: {
    fontSize: RFValue(12),
    fontWeight: '600',
    color: '#fff',
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  separator: {
    width: 16,
  },
  itemContainer: {
    width: screenWidth * 0.45,
    backgroundColor: '#fff',
    borderRadius: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    overflow: 'hidden',
  },
  pressableContainer: {
    flex: 1,
  },
  imageWrapper: {
    position: 'relative',
    height: screenWidth * 0.35,
  },
  image: {
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
  badgeContainer: {
    position: 'absolute',
    top: 12,
    left: 12,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  badgeText: {
    fontSize: RFValue(10),
    fontWeight: '700',
    color: '#374151',
  },
  priceContainer: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  priceText: {
    fontSize: RFValue(12),
    fontWeight: 'bold',
    color: '#fff',
  },
  textContainer: {
    padding: 16,
  },
  titleText: {
    fontSize: RFValue(15),
    fontWeight: '700',
    color: '#374151',
    marginBottom: 6,
    lineHeight: RFValue(20),
  },
  subtitleText: {
    fontSize: RFValue(12),
    fontWeight: '500',
    color: '#6B7280',
  },
})