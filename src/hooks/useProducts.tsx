import { useState, useEffect } from "react";
import axios from "axios";
import { Product } from "../types/product";

const useProducts = () => {
  const [products, setProducts] = useState<Product[]>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/products`
        );
        setProducts(response.data);
        setIsLoading(false);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProducts();
  }, []);

  return { products, isLoading };
};

export default useProducts;
