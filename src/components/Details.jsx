import React, { useContext, useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom";
import { ProductContext } from "../Utils/Context";
import axios from "../Utils/axios";
import Loading from "./Loading";

const Details = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useContext(ProductContext);
  const [product, setProduct] = useState(null);
  const {id} = useParams();

  useEffect(()=>{
    if(!product){
      setProduct(products.filter(p => p.id ==id)[0]);
    }
  },[]);

  const ProductDeleteHandler = (id)=>{
    const FilteredProducts = products.filter((p) => p.id != id);
    setProducts(FilteredProducts);
    localStorage.setItem("products", JSON.stringify(FilteredProducts));
    navigate("/");
  }

  return ( product ? (
    <div className="w-[70%] flex justify-between items-center h-full m-auto p-[10%]"> 
      
      <img className="h-[80%]  w-[40%] object-contain" src = {`${product.image}`} alt="" />
        <div className="content w-[50%]">
            <h1 className="text-3xl">{product.title}</h1>
            <h2 className="text-zinc-600 my-5">{product.category}</h2>
            <h2 className="text-red-300"> ₹ {Math.floor(product.price * 85)}</h2>
            <p className="mb-[5%]">{product.description}</p>
            <Link to={`/edit/${product.id}`} className="mr-5 py-2 px-5 border rounded border-blue-400 text-blue-500 ">Edit</Link>
            <button onClick={() => ProductDeleteHandler(product.id)} className=" py-2 px-5 border rounded border-red-400 text-red-500 ">Delete</button>
        </div>
    </div>):(<Loading />)
  )
};

export default Details;
