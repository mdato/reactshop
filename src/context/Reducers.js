export const trolleyReducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return { ...state, trolley: [...state.trolley, { ...action.payload, qty: 1 }] };
    case "REMOVE":
      return {
        ...state,
        trolley: state.trolley.filter((c) => c.id !== action.payload.id),
      };
    case "QTY":
      return {
        ...state,
        trolley: state.trolley.filter((c) =>
          c.id === action.payload.id ? (c.qty = action.payload.qty) : c.qty
        ),
      };
    default:
      return state;
  }
};

export const productReducer = (state, action) => {
  switch (action.type) {
    case "ORDER_BY_PRICE":
      return { ...state, sort: action.payload };
    case "FILTER_BY_STOCK":
      return { ...state, byStock: !state.byStock };
    case "FILTER_BY_DELIVERY":
      return { ...state, byFastDelivery: !state.byFastDelivery };
    case "FILTER_BY_SEARCH":
      return { ...state, searchQuery: action.payload };
    case "CLEAR_FILTERS":
      return { byStock: false, byFastDelivery: false };
    default:
      return state;
  }
};
