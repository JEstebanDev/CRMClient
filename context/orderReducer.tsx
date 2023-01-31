import { SELECT_CLIENT, SELECT_PRODUCT, AMOUNT_PRODUCT } from "@/types";

// eslint-disable-next-line import/no-anonymous-default-export
export default (
  state: any,
  action: {
    payload: any;
    type: any;
  }
) => {
  switch (action.type) {
    case SELECT_CLIENT:
      return {
        ...state,
        client: action.payload,
      };
    case SELECT_PRODUCT:
      return {
        ...state,
        product: action.payload,
      };
    case AMOUNT_PRODUCT:
      return {
        ...state,
        products: state.products.map((product: { id: any }) =>
          product.id === action.payload.id
            ? (product = action.payload)
            : product
        ),
      };
    default:
      return state;
  }
};
