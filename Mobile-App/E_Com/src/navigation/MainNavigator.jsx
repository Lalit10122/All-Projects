import { Platform, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Colors } from '@utils/Constants';
// import Home from 'src/modules/Home';
// import Cart from 'src/modules/cart';
// import Categories from 'src/modules/categories';
// import Account from 'src/modules/account';
import { Accounticon, Carticon, Categoriesicon, Homeicon } from './TabIcons';
import Home from '@modules/Home';
import Categories from '@modules/categories';
import Account from '@modules/account';
import Cart from '@modules/cart';

const Tab = createBottomTabNavigator();

const MainNavigator = () => {

  const count =2;
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: Colors.active,
        tabBarInactiveTintColor: Colors.inactive,
        lazy: true,
        tabBarStyle: {
          paddingTop: Platform.OS === 'android' ? 0 : 10,
        },
      }}
    >
      <Tab.Screen name="Home" component={Home} options={{
        tabBarIcon:({focused,color,size})=>(
          <Homeicon focused={focused} color={color} size={size} />
        )
      }} />
      <Tab.Screen name="Categories" component={Categories} options={{
        tabBarIcon:({focused,color,size})=>(
          <Categoriesicon focused={focused} color={color} size={size} />
        )
      }}/>
      <Tab.Screen name="Account" component={Account} options={{
        tabBarIcon:({focused,color,size})=>(
          <Accounticon focused={focused} color={color} size={size} />
        )
      }} />
      <Tab.Screen name="Cart" component={Cart} options={{
        tabBarIcon:({focused,color,size})=>(
          <Carticon focused={focused} color={color} size={size} />
        ),
        tabBarBadge:count>0?count:undefined,
        tabBarBadgeStyle:{
          height:16,
          width:16
        }
      }} />
    </Tab.Navigator>
  );
};

export default MainNavigator;

const styles = StyleSheet.create({});
