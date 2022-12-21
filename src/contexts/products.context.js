import { createContext, useState } from "react";

import { onAuthStateChangedListener } from "../utils/firebase/firebase.utils";

import PRODUCTS from "../shop-data.json";

export const ProductsContext = createContext({
  products: [],
});

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState(PRODUCTS);
  const value = { products };
  //   useEffect(() => {
  //     const unsubscribe = onAuthStateChangedListener((PRODUCTS) => {
  //       setCurrentProducts(PRODUCTS);
  //     });
  //     return unsubscribe;
  //   }, []);
  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};
