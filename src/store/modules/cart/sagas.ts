import { all, takeLatest, select, call, put } from 'redux-saga/effects'
import { IState } from '../..';
import { addProductToCartFailure, addProductToCartRequest, addProductToCartSuccess } from './action';
import { ActionTypes } from './types';

type CheckProductStockRequest = ReturnType<typeof addProductToCartRequest>;

interface IStockResponse {
  id: string;
  quantity: number;
}

function* checkProductStock({ payload }: CheckProductStockRequest) {
  const { product } = payload;

  const currentQuantity: number = yield select((state: IState) => {
    return state.cart.items.find(item => item.product.id === product.id)?.quantity ?? 0;
  }); 

  const availableSotckResponse: AxiosReponse<IStockResponse> = yield call(api.get. `stock/${product.id}`);

  if(availableSotckResponse.data.quantity > currentQuantity) {
    yield put(addProductToCartSuccess(product));
  } else {
    yield put(addProductToCartFailure(product.id));
  }


}

export default all([
  takeLatest(ActionTypes.addProductToCartRequest, checkProductStock)
]);