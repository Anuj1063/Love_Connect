// import React, { useState } from "react";
// import { loadStripe } from "@stripe/stripe-js";
// import {
//   Elements,
//   CardNumberElement,
//   CardExpiryElement,
//   CardCvcElement,
//   useStripe,
//   useElements,
// } from "@stripe/react-stripe-js";

// import  BaseUrl  from "../utils/basUrl"

// // Load your publishable key
// const stripePromise = loadStripe(
//   "pk_test_51RbzQCLm5F77P240Yq2opl7ZFodKlGUlGDB1XkKLdjpeYv3Pv5H06G5jtBIUUhVr7JK86m4AnxPfdwHIxd3gK16t00Wvh4odqA"
// );

// // Stripe Element Styles
// const elementStyles = {
//   base: {
//     fontSize: "16px",
//     color: "#d946ef", // purple-400
//     fontFamily: "Arial, sans-serif",
//     "::placeholder": {
//       color: "#fbcfe8", // pink-200
//     },
//   },
//   invalid: {
//     color: "#be123c", // rose-800
//     iconColor: "#be123c",
//   },
// };

// function CheckoutForm() {
//   const [amount, setAmount] = useState(10);
//   const [purpose, setPurpose] = useState("premium_upgrade");
//   const [clientSecret, setClientSecret] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");
//   const [userName, setUserName] = useState("");

//   // Card info for preview
//   const [cardNumberComplete, setCardNumberComplete] = useState(false);
//   const [cardExpiryComplete, setCardExpiryComplete] = useState(false);
//   const [cardCvcComplete, setCardCvcComplete] = useState(false);
//   const [cardBrand, setCardBrand] = useState("");
//   const [lastFour, setLastFour] = useState("");

//   const stripe = useStripe();
//   const elements = useElements();

//   const handleCreatePaymentIntent = async () => {
//     setLoading(true);
//     setMessage("");

//     try {
//       const res = await fetch(
//         `${BaseUrl}api/payment/create-payment-intent`,
//         {
//           method: "POST",
//           credentials: "include",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ amount, purpose }),
//         }
//       );

//       const data = await res.json();

//       if (!data.clientSecret) {
//         setMessage("💔 Failed to create payment intent.");
//         setLoading(false);
//         return;
//       }

//       setClientSecret(data.clientSecret || null);
//       setUserName(data.user?.name || "Guest"); // Set name from API response
//     } catch (err) {
//       console.error("Error creating payment intent:", err);
//       setMessage("💔 Failed to create payment intent.");
//     }

//     setLoading(false);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!stripe || !elements || !clientSecret) return;

//     setLoading(true);
//     setMessage("");

//     const { error, paymentIntent } = await stripe.confirmCardPayment(
//       clientSecret,
//       {
//         payment_method: {
//           card: elements.getElement(CardNumberElement),
//           billing_details: { name: userName },
//         },
//       }
//     );

//     if (error) {
//       console.error("Stripe error:", error);
//       setMessage(`💔 ${error.message}`);
//       setLoading(false);
//       return;
//     }

//     if (paymentIntent.status === "succeeded") {
//       try {
//         const confirmRes = await fetch(
//           `${BaseUrl}api/payment/confirm-payment`,
//           {
//             method: "POST",
//             credentials: "include",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ paymentIntentId: paymentIntent.id }),
//           }
//         );

//         const confirmData = await confirmRes.json();
//         setMessage(
//           confirmData.success
//             ? "💖 Payment successful! You're now premium."
//             : confirmData.message || "💔 Payment confirmation failed."
//         );
//       } catch (err) {
//         console.error("Error confirming payment:", err);
//         setMessage("💔 Error confirming payment.");
//       }
//     } else {
//       setMessage("💔 Payment not completed.");
//     }

//     setLoading(false);
//   };

//   const updateCardPreview = (element, type) => {
//     switch (type) {
//       case "number":
//         setCardNumberComplete(element.complete);
//         setCardBrand(element.brand || "");
//         setLastFour(element.value.slice(-4) || "");
//         break;
//       case "expiry":
//         setCardExpiryComplete(element.complete);
//         break;
//       case "cvc":
//         setCardCvcComplete(element.complete);
//         break;
//       default:
//         break;
//     }
//   };

