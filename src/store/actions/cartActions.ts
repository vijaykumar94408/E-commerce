// src/store/actions/cartActions.ts
export const CLEAR_CART = 'CLEAR_CART';

export interface ClearCartAction {
  type: typeof CLEAR_CART;
}

export const clearCart = (): ClearCartAction => ({
  type: CLEAR_CART
});

export type CartActionTypes = ClearCartAction;
