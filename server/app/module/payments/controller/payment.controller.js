const Stripe = require("stripe");
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const Payment = require("../model/payment.model");
const User = require("../../user/model/user.model");

 
class PaymentController{
    createPaymentIntent = async (req, res) => {
  try {
    const { amount, purpose } = req.body;
    const userId = req.user._id;

    // Input validation
    if (!amount || typeof amount !== "number" || amount <= 0) {
      return res.status(400).json({ error: "Valid amount required" });
    }
   

    
    if (!purpose || typeof purpose !== "string") {
      return res.status(400).json({ error: "Purpose is required" });
    }
 const user=await User.findOne({_id:userId})
 
 
    const intent = await stripe.paymentIntents.create({
      amount: amount * 100,
      currency: "inr",
      metadata: { userId: userId.toString(), purpose }
    });

    res.json({ clientSecret: intent.client_secret ,user:{
        name:user.name,
        email:user.email,
        role:user.role
    }});
  } catch (err) {
    console.error("Stripe Error:", err);
    res.status(500).json({ error: "Payment creation failed" });
  }
};

confirmPayment = async (req, res) => {
  try {
    const { paymentIntentId } = req.body;
    const userId = req.user._id;

    // Input validation
    if (!paymentIntentId || typeof paymentIntentId !== "string") {
      return res.status(400).json({ success: false, message: "Invalid payment intent ID" });
    }

    const intent = await stripe.paymentIntents.retrieve(paymentIntentId);

    if (intent.status !== "succeeded") {
      return res.status(400).json({ success: false, message: "Payment not completed" });
    }

    const existing = await Payment.findOne({ stripePaymentIntentId: paymentIntentId });
    if (existing) {
      return res.status(200).json({ success: true, message: "Already recorded", premium: true });
    }

    // Save payment record
    await Payment.create({
      userId,
      amount: intent.amount / 100,
      currency: intent.currency,
      status: intent.status,
      purpose: intent.metadata?.purpose || "unknown",
      stripePaymentIntentId: intent.id,
     // receiptUrl: intent.charges?.data?.[0]?.receipt_url || null
    });


    // Update user to premium
    await User.findByIdAndUpdate(userId, { isPremium: true });

    res.status(200).json({ success: true, message: "Payment recorded and premium unlocked!", premium: true });

  } catch (err) {
    console.error("Payment Confirm Error:", err);
    res.status(500).json({ success: false, message: "Error confirming payment" });
  }
};



}


module.exports= new PaymentController()