//   // Optional: Friendly names for card brands
//   const CARD_BRAND_LABELS = {
//     visa: "Visa",
//     mastercard: "Mastercard",
//     amex: "American Express",
//     discover: "Discover",
//     diners: "Diners Club",
//     jcb: "JCB",
//     unionPay: "UnionPay",
//     rupay: "RuPay",
//     unknown: "Card",
//   };

//   return (
//     <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-white to-rose-50 px-4 py-8">
//       <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl p-8 transform transition-all duration-300 hover:shadow-xl">
//         {/* Love Icon */}
//         <div className="flex justify-center mb-6">
//           <div className="p-3 rounded-full bg-gradient-to-r from-pink-500 to-rose-500">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//               className="w-6 h-6 text-white"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M3 10h18M7 15h1m4 0h1m4 0h1M9 4H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H9z"
//               />
//             </svg>
//           </div>
//         </div>

//         <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
//           Upgrade to Premium
//         </h2>

//         {!clientSecret ? (
//           <div className="space-y-6">
//             {/* Amount Input - Only Input Box Now */}
//             <div className="flex flex-col space-y-2">
//               <label className="block text-sm font-medium text-gray-700">
//                 Amount (INR)
//               </label>
//               <input
//                 type="number"
//                 value={amount}
//                 onChange={(e) => setAmount(Number(e.target.value))}
//                 min="1"
//                 className="w-full border border-pink-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-pink-400 outline-none transition bg-white text-black"
//               />
//             </div>

//             {/* Purpose Dropdown */}
//             <div className="flex flex-col space-y-2">
//               <label className="block text-sm font-medium text-gray-700">
//                 Purpose
//               </label>
//               <select
//                 value={purpose}
//                 onChange={(e) => setPurpose(e.target.value)}
//                 className="w-full border border-pink-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-pink-400 outline-none transition bg-white text-black"
//               >
//                 <option value="premium_upgrade">Premium Upgrade ❤️</option>
//                 <option value="boost_profile">Boost Profile 🔥</option>
//               </select>
//             </div>

//             {/* Start Payment Button */}
//             <button
//               onClick={handleCreatePaymentIntent}
//               disabled={loading}
//               className="w-full bg-gradient-to-r from-pink-500 to-rose-500 text-white py-3 rounded-full font-semibold hover:from-pink-600 hover:to-rose-600 transition disabled:opacity-60 disabled:cursor-not-allowed"
//             >
//               {loading ? "Creating..." : "Start Payment 💳"}
//             </button>
//           </div>
//         ) : (
//           <form onSubmit={handleSubmit} className="space-y-6">
//             {/* Card Preview */}
//             <div className="bg-gradient-to-r from-pink-600 to-rose-600 text-white p-6 sm:p-8 rounded-xl shadow-2xl relative overflow-hidden transform transition-transform hover:scale-105 duration-300 ">
//               <div className="flex justify-between items-start">
//                 <span className="text-xs uppercase tracking-wider opacity-70">
//                   {CARD_BRAND_LABELS[cardBrand] || "Card"}
//                 </span>
//                 <svg
//                   className="h-8 w-8 opacity-80"
//                   viewBox="0 0 24 24"
//                   fill="none"
//                   stroke="currentColor"
//                 >
//                   <path
//                     d="M3 10h18M7 15h1m4 0h1m4 0h1M9 4H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H9z"
//                     strokeWidth="2"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                   />
//                 </svg>
//               </div>
//               <div
//                 className="mt-6 text-2xl sm:text-3xl font-mono tracking-widest "
//                 style={{ marginBottom: 48 }}
//               >
//                 ●●●● ●●●● ●●●● {lastFour || "0000"}
//               </div>
//               <div className="absolute bottom-5 right-6 text-sm sm:text-base opacity-70 flex space-x-6">
//                 <div>
//                   <span className="opacity-50">Exp:</span> 12/29
//                 </div>
//                 <div>
//                   <span className="opacity-50">CVC:</span> ●●●
//                 </div>
//               </div>
//             </div>

//             {/* Card Brand Label */}
//             {cardBrand && cardBrand !== "unknown" && (
//               <div className="mt-2 text-center">
//                 <span className="text-sm font-semibold text-pink-700 bg-pink-100 px-3 py-1 rounded-full capitalize">
//                   {CARD_BRAND_LABELS[cardBrand] || cardBrand}
//                 </span>
//               </div>
//             )}

