import React from "react";
import { addProduct } from "../../redux/cartSlice";
import { useDispatch } from "react-redux";
import { message } from "antd";

const ProductItem = ({ item, index }) => {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(addProduct({ ...item, quantity: 1 }));
    message.success("The Product added to cart")
  };
  return (
    <div
      key={index}
      className="product-item border-b hover:shadow-lg cursor-pointer transition-all select-none"
      onClick={handleClick}
    >
      <div className="product-img">
        <img
          className="h-28 object-cover w-full border-b"
          src={item.img}
          alt=""
        />
      </div>
      <div className="product-info flex flex-col p-3">
        <span className="font-bold">{item.title}</span>
        <span>{item.price}₺</span>
      </div>
    </div>
  );
};

export default ProductItem;
