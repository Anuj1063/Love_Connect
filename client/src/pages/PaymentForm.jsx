














import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import BaseUrl from "../utils/basUrl";

const stripePromise = loadStripe(
  "pk_test_51RbzQCLm5F77P240Yq2opl7ZFodKlGUlGDB1XkKLdjpeYv3Pv5H06G5jtBIUUhVr7JK86m4AnxPfdwHIxd3gK16t00Wvh4odqA"
);

const elementStyles = {
  base: {
    fontSize: "16px",
    color: "#d946ef",
    fontFamily: "Arial, sans-serif",
    "::placeholder": {
      color: "#fbcfe8",
    },
  },
  invalid: {
    color: "#be123c",
    iconColor: "#be123c",
  },
};

function CheckoutForm() {
  const [amount, setAmount] = useState(499);
  const [purpose, setPurpose] = useState("premium_upgrade");
  const [clientSecret, setClientSecret] = useState(null);
  const [loading, setLoading] = useState(false);
  const [userName, setUserName] = useState("");

  const [cardNumberComplete, setCardNumberComplete] = useState(false);
  const [cardExpiryComplete, setCardExpiryComplete] = useState(false);
  const [cardCvcComplete, setCardCvcComplete] = useState(false);
  const [cardBrand, setCardBrand] = useState("");
  const [lastFour, setLastFour] = useState("");

  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const handleCreatePaymentIntent = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${BaseUrl}api/payment/create-payment-intent`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount, purpose }),
      });

      const data = await res.json();

      if (!data.clientSecret) {
        toast.error("💔 Failed to create payment intent.");
        setLoading(false);
        return;
      }

      setClientSecret(data.clientSecret || null);
      setUserName(data.user?.name || "Guest");
    } catch (err) {
      console.error("Error creating payment intent:", err);
      toast.error("💔 Failed to create payment intent.");
    }
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements || !clientSecret) return;
    setLoading(true);

    const { error, paymentIntent } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: { name: userName },
        },
      }
    );

    if (error) {
      toast.error(`💔 ${error.message}`);
      setLoading(false);
      return;
    }

    if (paymentIntent.status === "succeeded") {
      try {
        const confirmRes = await fetch(`${BaseUrl}api/payment/confirm-payment`, {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ paymentIntentId: paymentIntent.id }),
        });

        const confirmData = await confirmRes.json();

        if (confirmData.success) {
          toast.success("💖 Payment successful! You're now premium.");
          setTimeout(() => {
            navigate("/likes-you");
          }, 2000);
        } else {
          toast.error(confirmData.message || "💔 Payment confirmation failed.");
        }
      } catch (err) {
        toast.error("💔 Error confirming payment.");
      }
    } else {
      toast.error("💔 Payment not completed.");
    }

    setLoading(false);
  };

  const updateCardPreview = (element, type) => {
    switch (type) {
      case "number":
        setCardNumberComplete(element.complete);
        setCardBrand(element.brand || "");
        setLastFour(element.value?.slice(-4) || "");
        break;
      case "expiry":
        setCardExpiryComplete(element.complete);
        break;
      case "cvc":
        setCardCvcComplete(element.complete);
        break;
      default:
        break;
    }
  };

  const CARD_BRAND_LABELS = {
    visa: "Visa",
    mastercard: "Mastercard",
    amex: "American Express",
    discover: "Discover",
    diners: "Diners Club",
    jcb: "JCB",
    unionPay: "UnionPay",
    rupay: "RuPay",
    unknown: "Card",
  };

  return (

 
<div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-pink-50 via-white to-rose-50 px-4 py-8">
  <ToastContainer position="top-center" />
  <div className="w-full max-w-xl bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-yellow-100">
    <div className="text-center mb-6">
      <div className="inline-flex items-center justify-center p-4 bg-gradient-to-br from-yellow-100 via-pink-100 to-rose-200 rounded-full shadow-lg border border-yellow-200">
        💖
      </div>
      <h2 className="mt-4 text-3xl font-bold text-yellow-600">
        Upgrade to Premium
      </h2>
      <p className="text-sm text-yellow-500 mt-1">Enjoy exclusive features!</p>
    </div>

    {!clientSecret ? (
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Amount (INR)
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            min="1"
            className="w-full border border-pink-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-pink-400 outline-none bg-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Purpose
          </label>
          <select
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
            className="w-full border border-pink-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-pink-400 outline-none bg-white"
          >
            <option value="premium_upgrade">Premium Upgrade ❤️</option>
          </select>
        </div>

        <button
          onClick={handleCreatePaymentIntent}
          disabled={loading}
          className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white py-3 rounded-full font-semibold transition disabled:opacity-60"
        >
          {loading ? "Creating..." : "Start Payment 💳"}
        </button>
      </div>
    ) : (
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white border border-pink-200 text-gray-800 p-6 rounded-xl shadow-md">
          <div className="flex justify-between text-sm font-mono">
            <span className="text-pink-500">
              {CARD_BRAND_LABELS[cardBrand] || "Card"}
            </span>
            <span className="text-gray-600">•••• {lastFour || "0000"}</span>
          </div>
          <div className="mt-4 text-sm text-gray-500 flex justify-between">
            <span>Exp: 12/29</span>
            <span>CVC: ●●●</span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Card Number
          </label>
          <div className="border border-pink-300 bg-white rounded-lg px-4 py-3 focus-within:ring-2 focus-within:ring-pink-400 shadow-sm">
            <CardNumberElement
              options={elementStyles}
              onChange={(e) => updateCardPreview(e, "number")}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Expiry
            </label>
            <div className="border border-pink-300 bg-white rounded-lg px-4 py-3 focus-within:ring-2 focus-within:ring-pink-400 shadow-sm">
              <CardExpiryElement
                options={elementStyles}
                onChange={(e) => updateCardPreview(e, "expiry")}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              CVC
            </label>
            <div className="border border-pink-300 bg-white rounded-lg px-4 py-3 focus-within:ring-2 focus-within:ring-pink-400 shadow-sm">
              <CardCvcElement
                options={elementStyles}
                onChange={(e) => updateCardPreview(e, "cvc")}
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={
            !stripe ||
            loading ||
            !(cardNumberComplete && cardExpiryComplete && cardCvcComplete)
          }
          className="w-full bg-gradient-to-r from-pink-400 to-rose-400 hover:from-pink-500 hover:to-rose-500 text-white py-3 rounded-full font-semibold transition-all duration-300 shadow-md disabled:opacity-60"
        >
          {loading ? "Processing..." : "Pay Now 💖"}
        </button>
      </form>
    )}
  </div>
</div>

  );
}

export default function PaymentForm() {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
}
