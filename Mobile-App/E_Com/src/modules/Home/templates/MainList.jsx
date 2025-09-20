import { ActivityIndicator, FlatList, Platform, RefreshControl, StyleSheet, Text, View } from 'react-native'
import React, { useRef, useState } from 'react'
import { dynamicDashboardData as fullData } from "@utils/db"
import AdCarousal from '../orgainsm/AdCarousal'
import Categories from '../orgainsm/Categories'
import Sponser from '../orgainsm/Sponser'
import VerticalList from '../orgainsm/VerticalList'
import HorizontalList from '../orgainsm/HorizontalList'
import AnimatedHorizontalList from '../orgainsm/AnimatedHorizontalList'



const PAGE_SIZE = 4
const MainList = ({ scrollYGlobal }) => {
  const [isRefreashing, setIsRefreshing] = useState(false)
  const [data, setData] = useState(fullData.slice(0, PAGE_SIZE))
  const [currentPage, setCurrentPage] = useState(1)
  const [isLoadingMore, setIsLoadingMore] = useState(false)

  const prevScrollY = useRef(0)
  const flatlistRef = useRef(null)

  ///
  const handleScroll = (event) => {
    const currentScrollY = event.nativeEvent.contentOffset.y
    scrollYGlobal.value = currentScrollY
    prevScrollY.current = currentScrollY
  }

  const handleRefersh = () => {
    setIsRefreshing(true)
    setTimeout(() => {
      setCurrentPage(1)
      setData(fullData.slice(0, PAGE_SIZE))
      setIsRefreshing(false)
    }, 3000)
  }

  const handleLoadMore = () => {
    if (isLoadingMore) return;
    if (data.length >= fullData.length) return;

    setIsLoadingMore(true)
    setTimeout(() => {
      const nextPage = currentPage + 1
      const newItems = fullData.slice(0, nextPage * PAGE_SIZE)
      setData(newItems)
      setCurrentPage(nextPage)
      setIsLoadingMore(false)
    }, 4000);
  }

  const SectionComponents = {
    ad_carousal: AdCarousal,
    categories: Categories,
    sponser: Sponser,
    vertical_list: VerticalList,
    horizontal_list: HorizontalList,
    animated_horizontal_list: AnimatedHorizontalList,
  }
  
    // horizontal_list: HorizontalList,
    // vertical_list: VerticalList,
    // animated_horizontal_list: AnimatedHorizontalList,
  

  const renderItem = ({ item }) => {
    const Component = SectionComponents[item.type]
    return Component ? <Component data={item} /> : null
  }
  return (
    <FlatList
      data={data}
      refreshControl={
        <RefreshControl
          refreshing={isRefreashing}
          onRefresh={handleRefersh}
        />
      }
      overScrollMode='always'
      onScroll={handleScroll}
      ref={flatlistRef}
      scrollEventThrottle={16}
      renderItem={renderItem}
      onEndReached={handleLoadMore}
      onEndReachedThreshold={0.5}
      nestedScrollEnabled={true}
      contentContainerStyle={{ paddingBottom: Platform.OS === 'android' ? 200 : 300 }}
      showsVerticalScrollIndicator={false}
      keyExtractor={(item, index) => index.toString()}
      ListFooterComponent={isLoadingMore ? (
        <ActivityIndicator size='small' color='#888' style={{ alignSelf: 'center', margin: 15 }} />
      ) : null}

    />

  )
}

export default MainList

const styles = StyleSheet.create({})