//             {/* Card Number */}
//             <div className="flex flex-col space-y-2">
//               <label className="block text-sm font-medium text-gray-700">
//                 Card Number
//               </label>
//               <div className="border border-pink-200 rounded-lg p-3 focus-within:ring-2 focus-within:ring-pink-400">
//                 <CardNumberElement
//                   options={elementStyles}
//                   onChange={(e) => updateCardPreview(e, "number")}
//                 />
//               </div>
//             </div>

//             {/* Expiry & CVC */}
//             <div className="grid grid-cols-2 gap-4">
//               <div className="flex flex-col space-y-2">
//                 <label className="block text-sm font-medium text-gray-700">
//                   Expiry
//                 </label>
//                 <div className="border border-pink-200 rounded-lg p-3 focus-within:ring-2 focus-within:ring-pink-400">
//                   <CardExpiryElement
//                     options={elementStyles}
//                     onChange={(e) => updateCardPreview(e, "expiry")}
//                   />
//                 </div>
//               </div>
//               <div className="flex flex-col space-y-2">
//                 <label className="block text-sm font-medium text-gray-700">
//                   CVC
//                 </label>
//                 <div className="border border-pink-200 rounded-lg p-3 focus-within:ring-2 focus-within:ring-pink-400">
//                   <CardCvcElement
//                     options={elementStyles}
//                     onChange={(e) => updateCardPreview(e, "cvc")}
//                   />
//                 </div>
//               </div>
//             </div>

//             {/* Pay Now Button */}
//             <button
//               type="submit"
//               disabled={
//                 !stripe ||
//                 loading ||
//                 !(cardNumberComplete && cardExpiryComplete && cardCvcComplete)
//               }
//               className="w-full bg-gradient-to-r from-rose-500 to-red-500 text-white py-3 rounded-full font-semibold hover:from-rose-600 hover:to-red-600 transition disabled:opacity-60 disabled:cursor-not-allowed"
//             >
//               {loading ? "Processing..." : "Pay Now 💖"}
//             </button>
//           </form>
//         )}

//         {/* Status Message */}
//         {message && (
//           <p
//             className={`mt-5 text-center font-medium  ${
//               message.startsWith("💖") ? "text-rose-600" : "text-red-600"
//             }`}
//           >
//             {message}
//           </p>
//         )}
//       </div>
//     </div>
//   );
// }

// export default function PaymentForm() {
//   return (
//     <Elements stripe={stripePromise}>
//       <CheckoutForm />
//     </Elements>
//   );
// }
























// import React, { useState } from "react";
// import { loadStripe } from "@stripe/stripe-js";
// import {
//   Elements,
//   CardNumberElement,
//   CardExpiryElement,
//   CardCvcElement,
//   useStripe,
//   useElements,
// } from "@stripe/react-stripe-js";
// import BaseUrl from "../utils/basUrl";

// const stripePromise = loadStripe(
//   "pk_test_51RbzQCLm5F77P240Yq2opl7ZFodKlGUlGDB1XkKLdjpeYv3Pv5H06G5jtBIUUhVr7JK86m4AnxPfdwHIxd3gK16t00Wvh4odqA"
// );

// const elementStyles = {
//   base: {
//     fontSize: "16px",
//     color: "#d946ef",
//     fontFamily: "Arial, sans-serif",
//     "::placeholder": {
//       color: "#fbcfe8",
//     },
//   },
//   invalid: {
//     color: "#be123c",
//     iconColor: "#be123c",
//   },
// };

// function CheckoutForm() {
//   const [amount, setAmount] = useState(10);
//   const [purpose, setPurpose] = useState("premium_upgrade");
//   const [clientSecret, setClientSecret] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");
//   const [userName, setUserName] = useState("");

//   const [cardNumberComplete, setCardNumberComplete] = useState(false);
//   const [cardExpiryComplete, setCardExpiryComplete] = useState(false);
//   const [cardCvcComplete, setCardCvcComplete] = useState(false);
//   const [cardBrand, setCardBrand] = useState("");
//   const [lastFour, setLastFour] = useState("");

//   const stripe = useStripe();
//   const elements = useElements();

