import User from "../models/User.js";
import Message from "../models/Messages.js";
import cloudinary from "../utils/cloudinary.js";


//get all contacts
export const getAllContacts=async(req,res)=>{
    try {
        const loggedInUser=req.user._id
        const filteredUser=await User.find({_id:{$ne:loggedInUser}}).select('-password')
        res.status(200).json(filteredUser)
    } catch (error) {
        
    }
}


//get chat partners
export const getChatPartners=async (req,res)=>{
    try {
        const loggedInUser=req.user._id
        //find all the messages where sender or receiver is logged in user
        const messages=await Message.find({$or:[{senderId:loggedInUser},{receiverId:loggedInUser}]})
        //give all the receiverIds of the messages where sender is loggedIn user
        const chatPartnerIds=[...new Set(messages.map((msg)=>
        msg.senderId.toString()===loggedInUser.toString()?msg.receiverId.toString():msg.senderId.toString()))]
        //then extract chat partners from ids
        const chatPartner=await User.find({_id:{$in:chatPartnerIds}}).select('-password')
        return res.status(200).json(chatPartner)
        
    } catch (error) {
        console.error('Error in the get chat partners controller',error)
        return res.status(500).json({message:'Internal server error'})
        
    }
}


//get messages  by id
export const getMessagesById=async(req,res)=>{
    try {
        const myId=req.user._id
        const {id:userToChatId}=req.params
        const message=await Message.find({
            $or:[
                {senderId:myId,receiverId:userToChatId},
                {senderId:userToChatId,receiverId:myId}
    
            ]
        })
        return res.status(200).json(message)

        
    } catch (error) {
        console.error('Error in the getMessageById controller',error)
        return res.status(500).json({message:'Internal server error'})
        
    }
}


// send message
export const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    // Create the message object
    const newMessage = new Message({
      senderId,
      receiverId,
      text: text || "",
    });

    // If there is an image, upload it asynchronously (fire-and-forget)
    if (image) {
      cloudinary.uploader
        .upload(image)
        .then((uploadResponse) => {
          newMessage.image = uploadResponse.secure_url;
          return newMessage.save();
        })
        .catch((err) => console.error("Cloudinary upload failed:", err));
    } else {
      // Save text-only message immediately
      await newMessage.save();
    }

    // ✅ Return immediately to client
    return res.status(201).json(newMessage);
  } catch (error) {
    console.error("Error in sendMessage Controller", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
