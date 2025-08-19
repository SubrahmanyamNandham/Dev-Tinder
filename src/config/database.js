const mongoose =require("mongoose");

const connectDB = async () => {
    await mongoose.connect('mongodb+srv://subrahmanyamnandham:subrahmanyamnandham@cluster0.scerli2.mongodb.net/devTinder')
    
}

module.exports = connectDB;