import { GET_HOME_CONTENT } from "./constant"


export const getHomeContent =(page)=>{
  return{
    type:GET_HOME_CONTENT,
    payload:{
      page:page
    }
  }
}