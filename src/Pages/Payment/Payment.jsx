import React, { useContext, useState } from "react";
import LayOut from "../../Components/LayOut/LayOut";
import classes from "./Payment.module.css";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import ProductCard from "../../Components/product/ProductCard.jsx"
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import CurrencyFormat from "../../Components/CurrencyFormat/CurrencyFormat";
import { axiosInstance } from "../../Api/axios.js";
import { Type } from "../../Utility/action.type";
import { ClipLoader } from "react-spinners";
import { db } from "../../Utility/firebase.js";
import { useNavigate } from "react-router-dom";

function Payment() {
  const [{ user, basket }, dispatch] = useContext(DataContext);
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const [cardError, setCardError] = useState("");
  const [processing, setProcessing] = useState(false);

  const totalItem = basket?.reduce((sum, item) => sum + (item?.amount ?? 0), 0);
  const total = basket?.reduce(
    (sum, item) => sum + item.price * item.amount,
    0
  );

  const handleChange = (event) => {
    setCardError(event?.error?.message || "");
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setProcessing(true);
    try {
      const response = await axiosInstance.post(
        `/payment/create?total=${total * 100}`
      );
      const clientSecret = response.data?.clientSecret;

      const confirmation = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (confirmation.error) {
        setCardError(confirmation.error.message);
        setProcessing(false);
        return;
      }

      const { paymentIntent } = confirmation;

      await db
        .collection("users")
        .doc(user.uid)
        .collection("orders")
        .doc(paymentIntent.id)
        .set({
          basket,
          amount: paymentIntent.amount,
          created: paymentIntent.created,
        });

      dispatch({ type: Type.EMPTY_BASKET });
      setProcessing(false);
      navigate("/orders", { state: { msg: "You have placed a new order!" } });
    } catch (error) {
      console.error("Payment error:", error);
      setCardError("Something went wrong. Please try again.");
      setProcessing(false);
    }
  };

  return (
    <LayOut>
      <div className={classes.payment__header}>
        Checkout ({totalItem}) items
      </div>
      <section className={classes.Payment}>
        <div className={classes.flex}>
          <h3>Delivery Address</h3>
          <div>
            <div>{user?.email}</div>
            <div>123 React Lane</div>
            <div>Chicago, IL</div>
          </div>
        </div>
        <hr />
        <div className={classes.flex}>
          <h3>Review Items and Delivery</h3>
          <div>
            {basket?.map((item, index) => (
              <ProductCard key={index} product={item} flex={true} />
            ))}
          </div>
        </div>
        <hr />
        <div className={classes.flex}>
          <h3>Payment Method</h3>
          <div className={classes.payment_card_container}>
            <form onSubmit={handlePayment} className={classes.payment__details}>
              {cardError && <small style={{ color: "red" }}>{cardError}</small>}
              <CardElement onChange={handleChange} />
              <div className={classes.payment__price}>
                <span style={{ display: "flex", gap: "10px" }}>
                  <p>Total Order |</p> <CurrencyFormat amount={total} />
                </span>
                <button type="submit" disabled={processing || !stripe}>
                  {processing ? (
                    <div className={classes.loading}>
                      <ClipLoader color="gray" size={12} />
                      <p>Please wait...</p>
                    </div>
                  ) : (
                    "Pay Now"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </LayOut>
  );
}

export default Payment;