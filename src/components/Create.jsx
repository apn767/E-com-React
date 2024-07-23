import React, { useContext, useState } from "react"
import { ProductContext } from "../Utils/Context";
import { nanoid } from "nanoid";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const Create = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useContext(ProductContext);
    const [title, setTitle] = useState("");
    const [image, setImage] = useState();
    const [category, setCategory] = useState();
    const [price, setPrice] = useState();
    const [description, setDescription] = useState();

    const AddProductHandler = (e) =>{
        e.preventDefault();
        if(title.trim().length < 5 || category.trim().length< 5 || price.trim().length < 1 || description.trim().length < 5 || image.trim().length < 5 ){
            alert("Each & every field must have at least four character");
            return;
        }
        const product = {
            id:nanoid(),
            title,
            image,
            category,
            price,
            description,
        };
        setProducts([...products, product]);
        localStorage.setItem("products", JSON.stringify([...products, product]));
        toast.success("New Product Added successfully!")
        navigate("/");
        
    }

  return (
    <form onSubmit={AddProductHandler} action="" className="flex flex-col items-center p-[5%] w-screen h-screen">
        <h1 className="mb-5 w-1/2 text-2xl font-bold">Add New Product</h1>
        <input
            type="text"
            placeholder="Enter the product title" 
            className="text-1xl bg-zinc-100 rounded p-3 w-1/2 mb-3 h-8" 
            onChange={(e) => setTitle(e.target.value)}
            value={title}
        />
        <input
            type="url"
            placeholder="paste the image link here..." 
            className="text-1xl bg-zinc-100 rounded p-3 w-1/2 mb-3 h-8" 
            onChange={(e) => setImage(e.target.value)}
            value={image}
        />
        <div className="w-1/2 h-8 flex justify-between">
            <input
                type="text"
                placeholder="Category name..." 
                className="text-1xl bg-zinc-100 rounded p-3 w-[48%] mb-3 h-8" 
                onChange={(e) => setCategory(e.target.value)}
                value={category}
            />
            <input
                type="number" 
                placeholder="Enter the price... " 
                className="text-1xl bg-zinc-100 rounded p-3 w-[48%] mb-3 h-8" 
                onChange={(e) => setPrice(e.target.value)}
                value={price}
            />
        </div>
        <textarea 
            onChange={(e) => setDescription(e.target.value)} placeholder="Enter product description here..."
            value={description}
            className="text-1xl bg-zinc-100 rounded p-3 w-1/2 mb-3 mt-3"
            rows= "10" 
         >
        </textarea>
        <div className="w-1/2">
            <button className="self-start py-2 px-2 border rounded border-blue-200 text-blue-300">
                 Add New Product
            </button>
        </div>
    </form>
  )
};

export default Create;
