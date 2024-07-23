import React, { useContext } from "react"
import { ProductContext } from "../Utils/Context";
import { Link } from "react-router-dom";

const Nav = () => {
  const [products] = useContext(ProductContext);
  let uniqueCategory = products && products.reduce((acc,cv) => [...acc, cv.category], []);
  uniqueCategory = [...new Set(uniqueCategory)];
  const color = ()=>{
    return `rgba(${(Math.random()*255).toFixed()},${(Math.random()*255).toFixed()},${(Math.random()*255).toFixed()},0.4)`
  }
  return (
    <div>
       <nav className="w-[125%] h-full bg-zinc-100 flex flex-col items-center pt-5">
      <a className="py-2 px-5 border rounded border-purple-400 text-blue-500 " href="/create">Add new Product</a>
      <hr className="w-[80%] my-3" />
      <h1 className="text-2xl w-[80%] mb-3">Category Filter</h1>
      <div className=" w-[80%]">
        {uniqueCategory.map((c,i) =>(
        
        <Link key={i} to={`/?category=${c}`} className="mb-3 flex items-center">
          <span style={{backgroundColor: color()}} className="rounded-full mr-2 w-[15px] h-[15px]"> </span>{" "}
          {c}</Link>
          
          ))}
        </div>
   </nav>
    </div>
  )
};

export default Nav;

