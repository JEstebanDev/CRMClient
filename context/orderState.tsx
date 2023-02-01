import React, { useReducer } from "react";
import OrderContext from "./orderContext";
import orderReducer from "./orderReducer";
import {
  AMOUNT_PRODUCT,
  SELECT_CLIENT,
  SELECT_PRODUCT,
  UPDATE_TOTAL,
} from "@/types";
import { Product } from "@/types/product.type";
import { Client } from "@/types/client.type";
import { InitialStateType } from "@/types/orderState.type";

const OrderState = ({ children }: any) => {
  const initialState: InitialStateType = {
    client: {},
    product: [],
    total: 0,
  };

  const [state, dispatch] = useReducer(orderReducer, initialState);

  const addClient = (client: Client) => {
    dispatch({
      type: SELECT_CLIENT,
      payload: client,
    });
  };

  const addProduct = (product: Product[]) => {
    //make a copy to the last array Product[] to modify the last one
    //because in this case we are adding a new value to the product[] object(quantity)
    //if we don't make this copy, when the user add another product the object(quantity) added before will disappear
    let newState;
    if (state.product.length > 0) {
      newState = product.map((itemProduct) => {
        const newObject = state.product.find(
          (productState: Product) => productState.id === itemProduct.id
        );
        return { ...itemProduct, ...newObject };
      });
    } else {
      newState = product;
    }

    dispatch({
      type: SELECT_PRODUCT,
      payload: newState,
    });
  };

  const modifyAmount = (newProduct: Product[]) => {
    dispatch({
      type: AMOUNT_PRODUCT,
      payload: newProduct,
    });
  };

  const updateTotal = () => {
    dispatch({
      type: UPDATE_TOTAL,
    });
  };

  return (
    <OrderContext.Provider
      value={{
        client: state.client,
        product: state.product,
        total: state.total,
        addClient,
        addProduct,
        modifyAmount,
        updateTotal,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export default OrderState;
