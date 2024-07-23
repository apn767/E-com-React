import React, { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import { ProductContext } from "../Utils/Context";
import { toast } from "react-toastify";
const Edit = () => {
    const [products, setProducts] = useContext(ProductContext);
    const navigate = useNavigate();
    const {id} = useParams();
    const [product, setProduct] = useState({
        title: "",
        description: "",
        image: "",
        price: "",
        category: "",
    });
    const ChangeHandler = (e)=>{
        setProduct({...product, [e.target.name]:e.target.value})
    }

    useEffect(()=>{
        setProduct(products.filter((p)=> p.id == id)[0]);

    },[id]);


    const AddProductHandler = (e) =>{
        e.preventDefault();
        if(product.title.trim().length < 5 || product.category.trim().length< 5 || product.price.trim().length < 1 || product.description.trim().length < 5 || product.image.trim().length < 5 ){
            alert("Each & every field must have at least four character");
            return;
        }
        const updatedProducts = products.map((p) =>
            p.id == id ? { ...p, ...product } : p
        );

        setProducts(updatedProducts);
        localStorage.setItem("products", JSON.stringify(updatedProducts));
        toast.success("Saved the changes successfully!")
        navigate(-1);
       
    }
  return (
    <form onSubmit={AddProductHandler} action="" className="flex flex-col items-center p-[5%] w-screen h-screen">
        <h1 className="mb-5 w-1/2 text-2xl font-bold">Edit the Product</h1>
        <input
            type="text"
            placeholder="Enter the product title" 
            className="text-1xl bg-zinc-100 rounded p-3 w-1/2 mb-3 h-8" 
            onChange={ChangeHandler}
            name="title"
            value={product && product.title}
        />
        <input
            type="url"
            placeholder="paste the image link here..." 
            className="text-1xl bg-zinc-100 rounded p-3 w-1/2 mb-3 h-8" 
            onChange={ChangeHandler}
            name="image"
            value={product && product.image}
        />
        <div className="w-1/2 h-8 flex justify-between">
            <input
                type="text"
                placeholder="Category name..." 
                className="text-1xl bg-zinc-100 rounded p-3 w-[48%] mb-3 h-8" 
                onChange={ChangeHandler}
                name="category"
                value={product && product.category}
            />
            <input
                type="number" 
                placeholder="Enter the price... " 
                className="text-1xl bg-zinc-100 rounded p-3 w-[48%] mb-3 h-8" 
                onChange={ChangeHandler}
                name="price"
                value={product && product.price}
            />
        </div>
        <textarea 
            onChange={ChangeHandler} placeholder="Enter product description here..."
            value={product && product.description}
            name="description"
            className="text-1xl bg-zinc-100 rounded p-3 w-1/2 mb-3 mt-3"
            rows= "10" 
         >
        </textarea>
        <div className="w-1/2">
            <button className="self-start py-2 px-2 border rounded border-blue-200 text-blue-300">
                 Save the Changes
            </button>
        </div>
    </form>
  )
};

export default Edit;
