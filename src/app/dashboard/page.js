"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";

const Dashboard = () => {
  const { data: session, status } = useSession();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    username: "",
    rozorpayid: "",
    rozorpaysecret: "",
  });

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (!session) {
    return <div>Please login first.</div>;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="min-h-screen text-white px-6 py-10">

      <div className="max-w-3xl mx-auto">

        <h1 className="text-3xl font-bold mb-8">
          Dashboard
        </h1>

        <div className="bg-slate-900/70 border border-slate-700 rounded-2xl p-6 shadow-lg">

          {/* Profile Photo */}
          <div className="flex items-center gap-5 mb-8">

            <img
              src={session.user.image || "/avatar.gif"}
              alt={session.user.name || "Profile"}
              className="w-20 h-20 rounded-full object-cover border-2 border-slate-600"
            />

            <div>
              <h2 className="text-xl font-bold">
                {session.user.name}
              </h2>

              <p className="text-slate-400">
                Creator Profile
              </p>
            </div>

          </div>


          {/* Name */}
          <div className="mb-5">
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Name
            </label>

            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 outline-none text-white"
            />
          </div>


          {/* Email */}
          <div className="mb-5">
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 outline-none text-white"
            />
          </div>


          {/* Phone Number */}
          <div className="mb-5">
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Phone Number
            </label>

            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 outline-none text-white placeholder:text-slate-500"
            />
          </div>


          {/* Username */}
          <div className="mb-5">
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Username
            </label>

            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder="Enter your username"
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 outline-none text-white placeholder:text-slate-500"
            />
          </div>


          {/* Razorpay */}
          <div className="mt-8 pt-6 border-t border-slate-700">

            <h2 className="text-xl font-bold mb-5">
              Razorpay Payment Details
            </h2>


            {/* Razorpay Key ID */}
            <div className="mb-5">
              <label
                htmlFor="rozorpayid"
                className="block text-sm font-medium text-slate-300 mb-2"
              >
                Razorpay Key ID
              </label>

              <input
                id="rozorpayid"
                type="text"
                name="rozorpayid"
                value={form.rozorpayid}
                onChange={handleChange}
                placeholder="rzp_test_xxxxxxxxxx"
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 outline-none text-white placeholder:text-slate-500"
              />
            </div>


            {/* Razorpay Secret */}
            <div className="mb-5">
              <label
                htmlFor="rozorpaysecret"
                className="block text-sm font-medium text-slate-300 mb-2"
              >
                Razorpay Secret
              </label>

              <input
                id="rozorpaysecret"
                type="password"
                name="rozorpaysecret"
                value={form.rozorpaysecret}
                onChange={handleChange}
                placeholder="Enter Razorpay secret"
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 outline-none text-white placeholder:text-slate-500"
              />
            </div>

          </div>


          {/* Save */}
          <button
            type="button"
            className="w-full mt-6 text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl font-medium rounded-lg text-sm px-5 py-3 transition"
          >
            Save Changes
          </button>

        </div>

      </div>

    </div>
  );
};

export default Dashboard;