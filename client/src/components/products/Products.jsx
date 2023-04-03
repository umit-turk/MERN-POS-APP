import { useState } from "react";
import ProductItem from "./ProductItem";
import { PlusOutlined, EditOutlined } from "@ant-design/icons";
import Add from "./Add";
import { useNavigate } from "react-router-dom";

const Products = ({ categories, filtered, products, setProducts }) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const navigate = useNavigate()
  
  const addModal = () => {
    setIsAddModalOpen((prev) => !prev);
  };

  return (
    <div className="products-wrapper grid gap-4 grid-cols-card">
      {filtered?.map((item, index) => (
        <ProductItem item={item} index={index} key={item._id} />
      ))}
      <div
        onClick={addModal}
        className="product-item border-b hover:shadow-lg cursor-pointer transition-all select-none bg-purple-800 flex justify-center items-center hover:opacity-90 min-h-[180px]"
      >
        <PlusOutlined className="text-white md:text-2xl" />
      </div>
      <div onClick={() => navigate("/products")} className="product-item border-b hover:shadow-lg cursor-pointer transition-all select-none bg-orange-800 flex justify-center items-center hover:opacity-90 min-h-[180px]">
        <EditOutlined className="text-white md:text-2xl" />
      </div>
      <Add
        products={products}
        setProducts={setProducts}
        categories={categories}
        addModal={addModal}
        isAddModalOpen={isAddModalOpen}
      />
    </div>
  );
};

export default Products;
