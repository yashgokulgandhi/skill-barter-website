import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import { ArrowLeft, Send } from 'lucide-react';
import '../styles/Chat.css';
import axios from 'axios';

function Chat() {
    const { id: receiverIdString } = useParams();
    const receiverId = Number(receiverIdString);
    const navigate = useNavigate();
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [stompClient, setStompClient] = useState(null);
    const [receiver, setReceiver] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const messagesEndRef = useRef(null);
    const userId = Number(localStorage.getItem('userId')); // Crucial: Get userId as Number
    const userEmail = localStorage.getItem('email');

    useEffect(() => {
        const fetchReceiver = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await axios.get(`http://localhost:8080/api/user/${receiverId}`);
                console.log("Full receiver response:", response);
                if (response.status !== 200) {
                    throw new Error(`Failed to fetch receiver: ${response.status} ${response.statusText}`);
                }
                setReceiver(response.data);
                console.log("Receiver data:", response.data);
            } catch (error) {
                console.error("Error fetching receiver:", error);
                setError(error.message);
                if (error.response) {
                    console.error("Error Response Data:", error.response.data);
                    console.error("Error Response Status:", error.response.status);
                    console.error("Error Response Headers:", error.response.headers);
                }
            } finally {
                setLoading(false);
            }
        };

        if (receiverId) {
            fetchReceiver();
        }
    }, [receiverId]);

    useEffect(() => {
        const fetchMessages = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await axios.get(`http://localhost:8080/api/chat/${receiverId}/messages?userId=${userId}`);
                console.log("Full messages response:", response);
                if (response.status !== 200) {
                    throw new Error(`Failed to fetch messages: ${response.status} ${response.statusText}`);
                }
                setMessages(response.data);
                console.log("Messages data:", response.data);
            } catch (error) {
                console.error('Error fetching messages:', error);
                setError(error.message);
                if (error.response) {
                    console.error("Error Response Data:", error.response.data);
                    console.error("Error Response Status:", error.response.status);
                    console.error("Error Response Headers:", error.response.headers);
                }
            } finally {
                setLoading(false);
            }
        };

        if (receiverId && userId) {
            fetchMessages();
        }
    }, [receiverId, userId]);

    useEffect(() => {
        if (!userId || !receiverId || !receiver) return; // Important check!

        const client = new Client({
            webSocketFactory: () => new SockJS('http://localhost:8080/ws'),
            onConnect: () => {
                setStompClient(client);

                client.subscribe(`/user/${userId}/queue/messages`, (message) => {
                    const newMessage = JSON.parse(message.body);
                    setMessages((prevMessages) => [...prevMessages, newMessage]);
                });

                client.subscribe(`/topic/messages/${receiverId}`, (message) => {
                    const newMessage = JSON.parse(message.body);
                    setMessages((prevMessages) => [...prevMessages, newMessage]);
                });
            },
            onStompError: (error) => {
                console.error('WebSocket error:', error);
            },
        });

        client.activate();

        return () => client.deactivate();
    }, [userId, receiverId, receiver]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSend = (e) => {
        e.preventDefault();
        if (message.trim() && stompClient && receiver) {
            const chatMessage = {
                senderId: userId,
                receiverId: receiverId,
                content: message,
                timestamp: new Date().toISOString(),
            };

            console.log("Sending message:", chatMessage); // Log before sending

            stompClient.publish({
                destination: '/app/chat',
                body: JSON.stringify(chatMessage),
            });
            setMessage('');
        }
    };

    if (error) {
        return <div className="error">{error}</div>;
    }

    if (loading || !receiver) {
        return <div className="loading">Loading...</div>;
    }

    return (
        <div className="chat">
            {/* ... (rest of your JSX remains the same) */}
        </div>
    );
}

export default Chat;