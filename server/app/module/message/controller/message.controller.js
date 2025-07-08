const User = require("../../user/model/user.model");
const Message = require("../model/message.model");
const { getReceiverSocketId, io } = require("../../../utils/socket.util");
const profileRepositories = require("../../profile/repositories/profile.repositories");
const axios = require('axios')

const profileModel = require("../../profile/model/profile.model"); // or use your repository




class MessageController {

  async sendJoke(req, res) {
    try {
      const response = await axios.get("https://v2.jokeapi.dev/joke/Any?type=single");
      const joke = response.data.joke || "No joke found!";
      res.status(200).json({ success: true, joke });
    } catch (error) {
      res.status(500).json({ success: false, message: "Failed to fetch joke" });
    }
  }


//   async getMessages(req, res) {
//   try {
//     const { id: userToChatId } = req.params;
//     const myId = req.user?._id || req.user?.id;

//     const messages = await Message.find({
//       $or: [
//         { senderId: myId, receiverId: userToChatId },
//         { senderId: userToChatId, receiverId: myId },
//       ],
//     }).sort({ createdAt: 1 });

//     return res.status(200).json(messages); // ✅ Always return array
//   } catch (error) {
//     console.error("❌ getMessages error:", error.message);
//     return res.status(500).json({ error: "Internal server error" });
//   }
// }

// async sendMessage(req, res) {
//   try {
//     const { text } = req.body;
//     const { id: receiverId } = req.params;
//     const senderId = req.user?._id || req.user?.id;

//     if (!senderId || !receiverId ) {
//       return res.status(400).json({ error: "Missing required fields" });
//     };
       

//     // Allow empty text if image is provided
//     if (!text && !req.file) {
//       return res.status(400).json({ error: "Message must contain text or image" });
//     }
    //     let imageUrl;
//       if (req.file) {
//         // Convert backslashes to forward slashes on Windows
//         imageUrl = `uploads/message/${req.file.filename}`.replace(/\\/g, "/");
//       }
//     const newMessage = await Message.create({
//       senderId,
//       receiverId,
//        text: text || "",
//       image: imageUrl || "",
//     });

//     const receiverSocketId = getReceiverSocketId(receiverId);

//     if (receiverSocketId) {
//       io.to(receiverSocketId).emit("receive_message", newMessage);
//     }

//     return res.status(201).json(newMessage); // ✅ Always send object or array, not mixed
//   } catch (err) {
//     console.error("❌ sendMessage error:", err.message);
//     return res.status(500).json({ error: "Internal server error" });
//   }
// }


///above two are the main  



async getMessages(req, res) {
  try {
    const { id: userToChatId } = req.params;
    const myId = req.user?._id || req.user?.id;

    const myProfile = await profileModel.findOne({ userId: myId });
    const targetProfile = await profileModel.findOne({ userId: userToChatId });

    if (!myProfile || !targetProfile) {
      return res.status(404).json({ error: "One or both profiles not found" });
    }

    const isBlocked =
      myProfile.blockedUsers.includes(userToChatId) ||
      targetProfile.blockedUsers.includes(myId);

    if (isBlocked) {
      return res.status(403).json({ error: "You are blocked from viewing messages." });
    }

    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: myId },
      ],
    }).sort({ createdAt: 1 });

    return res.status(200).json(messages);
  } catch (error) {
    console.error("❌ getMessages error:", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
}



async sendMessage(req, res) {
  try {
    const { text } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user?._id || req.user?.id;

    if (!senderId || !receiverId) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // ✅ Block check
    const senderProfile = await profileModel.findOne({ userId: senderId });
    const receiverProfile = await profileModel.findOne({ userId: receiverId });

    if (!senderProfile || !receiverProfile) {
      return res.status(404).json({ error: "One or both profiles not found" });
    }

    const isBlocked =
      senderProfile.blockedUsers.includes(receiverId) ||
      receiverProfile.blockedUsers.includes(senderId);

    if (isBlocked) {
      return res.status(403).json({ error: "Cannot send message. Blocked." });
    }

    // ✅ Image logic
    let imageUrl;
    if (req.file) {
      imageUrl = `uploads/message/${req.file.filename}`.replace(/\\/g, "/");
    }

    const newMessage = await Message.create({
      senderId,
      receiverId,
      text: text || "",
      image: imageUrl || "",
    });

    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("receive_message", newMessage);
    }

    return res.status(201).json(newMessage);
  } catch (err) {
    console.error("❌ sendMessage error:", err.message);
    return res.status(500).json({ error: "Internal server error" });
  }
}



}

module.exports = new MessageController();
