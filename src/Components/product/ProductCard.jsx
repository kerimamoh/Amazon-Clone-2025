import React, { useContext } from "react";

import { Rating } from "@mui/material";
import CurrencyFormat from "../CurrencyFormat/CurrencyFormat";
import styles from "./Product.module.css";
import { Link } from "react-router-dom";
//  import { useContext } from 'react';
import { DataContext } from "../DataProvider/DataProvider";
import { Type } from "../../Utility/action.type";

const ProductCard = ({ product, flex, renderDesc, renderAdd }) => {
  // console.log(product);
  const { image, title, id, rating, price, description } = product;

  const [state, dispatch] = useContext(DataContext);
  //console.log(state);

  const addToCart = () => {
    dispatch({
      type: Type.ADD_TO_BASKET,
      item: { image, title, id, rating, price, description },
    });
  };
  return (
    <section
      className={`${styles.cardContainer} ${flex ? styles.product_flexed : ""}`}
    >
      <Link to={`/products/${id}`}>
        <img
          src={image}
          alt={title || "Product image"}
          className={styles.img_container}
        />
      </Link>

      <div className={styles.rating}>
        <h3>{title}</h3>

        {renderDesc && (
          <div style={{ maxWidth: "750px" }}>
            <p>{description}</p>
          </div>
        )}

        <div>
          <Rating value={rating?.rate || 0} precision={0.1} readOnly />
          <small>{rating?.count || 0}</small>
        </div>

        <div>
          <CurrencyFormat amount={price} />
        </div>
        {renderAdd && (
          <button className={styles.button} onClick={addToCart}>
            add to Cart
          </button>
        )}
      </div>
    </section>
  );
};
export default ProductCard;
