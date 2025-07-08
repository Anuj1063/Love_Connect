const authRepository = require("../repositories/auth.repositories");
const sendEmailVerificationOTP = require("../../../helper/sendVerificationOTPmail");
const successfullyRegistration = require("../../../helper/successfullRegistration");
const transporter = require("../../../config/email.config");
const profileModel = require("../../profile/model/profile.model");
const profileRepositories = require("../../profile/repositories/profile.repositories");

const {
  signupSchema,
  signinSchema,
  verifyOtpSchema,
} = require("../../../validator/auth.validator");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const CryptoJS = require("crypto-js");

class AuthController {
  async signUp(req, res) {
    try {
      const { error, value } = signupSchema.validate(req.body, {
        abortEarly: false,
      });
      if (error) {
        const messages = error.details.map((detail) => detail.message);
        return res.status(400).send({
          status: 400,
          data: {},
          message: messages,
        });
      }

      const { name, email, password } = value;

      const existingUser = await authRepository.findUserByEmail(email);
      if (existingUser) {
        if (existingUser.isVerified) {
          return res.status(400).json({
            status: false,
            message: "Email Already Exists",
          });
        } else {
          await authRepository.deleteUserById(existingUser._id);
        }
      }
 
      // Hash password
      const hashPassword = await bcrypt.hash(password, 10);

      // Base user data
      const userData = {
        name,
        email,
        password: hashPassword,
      };

      // Create user
      const user = await authRepository.createUser(userData);

      sendEmailVerificationOTP(user);

      return res.status(200).json({
        success: true,
        message: "Registered Successfully. OTP sent to your mail",
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
        },
      });
    } catch (error) {
      console.error("Error in signupUser:", error);
      return res.status(500).json({ success: false, message: "Server error" });
    }
  }

  async verifyOtp(req, res) {
    try {
      const { error, value } = verifyOtpSchema.validate(req.body, {
        abortEarly: false,
      });
      if (error) {
        const messages = error.details.map((detail) => detail.message);
        return res.status(400).send({
          status: 400,
          data: {},
          message: messages,
        });
      }

      const { email, otp } = value;

      const user = await authRepository.findUserByEmail(email);

      if (!user) {
        return res
          .status(404)
          .json({ status: false, message: "Email not registered" });
      }
      if (user.isVerified) {
        return res
          .status(400)
          .json({ status: false, message: "Email already verified" });
      }

      const otpRecord = await authRepository.otpRecord(user._id, otp);

      if (!otpRecord) {
        return res.status(400).json({ status: false, message: "Invalid OTP" });
      }

      const isExpired =
        new Date() > new Date(otpRecord.createdAt.getTime() + 15 * 60 * 1000);
      if (isExpired) {
        await sendEmailVerificationOTP(user);
        return res
          .status(400)
          .json({ status: false, message: "OTP expired, new OTP sent" });
      }

      await authRepository.markUserVerified(user._id);
      await successfullyRegistration(user);
      await authRepository.deleteUserOtps(user._id);

      return res
        .status(200)
        .json({ status: true, message: "Email verified successfully" });
    } catch (error) {
      console.error("Error in verifyOtp:", error);
      return res
        .status(500)
        .json({ status: false, message: "Internal server error" });
    }
  }
  async resendOtp(req, res) {
    try {
      const { email } = req.body;

      const user = await authRepository.findUserByEmail(email);

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      if (user.isVerified) {
        return res.status(400).json({
          success: false,
          message: "User is already verified",
        });
      }

      await authRepository.deleteUserOtps(user._id);

      await sendEmailVerificationOTP(user);

      return res.status(200).json({
        success: true,
        message: "New OTP sent successfully",
      });
    } catch (error) {
      console.error("Error in resendOtp:", error);
      return res.status(500).json({
        success: false,
        message: "Server error",
      });
    }
  }

  async signIn(req, res) {
    try {
      const { error, value } = signinSchema.validate(req.body, {
        abortEarly: false,
      });

      if (error) {
        const messages = error.details.map((detail) => detail.message);
        return res.status(400).send({
          status: 400,
          data: {},
          message: messages,
        });
      }

      const { email, password } = value;
      let existingUser = await authRepository.findUserByEmail(email);

  if (!existingUser) {
        return res.status(400).json({
          status: false,
          message: "Invalid credentials",
        });
      }

      if (existingUser.isDeleted) {
        res.status(400).json({
          success: false,
          message: "contact admin your account is deleted",
        });
      }

     

      if (!existingUser.isVerified) {
        return res.status(400).json({
          status: false,
          message: "Please verify your account before signing in",
        });
      }

      const isMatch = await bcrypt.compare(password, existingUser.password);

      if (isMatch) {
        const jwtToken = jwt.sign(
          { userId: existingUser._id },

          process.env.JWT_SECRET,
          { expiresIn: "5d" }
        );

        const cryptoToken = CryptoJS.AES.encrypt(
          jwtToken,
          process.env.CRYPTO_SECRET
        ).toString();

        // ✅ Set cookie (HTTP-only to protect from XSS)
        res.cookie("auth_token", cryptoToken, {
          httpOnly: true, // Cannot be accessed by frontend JS
          secure: process.env.NODE_ENV === "production", // Only over HTTPS in prod
          sameSite: "Strict", // Helps prevent CSRF
          maxAge: 5 * 24 * 60 * 60 * 1000, // 5 days
        });

        return res.status(200).json({
          status: true,
          message: "Sign in Successfully !! ",
          cryptoToken,
          user: {
            _id: existingUser._id,
            name: existingUser.name,
            email: existingUser.email,
            isVerified: existingUser.isVerified,
            role: existingUser.role,
            isPremium: existingUser.isPremium,
          },
        });
      } else {
        return res.status(400).json({
          status: false,
          message: "Invalid credentials",
        });
      }
    } catch (error) {
      console.error("Error in signinUser:", error);
      return res.status(500).json({ success: false, message: "Server error" });
    }
  }

  async forgetPassword(req, res) {
    try {
      const { email } = req.body;
      const user = await authRepository.findUserByEmail(email);

      if (!user) return res.status(404).json({ message: "User not found" });

      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: "15m",
      });
      // const link = `${process.env.LOCAL_PORT_URL}/reset-password/${token}`;

      const link = `${process.env.CLIENT_URL}/auth/reset-password/${token}`;

      await transporter.sendMail({
        from: `"LoveConnect" <${
          process.env.EMAIL_FROM || "no-reply@tinderweb.com"
        }>`,
        to: email,
        subject: "🔒 Password Reset Request",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #ddd; padding: 20px; border-radius: 8px;">
            <h2 style="color: #007BFF;">🔐 Reset Your Password</h2>
            <p><strong>Hello ${user.name},</strong></p>
  
            <p>We received a request to reset your password. Click the button below to proceed:</p>
  
            <div style="text-align: center; margin: 20px 0;">
              <a href="${link}" style="display: inline-block; padding: 12px 24px; background-color: #007BFF; color: #fff; text-decoration: none; border-radius: 5px; font-weight: bold;">
                Reset Password
              </a>
            </div>
  
            <p>This link is valid for <strong>1 hour</strong>. If you did not request a password reset, you can safely ignore this email.</p>
  
            <p style="margin-top: 30px;">Thanks for using Tinder!</p>
            <p>— Team Expensio</p>
  
            <hr style="margin-top: 40px;">
            <small style="color: #888;">This is an automatically generated email. Please do not reply.</small><br>
            <small style="color: #888;">© 2025 Team Expensio. All rights reserved.</small><br>
            <small style="color: #888;">Powered by Subhomoy • Version 1.0</small>
          </div>
          `,
      });

      return res.status(200).json({ message: "Mail sent to your mail" });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Server Error", error: error.message });
    }
  }

  async resetPassword(req, res) {
    try {
      const { token } = req.params;
      const { newPassword, confirmPassword } = req.body;

      if (newPassword !== confirmPassword) {
        return res.status(400).json({ message: "Passwords do not match" });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await authRepository.findUserById(decoded.userId);

      if (!user) return res.status(404).json({ message: "User not found" });

      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
      await user.save();

      return res.status(200).json({ message: "Password reset successfully" });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Server error", error: error.message });
    }
  }

  async reportUser(req, res) {
    try {
      const reporterId = req.user._id;
      const reportedUserId = req.params.targetUserId;
      const { reason } = req.body;

      if (reporterId.toString() === reportedUserId) {
        return res.status(400).json({ message: "You cannot report yourself." });
      }

      const reportedUser = await authRepository.reportUser(
        reportedUserId,
        reporterId,
        reason
      );

      res.status(200).json({
        success: true,
        message: "User reported successfully.",
        data: reportedUser.reports,
      });
    } catch (error) {
      res.status(500).json({
        message: "Failed to report user",
        error: error.message,
      });
    }
  }

  async getReportedUsers(req, res) {
    try {
      const users = await authRepository.getReportedUsers();
      res.status(200).json({
        success: true,
        message: "Reported users fetched successfully",
        data: users,
      });
    } catch (error) {
      res.status(500).json({
        message: "Error fetching reported users",
        error: error.message,
      });
    }
  }

  ///////

  async deleteAccount(req, res) {
    try {
      const userId = req.user._id;

      // Optional: get profile & delete images
      const profile = await profileModel.findOne({ userId });

      // if (profile?.profileImages?.length) {
      //   profile.profileImages.forEach((img)=>deleteFile("uploads/profile",img))

      // }

      await profileRepositories.deleteUserData(profile.userId);

      return res.status(200).json({
        success: true,
        message: "Account deleted successfully (soft + hard).",
      });
    } catch (err) {
      console.error("Delete error:", err);
      return res.status(500).json({ success: false, message: "Server error" });
    }
  }

  //////////////////

  async updatePassword(req, res) {
    try {
      const userId = req.user._id;
      const { currentPassword, newPassword } = req.body;

      // Get user from DB
      console.log(userId);
      const user = await authRepository.findUserById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Check if old password matches
      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isMatch) {
        return res
          .status(400)
          .json({ message: "Current password is incorrect" });
      }

      // Hash new password
      const hashedNewPassword = await bcrypt.hash(newPassword, 10);

      // Update user password
      await authRepository.updateUserPassword(userId, hashedNewPassword);

      return res.status(200).json({ message: "Password updated successfully" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Server error" });
    }
  }
}

module.exports = new AuthController();
