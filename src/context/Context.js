import { createContext, useContext, useReducer } from "react";
import faker from "faker";
import { trolleyReducer, productReducer } from "./Reducers";

const Trolley = createContext();
faker.seed(99);

const Context = ({ children }) => {
  const products = [...Array(40)].map(() => ({
    id: faker.datatype.uuid(),
    name: faker.commerce.productName(),
    price: faker.commerce.price(),
    image: faker.random.image(),
    inStock: faker.random.arrayElement([0, 3, 5, 6, 7]),
    fastDelivery: faker.datatype.boolean(),
  }));

  const [state, dispatch] = useReducer(trolleyReducer, {
    products: products,
    trolley: [],
  });

  const [productState, productDispatch] = useReducer(productReducer, {
    byStock: false,
    byFastDelivery: false,
    searchQuery: "",
  });

  console.log(productState);

  return (
    <Trolley.Provider value={{ state, dispatch, productState, productDispatch }}>
      {children}
    </Trolley.Provider>
  );
};

export const TrolleyState = () => {
  return useContext(Trolley);
};

export default Context;
