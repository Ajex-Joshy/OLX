import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../store/productSlice";
import ProductCard from "../components/ProductCard"; // adjust path if needed

const MyProducts = () => {
  const dispatch = useDispatch();
  const products = useSelector((store) => store.products);
  const user = useSelector((store) => store.user.userInfo);

  const myProducts = useMemo(
    () => products.data.filter((product) => product.uid === user.uid),
    [products.data, user.uid]
  );

  return (
    <div className="flex flex-wrap m-10">
      {myProducts.length === 0 ? (
        <p className="text-white text-center mx-auto">
          You don't have any listed products.
        </p>
      ) : (
        myProducts.map((product) => (
          <ProductCard key={product.id} data={product} myProduct={true} />
        ))
      )}
    </div>
  );
};

export default MyProducts;
