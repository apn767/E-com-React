import React, { useContext, useEffect, useState } from "react";
import Nav from "./Nav";
import { Link, useLocation } from "react-router-dom";
import Loading from "./Loading";
import { ProductContext } from "../Utils/Context";
import axios from "../Utils/axios";
 const Home = ()=> {
    const [products] = useContext(ProductContext);
    const {search} = useLocation();
    const category = decodeURIComponent(search.split("=")[1]);
    const [filteredProducts, setFilteredProducts] = useState(null);
    
    const getCategory = async ()=>{
        try {
            const {data} = await axios.get(`/products/category/${category}`);
            setFilteredProducts(data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        if(!filteredProducts || category == "undefined") setFilteredProducts(products)
        if(category  != "undefined"){

            setFilteredProducts(products.filter(p => p.category == category));
        }
  
    },[category, products]);


    return  products ? (
    <>
    <Nav />
    <div className="w-[85%]  p-16 pt-[5%] flex flex-wrap overflow-x-hidden overflow-y-auto">
        {filteredProducts && filteredProducts.map((p, i) =>(
            <Link key={p.id} to={`/details/${p.id}`} className="mr-3 mb-3 card p-3 border shadow rounded w-[18%] h-[30vh] flex flex-col justify-center items-center">
            <div className="hover:scale-110 mb-3 w-full h-[80%] bg-contain bg-no-repeat bg-center"
            style={{backgroundImage:`url(${p.image})`}}>
            </div>
            <h3 className="hover:text-blue-500">{p.title} </h3>
            </Link>
        ))}

            

        </div>


    </>
    ) : (<Loading />
    );
 }
export default Home;