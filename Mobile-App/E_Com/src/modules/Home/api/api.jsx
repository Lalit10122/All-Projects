import axios from 'axios'


export const fetchApiData = async ()=>{
  const resoponse = await axios.get('https://jsonplaceholder.typicode.com/posts/1')

  return resoponse.data
}