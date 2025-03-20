import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import "../styles/chatWindow.css"
import axios from "axios";

function ChatWindow() {
  const { receiverId } = useParams();
  const navigate = useNavigate();
  const senderId = localStorage.getItem("userId");

  const [receivername,setReceiverName]=useState("")
  const [profile,setProfile]=useState("")

  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const [stompClient, setStompClient] = useState(null);
  const [isConnected, setIsConnected] = useState(false); // ✅ Track WebSocket connection state

  useEffect(() => {
    if (!senderId || !receiverId) {
      alert("Invalid chat session.");
      navigate("/messages");
      return;
    }

    console.log("✅ Sender ID:", senderId);
    console.log("✅ Receiver ID:", receiverId);
    
    
    // axios.get(`http://localhost:8080/api/userbyid/${receiverId}`)
    // .then((res)=>res.data)
    // .then((data)=>{
    //     setReceiverName(data.name)
    //     setProfile(data.profilePicture)
    // })

    axios.get(`https://resilient-enthusiasm-production.up.railway.app/api/userbyid/${receiverId}`)
    .then((res)=>res.data)
    .then((data)=>{
        setReceiverName(data.name)
        setProfile(data.profilePicture)
    })

    // 🔥 Fetch previous messages
    const fetchPreviousMessages = async () => {
      try {
        console.log("📜 Fetching chat history...");
        // const response = await fetch(`http://localhost:8080/api/messages?senderId=${senderId}&receiverId=${receiverId}`);
        const response = await fetch(`https://resilient-enthusiasm-production.up.railway.app/api/messages?senderId=${senderId}&receiverId=${receiverId}`);
        if (!response.ok) throw new Error("Failed to fetch messages");

        const data = await response.json();
        console.log("📜 Previous messages:", data);
        setMessages(data); // ✅ Load previous messages into state
      } catch (error) {
        console.error("❌ Error fetching messages:", error);
      }
    };

    fetchPreviousMessages(); // ✅ Fetch messages when component mounts

    const connectWebSocket = () => {
      console.log("🔗 Attempting to open WebSocket connection...");
      // const socket = new SockJS("http://localhost:8080/ws");
      const socket = new SockJS("https://resilient-enthusiasm-production.up.railway.app/ws");
      const client = Stomp.over(socket);

      client.debug = (msg) => console.log("STOMP Debug:", msg);

      client.connect(
        {},
        () => {
          console.log("✅ WebSocket Connected");
          setStompClient(client);
          setIsConnected(true); // ✅ Mark connection as established

          const subscriptionPath = `/user/${senderId}/queue/messages`;
          console.log("📩 Subscribing to:", subscriptionPath);

          client.subscribe(subscriptionPath, (message) => {
            try {
              const receivedMessage = JSON.parse(message.body);
              console.log("📩 New message received:", receivedMessage);
              setMessages((prevMessages) => [...prevMessages, receivedMessage]);
            } catch (error) {
              console.error("Error parsing message:", error);
            }
          });
        },
        (error) => {
          console.error("❌ WebSocket connection error:", error);
          setIsConnected(false);
          setTimeout(connectWebSocket, 3000); // 🔄 Retry connection after 3 seconds
        }
      );
    };

    connectWebSocket(); // ✅ Start WebSocket connection

    return () => {
      if (stompClient && isConnected) {
        console.log("🔴 Disconnecting WebSocket...");
        stompClient.disconnect(() => {
          console.log("❌ WebSocket Disconnected");
        });
      }
    };
  }, [receiverId, senderId]);

  const sendMessage = () => {
    if (!stompClient || !isConnected || !messageInput.trim()) {
      console.error("❌ Cannot send message. WebSocket not connected.");
      alert("Message could not be sent. Please check your connection.");
      return;
    }

    const chatMessage = {
      senderId,
      receiverId,
      content: messageInput,
    };

    console.log("📤 Sending message:", chatMessage);

    stompClient.send("/app/chat", {}, JSON.stringify(chatMessage));
    setMessages((prevMessages) => [...prevMessages, chatMessage]);
    setMessageInput("");
  };

  return (
    <div className="chat-window">
      <div class="chat-header">
  <button class="back-button" onClick={()=>navigate("/messages")}>← Back</button>

  
  <div class="chat-user-info">
    <img src={profile} alt="User Avatar" class="user-avatar" />
    <span class="user-name">{receivername}</span>
  </div>
</div>


      <div className="messages">
  {messages.length === 0 ? (
    <p className="no-messages">No messages yet. Start the conversation!</p>
  ) : (
    messages.map((msg, index) => {
      const isSentByCurrentUser = msg.senderId == senderId;
      const formattedTime = new Date(msg.timestamp).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });

      return (
        <div
          key={index}
          className={`message-container ${isSentByCurrentUser ? "sent" : "received"}`}
        >
          <div className="message">
            <p className="message-content">{msg.content}</p>
            <span className="message-timestamp">{formattedTime}</span>
          </div>
        </div>
      );
    })
  )}
</div>


      <div className="message-input">
        <input
          type="text"
          placeholder="Type a message..."
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default ChatWindow;
