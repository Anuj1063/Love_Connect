const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  amount: Number,
  currency: String,
  status: String,
  purpose: String,
  stripePaymentIntentId: String,
  //receiptUrl: String,
}, { timestamps: true,versionKey:false });

module.exports = mongoose.model("Payment", paymentSchema);

