import { useEffect, useState } from "react";
// import styles from "../ProductDetail.module.css";
import LayOut from "../../Components/LayOut/LayOut";
import axios from "axios";
import { useParams } from "react-router-dom";
import { productUrl } from "../../endpoints";
import ProductCard from "../../Components/product/ProductCard";
import Loader from "../../Components/Loader/Loader";

function ProductDetail() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${productUrl}/Products/${productId}`)
      .then((res) => {
        // console.log(res.data);
        setProduct(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, []);
  // console.log(product);
  return (
    <LayOut>
      {isLoading ? (
        <Loader />
      ) : product ? (
        <ProductCard
          product={product}
          flex={true}
          renderDesc={true}
          renderAdd={true}
        />
      ) : (
        <div>No product found.</div>
      )}
    </LayOut>
  );
}

export default ProductDetail;