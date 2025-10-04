import React from "react";
import { useSelector } from "react-redux";
import ProductCard from "../components/ProductCard";

const Cart = () => {
  const cart = useSelector((store) => store.cart.items);
  if (cart.length === 0)
    return (
      <div className="text-xl font-bold text-center mt-[20%]">
        Your cart is empty.
      </div>
    );
  return (
    <div className="flex flex-wrap m-10">
      {cart.map((product) => (
        <ProductCard key={product.id} data={product} />
      ))}
    </div>
  );
};

export default Cart;
