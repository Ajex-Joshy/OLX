import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../store/productSlice";
import ProductCard from "../components/ProductCard"; // adjust path if needed

const ProductListing = () => {
  const dispatch = useDispatch();
  const products = useSelector((store) => store.products);
  const user = useSelector((store) => store.user.userInfo);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (products.loading) return <p>Loading products...</p>;
  if (products.error) return <p>Error: {products.error}</p>;

  const visibleProducts =
    products.data?.filter(
      (product) => product.uid !== user.uid && product.isSold !== true
    ) || [];

  if (visibleProducts.length === 0)
    return (
      <p className="text-center mt-20 text-white text-lg">
        No available products right now.
      </p>
    );

  return (
    <div className="flex flex-wrap m-10 gap-6">
      {visibleProducts.map((product) => (
        <ProductCard key={product.id} data={product} />
      ))}
    </div>
  );
};

export default ProductListing;
