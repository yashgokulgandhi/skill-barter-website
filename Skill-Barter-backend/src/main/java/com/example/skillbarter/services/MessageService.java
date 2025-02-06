package com.example.skillbarter.services;

import com.example.skillbarter.models.Message;
import com.example.skillbarter.models.User;
import com.example.skillbarter.repositories.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class MessageService {
    @Autowired
    private MessageRepository messageRepository;

    public Message saveMessage(Message message) {
        return messageRepository.save(message);
    }

    public List<Message> getConversation(User sender, User receiver) {
        return messageRepository.findBySenderAndReceiverOrderByTimestampAsc(sender, receiver);
    }
}
