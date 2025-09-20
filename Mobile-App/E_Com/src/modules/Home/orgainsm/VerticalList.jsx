import { FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { FONTS, screenWidth } from '@utils/Constants'
import { RFValue } from 'react-native-responsive-fontsize'
import Icon from '@components/atoms/icon'
import { navigate } from '@navigation/NavigationUtil'
import { LinearGradient } from 'expo-linear-gradient'

const VerticalList = ({ data }) => {
  const renderItem = ({ item }) => (
    <Pressable 
      style={styles.itemContainer} 
      onPress={() => navigate('Categories')}
    >
      <View style={styles.imageWrapper}>
        <Image source={{ uri: item.image_uri }} style={styles.image} />
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.1)']}
          style={styles.imageGradient}
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.productText} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={styles.subTitle} numberOfLines={1}>
          {item.subTitle}
        </Text>
      </View>
    </Pressable>
  )

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[data.bgColor || '#F3F4F6', '#FFFFFF']}
        style={styles.backgroundGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />
      
      <View style={styles.headerContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.headingText}>
            {data.title}
          </Text>
          <View style={styles.titleUnderline} />
        </View>
        
        <Pressable 
          style={[styles.button, { backgroundColor: data.btnColor || '#FF6B6B' }]}
        >
          <Text style={styles.buttonText}>
            Explore More
          </Text>
          <Icon size={16} name='arrow-forward-sharp' iconFamily='Ionicons' color='white'/>
        </Pressable>
      </View>

      <FlatList
        data={data.data}
        numColumns={2}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
        columnWrapperStyle={styles.row}
      />
    </View>
  )
}

export default VerticalList

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    position: 'relative',
  },
  backgroundGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
  },
  headerContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleContainer: {
    flex: 1,
  },
  headingText: {
    fontSize: RFValue(20),
    fontFamily: FONTS.heading,
    color: '#1F2937',
    fontWeight: 'bold',
    marginBottom: 4,
  },
  titleUnderline: {
    width: 40,
    height: 3,
    backgroundColor: '#FF6B6B',
    borderRadius: 2,
  },
  button: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    gap: 6,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  buttonText: {
    fontWeight: '600',
    fontSize: RFValue(12),
    color: '#fff',
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  row: {
    justifyContent: 'space-between',
  },
  itemContainer: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    overflow: 'hidden',
  },
  imageWrapper: {
    position: 'relative',
    height: 120,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  imageGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '30%',
  },
  textContainer: {
    padding: 12,
  },
  productText: {
    fontSize: RFValue(14),
    fontFamily: FONTS.heading,
    color: '#374151',
    fontWeight: '600',
    marginBottom: 4,
    lineHeight: RFValue(18),
  },
  subTitle: {
    fontSize: RFValue(12),
    fontWeight: '500',
    color: '#6B7280',
  },
})