//   const handleCreatePaymentIntent = async () => {
//     setLoading(true);
//     setMessage("");
//     try {
//       const res = await fetch(`${BaseUrl}api/payment/create-payment-intent`, {
//         method: "POST",
//         credentials: "include",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ amount, purpose }),
//       });
//       const data = await res.json();
//       if (!data.clientSecret) {
//         setMessage("💔 Failed to create payment intent.");
//         setLoading(false);
//         return;
//       }
//       setClientSecret(data.clientSecret || null);
//       setUserName(data.user?.name || "Guest");
//     } catch (err) {
//       console.error("Error creating payment intent:", err);
//       setMessage("💔 Failed to create payment intent.");
//     }
//     setLoading(false);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!stripe || !elements || !clientSecret) return;
//     setLoading(true);
//     setMessage("");
//     const { error, paymentIntent } = await stripe.confirmCardPayment(
//       clientSecret,
//       {
//         payment_method: {
//           card: elements.getElement(CardNumberElement),
//           billing_details: { name: userName },
//         },
//       }
//     );

//     if (error) {
//       setMessage(`💔 ${error.message}`);
//       setLoading(false);
//       return;
//     }

//     if (paymentIntent.status === "succeeded") {
//       try {
//         const confirmRes = await fetch(`${BaseUrl}api/payment/confirm-payment`, {
//           method: "POST",
//           credentials: "include",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ paymentIntentId: paymentIntent.id }),
//         });
//         const confirmData = await confirmRes.json();
//         setMessage(
//           confirmData.success
//             ? "💖 Payment successful! You're now premium."
//             : confirmData.message || "💔 Payment confirmation failed."
//         );
//       } catch (err) {
//         setMessage("💔 Error confirming payment.");
//       }
//     } else {
//       setMessage("💔 Payment not completed.");
//     }

//     setLoading(false);
//   };

//   const updateCardPreview = (element, type) => {
//     switch (type) {
//       case "number":
//         setCardNumberComplete(element.complete);
//         setCardBrand(element.brand || "");
//         setLastFour(element.value?.slice(-4) || "");
//         break;
//       case "expiry":
//         setCardExpiryComplete(element.complete);
//         break;
//       case "cvc":
//         setCardCvcComplete(element.complete);
//         break;
//       default:
//         break;
//     }
//   };

//   const CARD_BRAND_LABELS = {
//     visa: "Visa",
//     mastercard: "Mastercard",
//     amex: "American Express",
//     discover: "Discover",
//     diners: "Diners Club",
//     jcb: "JCB",
//     unionPay: "UnionPay",
//     rupay: "RuPay",
//     unknown: "Card",
//   };

//   return (
//     <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-pink-50 via-white to-rose-50 px-4 py-8">
//       <div className="w-full max-w-xl bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8">
//         <div className="text-center mb-6">
//           <div className="inline-flex items-center justify-center p-4 bg-gradient-to-br from-pink-500 to-rose-500 rounded-full shadow-lg">
//             💖
//           </div>
//           <h2 className="mt-4 text-3xl font-bold text-gray-800">
//             Upgrade to Premium
//           </h2>
//           <p className="text-sm text-gray-500 mt-1">Enjoy exclusive features!</p>
//         </div>

//         {!clientSecret ? (
//           <div className="space-y-6">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Amount (INR)
//               </label>
//               <input
//                 type="number"
//                 value={amount}
//                 onChange={(e) => setAmount(Number(e.target.value))}
//                 min="1"
//                 className="w-full border border-pink-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-pink-400 outline-none bg-white"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Purpose
//               </label>
//               <select
//                 value={purpose}
//                 onChange={(e) => setPurpose(e.target.value)}
//                 className="w-full border border-pink-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-pink-400 outline-none bg-white"
//               >
//                 <option value="premium_upgrade">Premium Upgrade ❤️</option>
//                 <option value="boost_profile">Boost Profile 🔥</option>
//               </select>
//             </div>

//             <button
//               onClick={handleCreatePaymentIntent}
//               disabled={loading}
//               className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white py-3 rounded-full font-semibold transition disabled:opacity-60"
//             >
//               {loading ? "Creating..." : "Start Payment 💳"}
//             </button>
//           </div>
//         ) : (
//           <form onSubmit={handleSubmit} className="space-y-6">
//             <div className="bg-gradient-to-r from-pink-500 to-rose-500 text-white p-6 rounded-xl shadow-md">
//               <div className="flex justify-between text-sm font-mono">
//                 <span>{CARD_BRAND_LABELS[cardBrand] || "Card"}</span>
//                 <span>•••• {lastFour || "0000"}</span>
//               </div>
//               <div className="mt-4 text-sm opacity-70 flex justify-between">
//                 <span>Exp: 12/29</span>
//                 <span>CVC: ●●●</span>
//               </div>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Card Number
//               </label>
//               <div className="border border-pink-300 rounded-lg px-4 py-3 focus-within:ring-2 focus-within:ring-pink-400">
//                 <CardNumberElement
//                   options={elementStyles}
//                   onChange={(e) => updateCardPreview(e, "number")}
//                 />
//               </div>
//             </div>

