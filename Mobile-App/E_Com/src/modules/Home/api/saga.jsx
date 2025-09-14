import { fetchApiData } from "./api";
import { GET_HOME_CONTENT } from "./constant";
import { setData, setError, setLoading } from "./slice";
import {put , call,takeEvery} from 'redux-saga/effects'


function* fetchApiDataSaga(){
  try {
    yield put(setLoading())
    const data = yield call(fetchApiData)
    yield put(setData(data))
  } catch (error) {
    yield put(setError(error.message))
  }
}


function* homeSage(){
  yield takeEvery(GET_HOME_CONTENT,fetchApiDataSaga)
}

export default homeSage