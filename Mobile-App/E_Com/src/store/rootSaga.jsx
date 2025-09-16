import homeSaga from "../modules/Home/api/saga";
import {all, fork} from "redux-saga/effects";



export default function* rootSaga(){
  yield all([
    fork(homeSaga)
  ])
}