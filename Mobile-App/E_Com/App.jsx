import { Button, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { decrement, increment, incrementByAmmount } from './src/redux/features/counterSlice'

const App = () => {
  const [data,setData] = useState('')
  const dispatch = useDispatch()// send the data into store
  const count = useSelector((state)=> state.counter.value);// get the data
  return (
    
    <View style={{justifyContent:'center',alignItems:'center',marginTop:100,gap:20}}>
      <TextInput placeholder='Enter value' onChangeText={(val)=>setData(val)} style={{borderWidth:1}}/>
     <Button title='Increment' onPress={()=>dispatch(increment())}/>
    <Button title='Decrement' onPress={()=>dispatch(decrement())}/>
      <Button title='Change By value' onPress={()=>dispatch(incrementByAmmount(data))}/>
    <Text>
      {count}
    </Text>
    
    </View>
  )
}

export default App

const styles = StyleSheet.create({})