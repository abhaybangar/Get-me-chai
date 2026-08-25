"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { fetchuser, updateProfile } from "../../../actions/useractions";

const Dashboard = () => {
  const { data: session, status } = useSession();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    username: "",
    profilepic: "",
    coverpic: "",
    razorpayid: "",
    razorpaysecret: "",
  });
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const loadProfile = async () => {
      if (!session?.user?.name) {
        return;
      }

      const user = await fetchuser(session.user.name);

      setForm({
        name: user.name || "",
        email: user.email || session.user.email || "",
        phone: user.phone || "",
        username: user.username || session.user.name || "",
        profilepic: user.profilepic || session.user.image || "",
        coverpic: user.coverpic || "",
        razorpayid: user.razorpayid || "",
        razorpaysecret: user.razorpaysecret || "",
      });
    };

    loadProfile();
  }, [session]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage("");

    const data = new FormData(e.currentTarget);
    const result = await updateProfile(data, session.user.name);

    if (result?.error) {
      setMessage(result.error);
    } else {
      setMessage("Profile saved.");
    }

    setIsSaving(false);
  };

  return (
    <div className="min-h-screen text-white px-6 py-10">

      <div className="max-w-3xl mx-auto">

        <h1 className="text-3xl font-bold mb-8">
          Dashboard
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-slate-900/70 border border-slate-700 rounded-2xl p-6 shadow-lg"
        >

          {/* Cover Banner */}
          <div className="mb-8 overflow-hidden rounded-xl border border-slate-700 bg-slate-800">
            <img
              src={form.coverpic || "/cover.gif"}
              alt="Cover banner"
              className="h-44 w-full object-cover"
            />
          </div>

          {/* Profile Photo */}
          <div className="flex items-center gap-5 mb-8">

            <img
              src={form.profilepic || session.user.image || "/avatar.gif"}
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
              id="name"
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
              id="email"
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
              id="phone"
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
              id="username"
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder="Enter your username"
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 outline-none text-white placeholder:text-slate-500"
            />
          </div>


          {/* Profile Image */}
          <div className="mb-5">
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Profile Image URL
            </label>

            <input
              id="profilepic"
              type="url"
              name="profilepic"
              value={form.profilepic}
              onChange={handleChange}
              placeholder="https://example.com/avatar.jpg"
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 outline-none text-white placeholder:text-slate-500"
            />
          </div>


          {/* Cover Image */}
          <div className="mb-5">
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Cover Banner URL
            </label>

            <input
              id="coverpic"
              type="url"
              name="coverpic"
              value={form.coverpic}
              onChange={handleChange}
              placeholder="https://example.com/banner.jpg"
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
                htmlFor="razorpayid"
                className="block text-sm font-medium text-slate-300 mb-2"
              >
                Razorpay Key ID
              </label>

              <input
                id="razorpayid"
                type="text"
                name="razorpayid"
                value={form.razorpayid}
                onChange={handleChange}
                placeholder="rzp_test_xxxxxxxxxx"
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 outline-none text-white placeholder:text-slate-500"
              />
            </div>


            {/* Razorpay Secret */}
            <div className="mb-5">
              <label
                htmlFor="razorpaysecret"
                className="block text-sm font-medium text-slate-300 mb-2"
              >
                Razorpay Secret
              </label>

              <input
                id="razorpaysecret"
                type="password"
                name="razorpaysecret"
                value={form.razorpaysecret}
                onChange={handleChange}
                placeholder="Enter Razorpay secret"
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 outline-none text-white placeholder:text-slate-500"
              />
            </div>

          </div>

          {message && (
            <p className="mt-6 text-sm text-slate-300">
              {message}
            </p>
          )}


          {/* Save */}
          <button
            type="submit"
            disabled={isSaving}
            className="w-full mt-6 text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl font-medium rounded-lg text-sm px-5 py-3 transition"
          >
            {isSaving ? "Saving..." : "Save Changes"}
          </button>

        </form>

      </div>

    </div>
  );
};

export default Dashboard;