//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Expiry
//                 </label>
//                 <div className="border border-pink-300 rounded-lg px-4 py-3 focus-within:ring-2 focus-within:ring-pink-400">
//                   <CardExpiryElement
//                     options={elementStyles}
//                     onChange={(e) => updateCardPreview(e, "expiry")}
//                   />
//                 </div>
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   CVC
//                 </label>
//                 <div className="border border-pink-300 rounded-lg px-4 py-3 focus-within:ring-2 focus-within:ring-pink-400">
//                   <CardCvcElement
//                     options={elementStyles}
//                     onChange={(e) => updateCardPreview(e, "cvc")}
//                   />
//                 </div>
//               </div>
//             </div>

//             <button
//               type="submit"
//               disabled={
//                 !stripe ||
//                 loading ||
//                 !(cardNumberComplete && cardExpiryComplete && cardCvcComplete)
//               }
//               className="w-full bg-gradient-to-r from-rose-500 to-red-500 hover:from-rose-600 hover:to-red-600 text-white py-3 rounded-full font-semibold transition disabled:opacity-60"
//             >
//               {loading ? "Processing..." : "Pay Now 💖"}
//             </button>
//           </form>
//         )}

//         {message && (
//           <p
//             className={`mt-6 text-center font-semibold ${
//               message.startsWith("💖") ? "text-rose-600" : "text-red-600"
//             }`}
//           >
//             {message}
//           </p>
//         )}
//       </div>
//     </div>
//   );
// }

// export default function PaymentForm() {
//   return (
//     <Elements stripe={stripePromise}>
//       <CheckoutForm />
//     </Elements>
//   );
// }















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
//     <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-pink-50 via-white to-rose-50 px-4 py-8">
//       <ToastContainer position="top-center" />
//       <div className="w-full max-w-xl bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8">
//         <div className="text-center mb-6">
//           <div className="inline-flex items-center justify-center p-4 bg-gradient-to-br from-white to-rose-300 rounded-full shadow-lg">
//             💖
//           </div>
//           <h2 className="mt-4 text-3xl font-bold text-gray-800">
//             Upgrade to Premium
//           </h2>
//           <p className="text-sm text-gray-500 mt-1">Enjoy exclusive features!</p>
//         </div>
        

//         {!clientSecret ? (
//           <div className="space-y-6">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Amount (INR)
//               </label>
//               <input
//                 type="number"
//                 value={amount}//
//                 onChange={(e) => setAmount(Number(e.target.value))}
//                 min="1"
//                 className="w-full border border-pink-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-pink-400 outline-none bg-white"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Purpose
//               </label>
//               <select
//                 value={purpose}//
//                 onChange={(e) => setPurpose(e.target.value)}
//                 className="w-full border border-pink-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-pink-400 outline-none bg-white"
//               >
//                 <option value="premium_upgrade">Premium Upgrade ❤️</option>
                
//               </select>
//             </div>

//             <button
//               onClick={handleCreatePaymentIntent}
//               disabled={loading}
//               className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white py-3 rounded-full font-semibold transition disabled:opacity-60"
//             >
//               {loading ? "Creating..." : "Start Payment 💳"}
//             </button>
//           </div>
//         ) : (
//           // <form onSubmit={handleSubmit} className="space-y-6">
//           //   <div className="bg-gradient-to-r from-pink-500 to-rose-500 text-white p-6 rounded-xl shadow-md">
//           //     <div className="flex justify-between text-sm font-mono">
//           //       <span>{CARD_BRAND_LABELS[cardBrand] || "Card"}</span>
//           //       <span>•••• {lastFour || "0000"}</span>
//           //     </div>
//           //     <div className="mt-4 text-sm opacity-70 flex justify-between">
//           //       <span>Exp: 12/29</span>
//           //       <span>CVC: ●●●</span>
//           //     </div>
//           //   </div>

