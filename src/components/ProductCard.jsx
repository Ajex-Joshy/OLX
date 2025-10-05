import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../store/cartSlice";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { deleteProduct } from "../store/productSlice";

const ProductCard = ({
  data: { id, imageUrl, productName, price, description },
  myProduct,
}) => {
  console.log(myProduct);
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const isAdded = cartItems.some((item) => item.id === id);

  const handleAddToCart = () => {
    dispatch(addToCart({ id, imageUrl, productName, price, description }));
  };

  const handleRemoveFromCart = () => {
    dispatch(removeFromCart(id));
  };

  const navigate = useNavigate();

  const handleEdit = () => {
    navigate("/sell", {
      state: {
        isEdit: true,
        data: { id, imageUrl, productName, price, description },
      },
    });
  };

  const handleDelete = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        const productRef = doc(db, "products", id);
        await deleteDoc(productRef);
        Swal.fire("Deleted!", "Your product has been deleted.", "success");
        dispatch(deleteProduct(id));
      } catch (error) {
        console.error("Error deleting product:", error);
        Swal.fire("Error!", "Failed to delete the product.", "error");
      }
    }
  };

  return (
    <div className="max-w-sm bg-white rounded-lg shadow-md overflow-hidden m-4 hover:shadow-xl transition-shadow">
      <img
        src={imageUrl}
        alt={productName}
        className="w-64 h-48 object-contain mx-auto"
      />
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-800">{productName}</h2>
        <p className="text-gray-600 mt-2">{description}</p>
        <p className="text-blue-600 font-bold text-xl mt-2"> ₹{price}</p>
        {myProduct ? (
          <div className="flex gap-2 mt-4">
            <button
              onClick={handleEdit}
              className="flex-1 py-2 rounded transition-colors bg-yellow-500 text-white hover:bg-yellow-600 cursor-pointer"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="flex-1 py-2 rounded transition-colors bg-red-600 text-white hover:bg-red-700 cursor-pointer"
            >
              Delete
            </button>
          </div>
        ) : isAdded ? (
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
