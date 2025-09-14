import {MMKV} from 'react-native-mmkv'

const storage = new MMKV()


const reduxStorage ={
  setItem:(key , val)=>{
    storage.set(key,val)
    return Promise.resolve(true)
  },
  getItem:(key )=>{
    const value=storage.getString(key)
    return Promise.resolve(value)
  },
  removeItem:(key)=>{
    storage.delete(key,val)
    return Promise.resolve()
  },
  
}

export default reduxStorage