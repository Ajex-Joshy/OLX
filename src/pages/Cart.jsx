import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ProductCard from "../components/ProductCard";

const Cart = () => {
  const cart = useSelector((store) => store.cart.items);
  const navigate = useNavigate();
  if (cart.length === 0)
    return (
      <div className="text-xl font-bold text-center mt-[20%]">
        Your cart is empty.
      </div>
    );
  return (
    <div>
      <div className="flex flex-wrap m-10">
        {cart.map((product) => (
          <ProductCard key={product.id} data={product} />
        ))}
      </div>
      <div className="w-full flex justify-center mt-6">
        <button
          className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors cursor-pointer"
          onClick={() => navigate("/checkout")}
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
3;
