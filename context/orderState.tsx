import React, { useReducer } from "react";
import OrderContext from "./orderContext";
import orderReducer from "./orderReducer";
import { AMOUNT_PRODUCT, SELECT_CLIENT, SELECT_PRODUCT } from "@/types";
import { Product, ProductType } from "@/types/product.type";
import { Client } from "@/types/client.type";

const OrderState = ({ children }: any) => {
  const initialState = {
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

  const addProduct = (product: Product) => {
    dispatch({
      type: SELECT_PRODUCT,
      payload: product,
    });
  };

  const modifyAmount = (newProduct: Product[]) => {
    dispatch({
      type: AMOUNT_PRODUCT,
      payload: newProduct,
    });
  };

  return (
    <OrderContext.Provider
      value={{ product: state.product, addClient, addProduct, modifyAmount }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export default OrderState;
