const express = require("express");
const router = express.Router();
const PaymentController= require('../../module/payments/controller/payment.controller')
const authCheck = require("../../middleware/auth.middleware")();

router.post("/create-payment-intent", authCheck.authenticateAPI, PaymentController.createPaymentIntent);
router.post("/confirm-payment", authCheck.authenticateAPI,PaymentController.confirmPayment);

module.exports = router;

