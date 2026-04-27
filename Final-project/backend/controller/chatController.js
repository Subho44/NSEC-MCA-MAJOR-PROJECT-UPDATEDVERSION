const Message = require("../models/Message");
const User = require("../models/User");

//all users for chat list
exports.getUsers = async(req,res)=>{
    try {
        const users = await User.find().select("_id name email role");
        res.json(users);
    } catch(err) {
        res.status(500).json({message:"users not fetch"});
    }
};
//old chat message
exports.getMessages = async(req,res)=>{
    try {
        const {senderId,receiverId} = req.params;
        const messages = await Message.find({
            $or:[
                {senderId,receiverId},
                {senderId:receiverId,receiverId:senderId},
            ],
        });
        
        res.json(messages);
    } catch(err) {
        res.status(500).json({message:"users not fetch"});
    }
};