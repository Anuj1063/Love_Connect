const transporter = require('../Config/emailConfig');

async function sendRegistrationMail(user, verificationLink) {
  try {
    await transporter.sendMail({
      from: `Love Connect ❤️ <${process.env.EMAIL_FROM}>`,
      to: user.email,
      subject: 'Verify your Love Connect account',
      html: `
        <p>Hi ${user.name},</p>
        <p>Welcome to <strong>Love Connect</strong> — where meaningful connections begin.</p>
        <p>Please confirm your email address to activate your account:</p>
        <p><a href="${verificationLink}" style="color:#e91e63;">Verify your email</a></p>
        <p>If you didn’t sign up, feel free to ignore this message.</p>
        <p>With ❤️,<br>The Love Connect Team</p>
      `,
    });
    console.log('Love Connect verification email sent successfully');
  } catch (error) {
    console.error('Failed to send Love Connect email:', error);
    throw new Error('Failed to send Love Connect verification email');
  }
}

module.exports = { sendRegistrationMail };