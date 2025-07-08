const mongoose=require("mongoose");

class ConnectDb {
  async dbConnection() {
    try {
        await mongoose.connect(process.env.MONGO_URI)
      console.log("✅ MongoDB connected");
    } catch (err) {
      console.error("❌ MongoDB startup failed:", err.message);
      process.exit(1);
    }
  }
}
module.exports= new ConnectDb();
