import axios from "./axios";
import React, { createContext, useEffect, useState } from "react"

export const ProductContext = createContext();

const Context = (props) => {
    const [products, setProducts] = useState(JSON.parse(localStorage.getItem("products")) || null);

   

    return (
        <ProductContext.Provider value={[products, setProducts]}>
            {props.children}
        </ProductContext.Provider>
    );
};

export default Context;