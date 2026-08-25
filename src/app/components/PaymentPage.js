"use client";

import React, { useEffect, useState } from "react";
import Script from "next/script";
import {
  fetchuser,
  fetchpayments,
  initiate,
} from "../../../actions/useractions";
import { useSearchParams, useRouter } from "next/navigation";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PaymentPage = ({ username }) => {
  const [paymentform, setPaymentform] = useState({
    name: "",
    message: "",
    amount: "",
  });

  const [currentUser, setCurrentUser] = useState({});
  const [payments, setPayments] = useState([]);
  const [paying, setPaying] = useState(false);

  const searchParams = useSearchParams();
  const router = useRouter();

  // ==========================================
  // FETCH USER + PAYMENTS
  // ==========================================

  useEffect(() => {
    const loadData = async () => {
      try {
        const user = await fetchuser(username);

        if (!user) {
          toast.error("Creator not found");
          return;
        }

        setCurrentUser(user);

        const dbpayments = await fetchpayments(username);
        setPayments(dbpayments);
      } catch (error) {
        console.error(error);
        toast.error("Unable to load creator");
      }
    };

    loadData();
  }, [username]);


  // ==========================================
  // PAYMENT SUCCESS MESSAGE
  // ==========================================

  useEffect(() => {
    if (searchParams.get("paymentdone") === "true") {
      toast("Thanks for your donation! ☕", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
        transition: Bounce,
      });

      router.replace(`/${username}`);
    }
  }, [searchParams, username, router]);


  // ==========================================
  // FORM CHANGE
  // ==========================================

  const handleChange = (e) => {
    setPaymentform({
      ...paymentform,
      [e.target.name]: e.target.value,
    });
  };


  // ==========================================
  // PAYMENT
  // ==========================================

  const pay = async (amount) => {
    try {
      if (paying) return;

      // Check Razorpay setup
      if (
        !currentUser?.razorpayid ||
        !currentUser?.razorpaysecret
      ) {
        toast.error(
          "Razorpay is not configured for this creator."
        );
        return;
      }

      // Validate name/message
      if (paymentform.name.length < 3) {
        toast.error("Please enter your name.");
        return;
      }

      if (paymentform.message.length < 4) {
        toast.error("Please enter a message.");
        return;
      }

      setPaying(true);

      // ==========================================
      // CREATE RAZORPAY ORDER
      // ==========================================

      const order = await initiate(
        amount,
        username,
        paymentform
      );

      if (!order?.id) {
        throw new Error("Unable to create Razorpay order");
      }

      const orderId = order.id;


      // ==========================================
      // CHECK RAZORPAY SCRIPT
      // ==========================================

      if (!window.Razorpay) {
        toast.error(
          "Razorpay is still loading. Please try again."
        );

        setPaying(false);
        return;
      }


      // ==========================================
      // RAZORPAY OPTIONS
      // ==========================================

      const options = {
        key: currentUser.razorpayid,

        amount: amount,

        currency: "INR",

        name: "Get Me A Chai",

        description: `Support @${username}`,

        image: currentUser.profilepic || "/tea.gif",

        order_id: orderId,


        // ==========================================
        // PAYMENT SUCCESS
        // ==========================================

        handler: async function (response) {
          try {
            const result = await fetch("/api/razorpay", {
              method: "POST",

              headers: {
                "Content-Type": "application/json",
              },

              body: JSON.stringify({
                razorpay_payment_id:
                  response.razorpay_payment_id,

                razorpay_order_id:
                  response.razorpay_order_id,

                razorpay_signature:
                  response.razorpay_signature,
              }),
            });


            const data = await result.json();


            if (data.success) {
              toast.success(
                "Payment successful! Thank you ☕"
              );

              // Redirect after successful verification
              window.location.href =
                `/${username}?paymentdone=true`;
            } else {
              toast.error(
                data.message ||
                  "Payment verification failed."
              );
            }
          } catch (error) {
            console.error(
              "Payment verification error:",
              error
            );

            toast.error(
              "Payment verification failed."
            );
          } finally {
            setPaying(false);
          }
        },


        // ==========================================
        // PREFILL
        // ==========================================

        prefill: {
          name: paymentform.name,
        },


        // ==========================================
        // NOTES
        // ==========================================

        notes: {
          username: username,
          message: paymentform.message,
        },


        // ==========================================
        // THEME
        // ==========================================

        theme: {
          color: "#3399cc",
        },


        // ==========================================
        // MODAL CLOSE
        // ==========================================

        modal: {
          ondismiss: function () {
            setPaying(false);
          },
        },
      };


      // ==========================================
      // OPEN RAZORPAY
      // ==========================================

      const razorpay = new window.Razorpay(options);

      razorpay.open();

    } catch (error) {
      console.error("Payment error:", error);

      toast.error(
        error?.message ||
          "Something went wrong while starting payment."
      );

      setPaying(false);
    }
  };


  // ==========================================
  // CUSTOM PAYMENT
  // ==========================================

  const customPayment = () => {
    const amount = Number(paymentform.amount);

    if (!amount || amount <= 0) {
      toast.error("Please enter a valid amount.");
      return;
    }

    // Rupees → Paise
    pay(amount * 100);
  };


  // ==========================================
  // TOTAL RAISED
  // ==========================================

  const totalRaised = payments.reduce(
    (total, payment) => total + payment.amount,
    0
  );


  return (
    <>
      {/* Razorpay Checkout */}
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="afterInteractive"
      />


      {/* Toast */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="light"
      />


      {/* ==========================================
          COVER
      ========================================== */}

      <div className="relative w-full">

        <img
          className="object-cover w-full h-[250px] md:h-[350px] shadow-blue-700 shadow-sm"
          src={currentUser.coverpic || "/cover.gif"}
          alt="Cover"
        />


        {/* Profile */}

        <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 border-4 border-white overflow-hidden rounded-full w-32 h-32 md:w-36 md:h-36 bg-slate-800">

          <img
            className="rounded-full object-cover w-full h-full"
            src={
              currentUser.profilepic ||
              "/avatar.gif"
            }
            alt={username}
          />

        </div>

      </div>


      {/* ==========================================
          CREATOR INFO
      ========================================== */}

      <div className="text-center mt-24 mb-12 px-4">

        <div className="font-bold text-2xl">
          @{username}
        </div>

        <div className="text-slate-400 mt-2">
          Let&apos;s help {username} get a chai! ☕
        </div>

        <div className="text-slate-400 mt-2">
          {payments.length} Payments · ₹
          {totalRaised} raised
        </div>

      </div>


      {/* ==========================================
          MAIN SECTION
      ========================================== */}

      <div className="max-w-6xl mx-auto px-4 pb-16">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">


          {/* ======================================
              SUPPORTERS
          ====================================== */}

          <div className="bg-slate-900 rounded-2xl text-white p-5 md:p-8 border border-slate-700 shadow-lg">

            <h2 className="text-2xl font-bold mb-6">
              Recent Supporters
            </h2>


            {payments.length === 0 ? (

              <div className="text-slate-400 text-center py-10">

                No payments yet.

                <br />

                Be the first one to support {username}!

              </div>

            ) : (

              <ul className="space-y-4">

                {payments.map((payment, index) => (

                  <li
                    key={
                      payment._id || index
                    }
                    className="flex gap-3 items-center p-3 rounded-lg hover:bg-slate-800 transition-colors duration-100"
                  >

                    <img
                      src="/avatar.gif"
                      alt={payment.name}
                      className="w-11 h-11 rounded-full object-cover border border-slate-600"
                    />


                    <div className="min-w-0">

                      <div className="font-medium">
                        {payment.name}
                      </div>

                      <div className="text-sm text-slate-400">

                        Donated{" "}

                        <span className="text-white font-semibold">
                          ₹{payment.amount}
                        </span>

                      </div>


                      {payment.message && (

                        <div className="text-sm text-slate-500 mt-1 truncate">

                          &quot;{payment.message}&quot;

                        </div>

                      )}

                    </div>

                  </li>

                ))}

              </ul>

            )}

          </div>


          {/* ======================================
              MAKE PAYMENT
          ====================================== */}

          <div className="bg-slate-900 rounded-2xl text-white p-5 md:p-8 border border-slate-700 shadow-lg">

            <h2 className="text-2xl font-bold mb-2">
              Make a Payment
            </h2>

            <p className="text-slate-400 text-sm mb-6">
              Support @{username} with a chai ☕
            </p>


            {/* NAME */}

            <div className="mb-4">

              <label className="block text-sm font-medium text-slate-300 mb-2">
                Name
              </label>

              <input
                onChange={handleChange}
                value={paymentform.name}
                name="name"
                type="text"
                placeholder="Enter your name"
                className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700 outline-none focus:border-purple-500 transition"
              />

            </div>


            {/* MESSAGE */}

            <div className="mb-4">

              <label className="block text-sm font-medium text-slate-300 mb-2">
                Message
              </label>

              <textarea
                onChange={handleChange}
                value={paymentform.message}
                name="message"
                rows="3"
                placeholder="Write a message..."
                className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700 outline-none focus:border-purple-500 transition resize-none"
              />

            </div>


            {/* CUSTOM AMOUNT */}

            <div className="mb-5">

              <label className="block text-sm font-medium text-slate-300 mb-2">
                Amount
              </label>

              <div className="flex items-center bg-slate-800 border border-slate-700 rounded-lg overflow-hidden">

                <span className="px-4 text-slate-400">
                  ₹
                </span>

                <input
                  onChange={handleChange}
                  value={paymentform.amount}
                  name="amount"
                  type="number"
                  min="1"
                  placeholder="Enter amount"
                  className="w-full p-3 bg-transparent outline-none text-white placeholder:text-slate-500"
                />

              </div>

            </div>


            {/* PAY CUSTOM */}

            <button
              onClick={customPayment}
              type="button"
              disabled={
                paying ||
                paymentform.name.length < 3 ||
                paymentform.message.length < 4 ||
                !paymentform.amount
              }
              className="w-full text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl font-medium rounded-lg text-sm px-5 py-3 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {paying
                ? "Processing..."
                : `Pay ₹${paymentform.amount || "0"}`}
            </button>


            {/* PRESET AMOUNTS */}

            <div className="mt-6">

              <p className="text-sm text-slate-400 mb-3">
                Or choose an amount
              </p>


              <div className="grid grid-cols-3 gap-2">

                <button
                  type="button"
                  disabled={paying}
                  onClick={() => pay(1000)}
                  className="bg-slate-800 border border-slate-700 p-3 rounded-lg hover:bg-slate-700 transition disabled:opacity-50"
                >
                  ₹10
                </button>


                <button
                  type="button"
                  disabled={paying}
                  onClick={() => pay(2000)}
                  className="bg-slate-800 border border-slate-700 p-3 rounded-lg hover:bg-slate-700 transition disabled:opacity-50"
                >
                  ₹20
                </button>


                <button
                  type="button"
                  disabled={paying}
                  onClick={() => pay(3000)}
                  className="bg-slate-800 border border-slate-700 p-3 rounded-lg hover:bg-slate-700 transition disabled:opacity-50"
                >
                  ₹30
                </button>

              </div>

            </div>

          </div>

        </div>

      </div>
    </>
  );
};

export default PaymentPage;