import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { 
  fetchProductsStart, 
  fetchProductsSuccess, 
  fetchProductsFailure,
  fetchCategoriesSuccess 
} from '../slices/productSlice';

function* fetchProducts(): Generator<any, void, any> {
  try {
    const response = yield call(axios.get, 'https://fakestoreapi.com/products');
    yield put(fetchProductsSuccess(response.data));
    
    const categoriesResponse = yield call(axios.get, 'https://fakestoreapi.com/products/categories');
    yield put(fetchCategoriesSuccess(categoriesResponse.data));
  } catch (error) {
    if (error instanceof Error) {
      yield put(fetchProductsFailure(error.message));
    } else {
      yield put(fetchProductsFailure('An unknown error occurred'));
    }
  }
}

export function* watchProductSaga(): Generator<any, void, any> {
  yield takeLatest(fetchProductsStart.type, fetchProducts);
}
