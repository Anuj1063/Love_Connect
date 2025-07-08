const transporter = require("../config/email.config");

const sendWelcomeEmail = async (user) => {
  console.log("Sending welcome email to:", user.email); 

await transporter.sendMail({
  from: `"LoveConnect" <${process.env.EMAIL_FROM || "no-reply@tinderweb.com"}>`,
  to: user.email,
  subject: "🎉 Registration Successful",
  html: `
  <table width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #f4f4f4; padding: 40px 0; font-family: 'Segoe UI', sans-serif;">
    <tr>
      <td align="center">
        <table width="500" cellpadding="0" cellspacing="0" style="background: #ffffff; padding: 40px; border-radius: 10px; box-shadow: 0 4px 14px rgba(0,0,0,0.1); text-align: center;">
          <tr>
            <td style="padding-bottom: 20px;">
              <img src="https://img.icons8.com/emoji/96/party-popper-emoji.png" alt="Success" width="64" height="64"/>
            </td>
          </tr>
          <tr>
            <td>
              <h2 style="color: #2ecc71; margin: 0;">Registration Successful</h2>
              <p style="font-size: 16px; color: #444; margin-top: 10px;">Hi <strong>${user.name}</strong>,</p>
              <p style="font-size: 15px; color: #555; line-height: 1.6;">
                Your email has been successfully verified, and your account is now fully active. <br/>
                You can now log in and start using all our features!
              </p>
              <div style="margin-top: 30px;">
                <a href="${process.env.CLIENT_URL || '#'}" style="display: inline-block; background-color: #2ecc71; color: #fff; text-decoration: none; padding: 12px 24px; border-radius: 5px; font-size: 15px;">Go to Dashboard</a>
              </div>
              <p style="margin-top: 40px; font-size: 13px; color: #888;">
                Thank you for joining Tender. <br/>
                — The LoveConnect Team
              </p>
              <p style="font-size: 11px; color: #ccc; margin-top: 30px;">&copy; 2025 Tender Inc. All rights reserved.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
  `,
});
};

module.exports = sendWelcomeEmail;
