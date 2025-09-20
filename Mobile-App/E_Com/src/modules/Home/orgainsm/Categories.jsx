import { FlatList, Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useMemo } from 'react'
import { navigate } from '@navigation/NavigationUtil'
import { Colors, screenWidth } from '@utils/Constants'
import { RFValue } from 'react-native-responsive-fontsize'
import { LinearGradient } from 'expo-linear-gradient'

const Categories = ({ data }) => {
  const items = useMemo(() => {
    if (Array.isArray(data?.data)) return data.data
    if (Array.isArray(data?.items)) return data.items
    if (Array.isArray(data)) return data
    return []
  }, [data])

  const renderItem = ({ item, index }) => {
    const colors = [
      ['#FF6B6B', '#FF8E8E'],
      ['#4ECDC4', '#6EDDD6'],
      ['#45B7D1', '#6BC5D8'],
      ['#96CEB4', '#A8D5BA'],
      ['#FFEAA7', '#FFF0B8'],
      ['#DDA0DD', '#E6B3E6'],
      ['#98D8C8', '#A8E0D0'],
      ['#F7DC6F', '#F9E79F'],
      ['#BB8FCE', '#C5A3D1'],
      ['#85C1E9', '#95C9ED'],
    ]
    
    const gradientColors = colors[index % colors.length]

    return (
      <Pressable 
        onPress={() => navigate("Categories")}
        style={styles.itemContainer}
      >
        <View style={styles.imageWrapper}>
          <Image 
            source={(() => {
              const raw = item?.image_uri ?? item?.image_url ?? item?.image
              if (typeof raw === 'string') return { uri: raw }
              return raw
            })()} 
            style={styles.contentImage} 
          />
          <LinearGradient
            colors={gradientColors}
            style={styles.gradientOverlay}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          />
        </View>
        <Text style={styles.nameText} numberOfLines={2}>
          {item.name}
        </Text>
      </Pressable>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Shop by Category</Text>
        <Text style={styles.headerSubtitle}>Explore our wide range</Text>
      </View>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        <FlatList
          numColumns={Math.ceil(items.length / 2) || 1}
          data={items}
          renderItem={renderItem}
          scrollEnabled={false}
          keyExtractor={(item, index) => (item?.id ?? item?._id ?? index).toString()}
          contentContainerStyle={styles.listContainer}
          style={styles.listContentContainer}
        />
      </ScrollView>
    </View>
  )
}

export default Categories

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    marginVertical: 8,
    paddingVertical: 16,
  },
  headerContainer: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: RFValue(20),
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: RFValue(14),
    color: '#6B7280',
    fontWeight: '400',
  },
  scrollContainer: {
    paddingLeft: 20,
  },
  listContainer: {
    paddingRight: 20,
  },
  listContentContainer: {
    marginVertical: 0,
  },
  itemContainer: {
    marginRight: 16,
    width: screenWidth * 0.22,
    alignItems: 'center',
    marginBottom: 16,
  },
  imageWrapper: {
    position: 'relative',
    width: screenWidth * 0.18,
    height: screenWidth * 0.18,
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginBottom: 8,
  },
  contentImage: {
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
    opacity: 0.3,
  },
  nameText: {
    textAlign: 'center',
    fontWeight: '600',
    color: '#374151',
    fontSize: RFValue(12),
    lineHeight: RFValue(16),
    maxWidth: screenWidth * 0.2,
  },
})