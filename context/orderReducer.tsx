import {
  SELECT_CLIENT,
  SELECT_PRODUCT,
  AMOUNT_PRODUCT,
  UPDATE_TOTAL,
} from "@/types";

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
        product: state.product.map((item) =>
          item.id === action.payload.id ? (item = action.payload) : item
        ),
      };
    case UPDATE_TOTAL:
      return {
        ...state,
        total: state.product.reduce(
          (newTotal, product) => (newTotal += product.price * product.quantity),
          0
        ),
      };
    default:
      return state;
  }
};
