const  transporter  = require("../config/email.config")
const otpVerifyModel=require('../module/user/model/otp.model')

const sendEmailVerificationOTP=async( user)=>{
    if (!user || !user.email) {
        
        throw new Error("Recipient email not found");
      }
    // Generate a random 4-digit number
  const otp = Math.floor(1000 + Math.random() * 9000);

  // create OTP in Database
  const otpRecord=await otpVerifyModel.create({ userId: user._id, otp: otp })
 
  console.log(otpRecord,"Otp Record")

  

 
await transporter.sendMail({
    from: `"LoveConnect" <${process.env.EMAIL_FROM || "no-reply@tinderweb.com"}>`,
  to: user.email,
  subject: "Verify Your Email - Tender OTP",
  html: `
    <div style="font-family: 'Segoe UI', sans-serif; max-width: 480px; margin: auto; background: #fff; padding: 30px; border-radius: 12px; box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08); text-align: center;">
      <h2 style="color: #ff5864; margin-bottom: 10px;">Welcome to LoveConnect ❤️</h2>
      <p style="font-size: 16px; color: #333;">Hi ${user.name},</p>
      <p style="font-size: 15px; color: #555;">Thanks for signing up! Use the OTP below to verify your email and activate your account:</p>
      <div style="font-size: 28px; letter-spacing: 6px; font-weight: 600; background: #f0f0f0; padding: 12px 0; margin: 20px 0; border-radius: 10px;">${otp}</div>
      <p style="font-size: 14px; color: #777;">This OTP is valid for <strong>15 minutes</strong>.</p>
      <p style="font-size: 13px; color: #aaa;">If you didn't request this, feel free to ignore it.</p>
      <div style="margin-top: 30px; font-size: 12px; color: #ccc;">&copy; 2025 Tender Inc.</div>
    </div>
  `
});

  return otp
}




module.exports = sendEmailVerificationOTP