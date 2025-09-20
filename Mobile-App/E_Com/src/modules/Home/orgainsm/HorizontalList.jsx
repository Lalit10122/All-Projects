import { StyleSheet, Text, View, FlatList, Image, Pressable, Dimensions } from 'react-native'
import React from 'react'
import { RFValue } from 'react-native-responsive-fontsize'
import { LinearGradient } from 'expo-linear-gradient'
import Icon from '@components/atoms/icon'
import { navigate } from '@navigation/NavigationUtil'

const { width: screenWidth } = Dimensions.get('window')

const HorizontalList = ({ data }) => {
  const items = data?.data || []

  const renderItem = ({ item, index }) => (
    <Pressable 
      style={styles.itemContainer}
      onPress={() => navigate('Categories')}
    >
      <View style={styles.imageWrapper}>
        <Image 
          source={{ uri: item.image_uri }} 
          style={styles.image} 
        />
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.2)']}
          style={styles.gradientOverlay}
        />
        <View style={styles.badgeContainer}>
          <Icon name="star" iconFamily="AntDesign" color="#FFD700" size={12} />
          <Text style={styles.badgeText}>Hot</Text>
        </View>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.titleText} numberOfLines={2}>
          {data.title || 'Featured Items'}
        </Text>
        <Text style={styles.subtitleText}>
          Best Deals Available
        </Text>
      </View>
    </Pressable>
  )

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.titleSection}>
          <Text style={styles.headerTitle}>
            {data.title || 'Best Deals'}
          </Text>
          <View style={styles.titleUnderline} />
        </View>
        <Pressable style={styles.viewAllButton}>
          <Text style={styles.viewAllText}>View All</Text>
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
      />
    </View>
  )
}

export default HorizontalList

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    marginVertical: 8,
    borderRadius: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    overflow: 'hidden',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
    width: 40,
    height: 3,
    backgroundColor: '#FF6B6B',
    borderRadius: 2,
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    gap: 4,
  },
  viewAllText: {
    fontSize: RFValue(12),
    fontWeight: '600',
    color: '#FF6B6B',
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  separator: {
    width: 16,
  },
  itemContainer: {
    width: screenWidth * 0.4,
    backgroundColor: '#fff',
    borderRadius: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    overflow: 'hidden',
  },
  imageWrapper: {
    position: 'relative',
    height: screenWidth * 0.3,
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
    height: '40%',
  },
  badgeContainer: {
    position: 'absolute',
    top: 8,
    right: 8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 8,
    gap: 2,
  },
  badgeText: {
    fontSize: RFValue(10),
    fontWeight: '600',
    color: '#374151',
  },
  textContainer: {
    padding: 12,
  },
  titleText: {
    fontSize: RFValue(14),
    fontWeight: '600',
    color: '#374151',
    marginBottom: 4,
    lineHeight: RFValue(18),
  },
  subtitleText: {
    fontSize: RFValue(12),
    fontWeight: '500',
    color: '#6B7280',
  },
})