import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../store/cartSlice";

const ProductCard = ({
  data: { id, imageUrl, productName, price, description },
}) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const isAdded = cartItems.some((item) => item.id === id);

  const handleAddToCart = () => {
    dispatch(addToCart({ id, imageUrl, productName, price, description }));
  };

  const handleRemoveFromCart = () => {
    dispatch(removeFromCart(id));
  };

  return (
    <div className="max-w-sm bg-white rounded-lg shadow-md overflow-hidden m-4  hover:shadow-xl transition-shadow">
      <img
        src={imageUrl}
        alt={productName}
        className="w-64 h-48 object-contain mx-auto"
      />
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-800">{productName}</h2>
        <p className="text-gray-600 mt-2">{description}</p>
        <p className="text-blue-600 font-bold text-xl mt-2"> ₹{price}</p>
        {isAdded ? (
          <button
            onClick={handleRemoveFromCart}
            className="mt-4 w-full py-2 rounded transition-colors cursor-pointer bg-red-600 text-white hover:bg-red-700"
          >
            Remove from Cart
          </button>
        ) : (
          <button
            onClick={handleAddToCart}
            className="mt-4 w-full py-2 rounded transition-colors cursor-pointer bg-blue-600 text-white hover:bg-blue-700"
          >
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
