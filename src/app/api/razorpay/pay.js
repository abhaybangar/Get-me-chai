import crypto from "crypto";
import { NextResponse } from "next/server";
import connectDb from "../../../../db/connectDb";
import User from "../../../../model/User";
import Payment from "../../../../model/payments";

export async function POST(req) {
  try {
    const body = await req.json();

    const {
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature,
    } = body;

    if (
      !razorpay_payment_id ||
      !razorpay_order_id ||
      !razorpay_signature
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing Razorpay payment details",
        },
        { status: 400 }
      );
    }

    await connectDb();

    // Find the pending payment created by initiate()
    const payment = await Payment.findOne({
      oid: razorpay_order_id,
    });

    if (!payment) {
      return NextResponse.json(
        {
          success: false,
          message: "Payment order not found",
        },
        { status: 404 }
      );
    }

    // Find creator
    const user = await User.findOne({
      username: payment.to_user,
    });

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "Creator not found",
        },
        { status: 404 }
      );
    }

    // Generate signature using creator's Razorpay secret
    const generatedSignature = crypto
      .createHmac("sha256", user.razorpaysecret)
      .update(
        `${razorpay_order_id}|${razorpay_payment_id}`
      )
      .digest("hex");

    // Verify Razorpay signature
    if (generatedSignature !== razorpay_signature) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid payment signature",
        },
        { status: 400 }
      );
    }

    // Payment verified successfully
    await Payment.findOneAndUpdate(
      {
        oid: razorpay_order_id,
      },
      {
        $set: {
          done: true,
        },
      }
    );

    return NextResponse.json({
      success: true,
      message: "Payment verified successfully",
    });

  } catch (error) {
    console.error("Razorpay verification error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Payment verification failed",
      },
      { status: 500 }
    );
  }
}