//           //   <div>
//           //     <label className="block text-sm font-medium text-gray-700 mb-1">
//           //       Card Number
//           //     </label>
//           //     <div className="border border-pink-300 rounded-lg px-4 py-3 focus-within:ring-2 focus-within:ring-pink-400">
//           //       <CardNumberElement
//           //         options={elementStyles}
//           //         onChange={(e) => updateCardPreview(e, "number")}
//           //       />
//           //     </div>
//           //   </div>

//           //   <div className="grid grid-cols-2 gap-4">
//           //     <div>
//           //       <label className="block text-sm font-medium text-gray-700 mb-1">
//           //         Expiry
//           //       </label>
//           //       <div className="border border-pink-300 rounded-lg px-4 py-3 focus-within:ring-2 focus-within:ring-pink-400">
//           //         <CardExpiryElement
//           //           options={elementStyles}
//           //           onChange={(e) => updateCardPreview(e, "expiry")}
//           //         />
//           //       </div>
//           //     </div>
//           //     <div>
//           //       <label className="block text-sm font-medium text-gray-700 mb-1">
//           //         CVC
//           //       </label>
//           //       <div className="border border-pink-300 rounded-lg px-4 py-3 focus-within:ring-2 focus-within:ring-pink-400">
//           //         <CardCvcElement
//           //           options={elementStyles}
//           //           onChange={(e) => updateCardPreview(e, "cvc")}
//           //         />
//           //       </div>
//           //     </div>
//           //   </div>

//           //   <button
//           //     type="submit"
//           //     disabled={
//           //       !stripe ||
//           //       loading ||
//           //       !(cardNumberComplete && cardExpiryComplete && cardCvcComplete)
//           //     }
//           //     className="w-full bg-gradient-to-r from-rose-500 to-red-500 hover:from-rose-600 hover:to-red-600 text-white py-3 rounded-full font-semibold transition disabled:opacity-60"
//           //   >
//           //     {loading ? "Processing..." : "Pay Now 💖"}
//           //   </button>
//           // </form>
//           <form onSubmit={handleSubmit} className="space-y-6">
//   <div className="bg-white border border-pink-200 text-gray-800 p-6 rounded-xl shadow-md">
//     <div className="flex justify-between text-sm font-mono">
//       <span className="text-pink-500">{CARD_BRAND_LABELS[cardBrand] || "Card"}</span>
//       <span className="text-gray-600">•••• {lastFour || "0000"}</span>
//     </div>
//     <div className="mt-4 text-sm text-gray-500 flex justify-between">
//       <span>Exp: 12/29</span>
//       <span>CVC: ●●●</span>
//     </div>
//   </div>

//   <div>
//     <label className="block text-sm font-medium text-gray-700 mb-1">
//       Card Number
//     </label>
//     <div className="border border-pink-300 bg-white rounded-lg px-4 py-3 focus-within:ring-2 focus-within:ring-pink-400 shadow-sm">
//       <CardNumberElement
//         options={elementStyles}
//         onChange={(e) => updateCardPreview(e, "number")}
//       />
//     </div>
//   </div>

//   <div className="grid grid-cols-2 gap-4">
//     <div>
//       <label className="block text-sm font-medium text-gray-700 mb-1">
//         Expiry
//       </label>
//       <div className="border border-pink-300 bg-white rounded-lg px-4 py-3 focus-within:ring-2 focus-within:ring-pink-400 shadow-sm">
//         <CardExpiryElement
//           options={elementStyles}
//           onChange={(e) => updateCardPreview(e, "expiry")}
//         />
//       </div>
//     </div>
//     <div>
//       <label className="block text-sm font-medium text-gray-700 mb-1">
//         CVC
//       </label>
//       <div className="border border-pink-300 bg-white rounded-lg px-4 py-3 focus-within:ring-2 focus-within:ring-pink-400 shadow-sm">
//         <CardCvcElement
//           options={elementStyles}
//           onChange={(e) => updateCardPreview(e, "cvc")}
//         />
//       </div>
//     </div>
//   </div>

//   <button
//     type="submit"
//     disabled={
//       !stripe ||
//       loading ||
//       !(cardNumberComplete && cardExpiryComplete && cardCvcComplete)
//     }
//     className="w-full bg-gradient-to-r from-pink-400 to-rose-400 hover:from-pink-500 hover:to-rose-500 text-white py-3 rounded-full font-semibold transition-all duration-300 shadow-md disabled:opacity-60"
//   >
//     {loading ? "Processing..." : "Pay Now 💖"}
//   </button>
// </form>

//         )}
//       </div>
//     </div>
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
