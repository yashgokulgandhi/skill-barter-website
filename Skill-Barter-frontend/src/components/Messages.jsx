import React from 'react';
import { MessageCircle } from 'lucide-react';

function Messages() {
  const conversations = [
    { id: 1, name: 'John Doe', lastMessage: 'Hey, when can we start the skill exchange?' },
    { id: 2, name: 'Jane Smith', lastMessage: 'Thanks for the great design session!' },
    { id: 3, name: 'Mike Johnson', lastMessage: 'Would love to learn more about programming' },
  ];

  return (
    <div className="container">
      <h1>Messages</h1>
      
      <div className="messages-list">
        {conversations.map((conversation) => (
          <div key={conversation.id} className="message-card">
            <div className="message-avatar">
              <MessageCircle size={24} />
            </div>
            <div className="message-content">
              <h3>{conversation.name}</h3>
              <p>{conversation.lastMessage}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Messages;