import { Product } from '../../types';

export const FETCH_PRODUCTS = 'FETCH_PRODUCTS';
export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';

export interface FetchProductsAction {
  type: typeof FETCH_PRODUCTS;
}

export interface FetchProductsSuccessAction {
  type: typeof FETCH_PRODUCTS_SUCCESS;
  payload: Product[];
}

export type ProductActionTypes = FetchProductsAction | FetchProductsSuccessAction;

export const fetchProducts = (): FetchProductsAction => ({
  type: FETCH_PRODUCTS,
});

export const fetchProductsSuccess = (products: Product[]): FetchProductsSuccessAction => ({
  type: FETCH_PRODUCTS_SUCCESS,
  payload: products,
});
