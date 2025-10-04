import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../store/productSlice";
import ProductCard from "../components/ProductCard"; // adjust path if needed

const ProductListing = () => {
  const dispatch = useDispatch();
  const products = useSelector((store) => store.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (products.loading) return <p>Loading products...</p>;
  if (products.error) return <p>Error: {products.error}</p>;
  return (
    <div className="flex flex-wrap m-10">
      {products.data.map((product) => (
        <ProductCard key={product.id} data={product} />
      ))}
    </div>
  );
};

export default ProductListing;
