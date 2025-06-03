import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useCartStore } from "../stores/useCartStore";
import { convertToINR } from "../utils/currency";
import { loadStripe } from "@stripe/stripe-js";
import axios from "../lib/axios";

// Stripe public key
const stripePromise = loadStripe(
  "pk_test_51RL3ggFPngcPaoDeFIw6BpNgi2YmyXphdpHp2EZvCmaI5my6UlFFWBXNdrA4nC8HVlS1m4UxNfTX0Hr104VW3DWn0022vc5Owm"
);

const OrderReviewPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cart, subtotal, total, coupon, isCouponApplied } = useCartStore();
  const address = location.state?.address;

  const savings = subtotal - total;
  const formattedSavings = savings.toFixed(2);

  if (!address) {
    navigate("/address");
    return null;
  }

  // Payment handler
  const handlePayment = async () => {
    const stripe = await stripePromise;
    const res = await axios.post("/payments/create-checkout-session", {
      products: cart,
      couponCode: coupon ? coupon.code : null,
    });

    const session = res.data;
    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      console.error("Error:", result.error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-gray-800 rounded-lg shadow space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-4 text-emerald-400">Shipping Address</h2>
        <div className="bg-gray-700 p-4 rounded text-white space-y-1">
          <div><strong>Name:</strong> {address.name}</div>
          <div><strong>Street:</strong> {address.street}</div>
          <div><strong>City:</strong> {address.city}</div>
          <div><strong>State:</strong> {address.state}</div>
          <div><strong>ZIP:</strong> {address.zip}</div>
          <div><strong>Country:</strong> {address.country}</div>
        </div>
      </div>
      <div>
        <h2 className="text-2xl font-bold mb-4 text-emerald-400">Order Items</h2>
        <div className="bg-gray-700 p-4 rounded text-white space-y-2">
          {cart.length === 0 ? (
            <div>No items in cart.</div>
          ) : (
            cart.map((item, idx) => (
              <div key={idx} className="flex items-center gap-4 border-b border-gray-600 pb-2 mb-2 last:border-b-0 last:mb-0">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded"
                />
                <div>
                  <div><strong>Product:</strong> {item.name}</div>
                  <div><strong>Quantity:</strong> {item.quantity}</div>
                  <div><strong>Price:</strong> ₹{convertToINR(item.price)}</div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <div>
        <h2 className="text-2xl font-bold mb-4 text-emerald-400">Order Summary</h2>
        <div className="bg-gray-700 p-4 rounded text-white space-y-2">
          <div className="flex justify-between">
            <span>Original price</span>
            <span>₹{convertToINR(subtotal)}</span>
          </div>
          {savings > 0 && (
            <div className="flex justify-between text-emerald-400">
              <span>Savings</span>
              <span>-₹{convertToINR(formattedSavings)}</span>
            </div>
          )}
          {coupon && isCouponApplied && (
            <div className="flex justify-between text-emerald-400">
              <span>Coupon ({coupon.code})</span>
              <span>-{coupon.discountPercentage}%</span>
            </div>
          )}
          <div className="flex justify-between font-bold border-t border-gray-600 pt-2">
            <span>Total</span>
            <span>₹{convertToINR(total)}</span>
          </div>
        </div>
      </div>
      <button
        className="w-full bg-emerald-600 text-white py-2 rounded hover:bg-emerald-700"
        onClick={handlePayment}
      >
        Place Order
      </button>
    </div>
  );
};

export default OrderReviewPage;