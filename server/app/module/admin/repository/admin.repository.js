const userModel = require("../../user/model/user.model");

const nodemailer = require("nodemailer");


class userDetails{

    async  findAllUsers()  {
        try {
            const allUsers= await userModel.find({isDeleted:false});
           
            return allUsers
            
        } catch (error) {
            console.log(error)
            
        }
        
    };

    async  findAllPastUsers()  {
        try {
            const allUsers= await userModel.find({isDeleted:true});
           
            return allUsers
            
        } catch (error) {
            console.log(error)
            
        }
        
    };
/////


async  retrivePastUserAccount(id) {
  try {
    const user = await userModel.findById(id);

    if (!user) {
      throw new Error("User not found");
    }

    const updatedUser = await userModel.findByIdAndUpdate(
      id,
      { isDeleted: false },
      { new: true }
    );

    return updatedUser;
  } catch (error) {
    console.error("Error toggling user block status:", error.message);
    throw error;
  }
}




/////
    async  suspendUser(id) {
  try {
    const user = await userModel.findById(id);

    if (!user) {
      throw new Error("User not found");
    }

    const updatedUser = await userModel.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true }
    );

    // Setup email transporter
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: false, // Use TLS (STARTTLS)
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Send email to the user
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: user.email,
      subject: "Your Account Has Been Blocked",
      html: `
        <h3>Dear ${user.name},</h3>
        <p>We regret to inform you that your account has been suspended due to policy violations.</p>
        <p>If you believe this is a mistake, please contact our support team.</p>
        <br />
        <p>Thank you,<br />Support Team</p>
      `,
    });

    return updatedUser;
  } catch (error) {
    console.error("Error toggling user block status:", error.message);
    throw error;
  }
};

async  unSuspendUser(id) {
  try {
    const user = await userModel.findById(id);

    if (!user) {
      throw new Error("User not found");
    }

    const updatedUser = await userModel.findByIdAndUpdate(
      id,
      { isDeleted: false },
      { new: true }
    );

    return updatedUser;
  } catch (error) {
    console.error("Error toggling user block status:", error.message);
    throw error;
  }
}


async  editUserDetails(id, updateData){
        return await userModel.findByIdAndUpdate(id, updateData, { new: true });
    }






}

module.exports= new userDetails();