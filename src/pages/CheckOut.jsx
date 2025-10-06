import React, { use } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { marksAsSold } from "../store/productSlice";
import { clearCart } from "../store/cartSlice";

const CheckOut = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const totalPrice = cartItems.reduce((acc, item) => acc + item.price, 0);
  const ids = cartItems.reduce((acc, curr) => {
    acc.push(curr.id);
    return acc;
  }, []);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handlePlaceOrder = async () => {
    await Swal.fire({
      icon: "success",
      title: "Order Placed!",
      text: "Your order has been successfully placed.",
      confirmButtonText: "OK",
    });
    dispatch(marksAsSold(ids));
    dispatch(clearCart());
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800 tracking-wide">
        Checkout
      </h1>

      {cartItems.length === 0 ? (
        <p className="text-center text-gray-700 text-lg">Your cart is empty.</p>
      ) : (
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8">
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center border-b pb-2"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.imageUrl}
                    alt={item.productName}
                    className="w-20 h-20 object-contain"
                  />
                  <div>
                    <p className="font-semibold text-gray-800">
                      {item.productName}
                    </p>
                  </div>
                </div>
                <p className="font-semibold text-gray-700">₹{item.price}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex justify-between items-center bg-gray-100 rounded-lg px-6 py-4">
            <p className="text-2xl font-extrabold text-gray-900 tracking-wide">
              Total:
            </p>
            <p className="text-2xl font-extrabold text-blue-700 tracking-wider">
              ₹{totalPrice}
            </p>
          </div>

          <button
            onClick={handlePlaceOrder}
            className="mt-8 w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold text-lg shadow-md cursor-pointer"
          >
            Place Order
          </button>
        </div>
      )}
    </div>
  );
};

export default CheckOut;
