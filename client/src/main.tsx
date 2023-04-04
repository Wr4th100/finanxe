import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import authReducer from "./state";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const store = configureStore({
  reducer: authReducer,
});

export const stripePromise = loadStripe(
  "pk_test_51Mpj6lSAeimixS6eFOot75DZTkwb8v1SzxF9GSjubuiG5IAC8GgORTks47fdNTBikYkOHsdgpGi6a3JfpIUbcyg900HF8rN1Yz"
);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={store}>
    <Elements stripe={stripePromise}>
      <App />
    </Elements>
  </Provider>
);

// ReactDOM.render(
//   <Provider store={store}>
//     <Elements stripe={stripePromise}>
//      <App />
//     </Elements>
//   </Provider>
// )
