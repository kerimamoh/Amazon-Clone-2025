
import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import styles from "./Product.module.css";

function Product() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => {
        // console.log(res.data);
        setProducts(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <section className={styles.productsContainer}>
          {products.map((singleProduct) => {
            return (
              <ProductCard
                renderAdd={true}
                key={singleProduct.id}
                product={singleProduct}
                data={singleProduct.id}
              />
            );
          })}
        </section>
      )}
    </>
  );
}

export default Product;