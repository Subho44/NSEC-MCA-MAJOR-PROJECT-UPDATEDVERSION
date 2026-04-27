import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";

const socket = io("http://localhost:5500");

const Chat = () => {
  const currentUser = JSON.parse(localStorage.getItem("user"));

  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  const bottomRef = useRef(null);

  // connect current user to socket
  useEffect(() => {
    if (currentUser?._id) {
      socket.emit("addUser", currentUser._id);
    }
  }, [currentUser]);

  // fetch all users
  useEffect(() => {
    const fetchUsers = async () => {
      const res = await axios.get("http://localhost:5500/api/chat/users");

      const filteredUsers = res.data.filter(
        (user) => user._id !== currentUser?._id
      );

      setUsers(filteredUsers);
    };

    fetchUsers();
  }, []);

  // receive real time message
  useEffect(() => {
    socket.on("receiveMessage", (newMessage) => {
      if (
        selectedUser &&
        newMessage.senderId === selectedUser._id
      ) {
        setMessages((prev) => [...prev, newMessage]);
      }
    });

    socket.on("messageSaved", (newMessage) => {
      setMessages((prev) => [...prev, newMessage]);
    });

    return () => {
      socket.off("receiveMessage");
      socket.off("messageSaved");
    };
  }, [selectedUser]);

  // load old messages
  const openChat = async (user) => {
    setSelectedUser(user);

    const res = await axios.get(
      `http://localhost:5500/api/chat/messages/${currentUser._id}/${user._id}`
    );

    setMessages(res.data);
  };

  // send message
  const sendMessage = () => {
    if (!text.trim() || !selectedUser) return;

    socket.emit("sendMessage", {
      senderId: currentUser._id,
      receiverId: selectedUser._id,
      message: text,
    });

    setText("");
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!currentUser) {
    return (
      <div className="p-10 text-center text-xl">
        Please login first to use chat.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl grid md:grid-cols-3 overflow-hidden">
        
        {/* Users List */}
        <div className="border-r p-4">
          <h2 className="text-2xl font-bold mb-4 text-blue-600">
            Users
          </h2>

          {users.map((user) => (
            <div
              key={user._id}
              onClick={() => openChat(user)}
              className={`p-3 mb-2 rounded-lg cursor-pointer border ${
                selectedUser?._id === user._id
                  ? "bg-blue-600 text-white"
                  : "hover:bg-blue-50"
              }`}
            >
              <h3 className="font-semibold">{user.name}</h3>
              <p className="text-sm">{user.role}</p>
            </div>
          ))}
        </div>

        {/* Chat Box */}
        <div className="md:col-span-2 flex flex-col h-[650px]">
          {selectedUser ? (
            <>
              <div className="p-4 border-b bg-blue-600 text-white">
                <h2 className="text-xl font-bold">
                  Chat with {selectedUser.name}
                </h2>
                <p className="text-sm">{selectedUser.email}</p>
              </div>

              <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
                {messages.map((msg) => (
                  <div
                    key={msg._id}
                    className={`mb-3 flex ${
                      msg.senderId === currentUser._id
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    <div
                      className={`px-4 py-2 rounded-xl max-w-xs ${
                        msg.senderId === currentUser._id
                          ? "bg-blue-600 text-white"
                          : "bg-white border"
                      }`}
                    >
                      {msg.message}
                    </div>
                  </div>
                ))}

                <div ref={bottomRef}></div>
              </div>

              <div className="p-4 border-t flex gap-3">
                <input
                  type="text"
                  placeholder="Type message..."
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                  className="flex-1 border p-3 rounded-lg"
                />

                <button
                  onClick={sendMessage}
                  className="bg-blue-600 text-white px-6 rounded-lg"
                >
                  Send
                </button>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500 text-xl">
              Select a user to start chat
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chat;