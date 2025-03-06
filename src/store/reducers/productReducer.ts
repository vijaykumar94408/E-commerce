import { ProductActionTypes, FETCH_PRODUCTS_SUCCESS } from '../actions/productActions';
import { Product } from '../../types';

export interface ProductState {
  products: Product[];
}

const initialState: ProductState = {
  products: [],
};

const productReducer = (state = initialState, action: ProductActionTypes): ProductState => {
  switch (action.type) {
    case FETCH_PRODUCTS_SUCCESS:
      return { ...state, products: action.payload };
    default:
      return state;
  }
};

export default productReducer;
