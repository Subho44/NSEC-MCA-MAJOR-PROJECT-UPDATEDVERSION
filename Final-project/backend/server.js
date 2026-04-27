const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const connectDB = require("./config/db");
const http = require("http");
const {Server} = require("socket.io");
const messageRoutes = require("./routes/chatRoutes");
const Message = require("./models/Message");

dotenv.config();

const app = express();
const server = http.createServer(app);
connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/auth", require("./routes/userRoutes"));
app.use("/api/courses", require("./routes/courseRoutes"));
app.use("/api/cart", require("./routes/cartRoutes"));
app.use("/api/orders", require("./routes/orderRoutes"));
app.use("/api/live", require("./routes/liveclassRoutes"));
app.use("/api/chat", messageRoutes);

//setup socket server
const io = new Server(server,{
  cors:{
    origin:"http://localhost:5173",
    methods:["GET","POST"],
  },
});

//STORE ONLINE USERS
let onlineusers = {};
io.on("connection",(socket)=>{
  console.log("Socket connected:",socket.id)
  //users joins after login
  socket.on("addUser",(userId)=>{
    onlineusers[userId] = socket.id;
    console.log("online users:", onlineusers);
  });

  //send message
  socket.on("sendMessage", async(data)=>{
    const {senderId,receiverId,message} = data;
    const savemsg = await Message.create({
      senderId,
      receiverId,
      message,
    });
    const receiversocketid = onlineusers[receiverId];

    if(receiversocketid) {
      io.to(receiversocketid).emit("receiverMessage",savemsg);
    }
    socket.emit("messageSaved",savemsg);
  });
 socket.on("disconnect",()=>{
  for(let userId in onlineusers){
    if(onlineusers[userId] === socket.id){
      delete onlineusers[userId];
      break;
    }
  }
  console.log("socket disconnected:",socket.id);
 });
});

app.get("/", (req, res) => {
  res.send("API running...");
});

server.listen(process.env.PORT || 5500, () => {
  console.log(`Server running on port ${process.env.PORT || 5500}`);
});
