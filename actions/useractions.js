"use server";

import Razorpay from "razorpay";
import Payment from "../model/payments";
import connectDb from "../db/connectDb";
import User from "../model/User";


// ==========================================
// CREATE RAZORPAY ORDER
// ==========================================

export const initiate = async (amount, to_username, paymentform) => {
  await connectDb();

  // Find creator
  const user = await User.findOne({
    username: to_username,
  });

  if (!user) {
    throw new Error("Creator not found");
  }

  // Check Razorpay credentials
  if (!user.razorpayid || !user.razorpaysecret) {
    throw new Error(
      "Razorpay is not configured for this creator"
    );
  }

  // Create Razorpay instance
  const instance = new Razorpay({
    key_id: user.razorpayid,
    key_secret: user.razorpaysecret,
  });

  // Amount is in paise
  const options = {
    amount: Number.parseInt(amount),
    currency: "INR",
  };

  // Create Razorpay order
  const order = await instance.orders.create(options);

  // Create pending payment in MongoDB
  await Payment.create({
    oid: order.id,
    amount: amount / 100,
    to_user: to_username,
    name: paymentform.name,
    message: paymentform.message,
    done: false,
  });

  return order;
};


// ==========================================
// FETCH USER
// ==========================================

export const fetchuser = async (username) => {
  await connectDb();

  const user = await User.findOne({
    username: username,
  });

  if (!user) {
    return null;
  }

  return user.toObject({
    flattenObjectIds: true,
  });
};


// ==========================================
// FETCH PAYMENTS
// ==========================================

export const fetchpayments = async (username) => {
  await connectDb();

  const payments = await Payment.find({
    to_user: username,
    done: true,
  })
    .sort({
      amount: -1,
    })
    .limit(10)
    .lean();

  return payments;
};


// ==========================================
// UPDATE USER PROFILE
// ==========================================

export const updateProfile = async (data, oldusername) => {
  await connectDb();

  // Convert FormData into normal object
  const ndata = Object.fromEntries(data);

  // Check if username is being changed
  if (oldusername !== ndata.username) {

    // Check whether new username already exists
    const existingUser = await User.findOne({
      username: ndata.username,
    });

    if (existingUser) {
      return {
        error: "Username already exists",
      };
    }

    // Update user
    await User.updateOne(
      {
        username: oldusername,
      },
      {
        $set: ndata,
      }
    );

    // Update username in all payments
    await Payment.updateMany(
      {
        to_user: oldusername,
      },
      {
        $set: {
          to_user: ndata.username,
        },
      }
    );
  }

  // Username is not changed
  else {

    await User.updateOne(
      {
        username: oldusername,
      },
      {
        $set: ndata,
      }
    );
  }

  return {
    success: true,
  };
};