package com.example.skillbarter.services;

import com.example.skillbarter.dtos.ChatMessageDTO;
import com.example.skillbarter.models.Message;
import com.example.skillbarter.models.User;
import com.example.skillbarter.repositories.MessageRepository;
import com.example.skillbarter.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class MessageService {
    @Autowired
    private MessageRepository messageRepository;

    @Autowired
    private UserRepository userRepository;

    public Message saveMessage(Message message) {
        return messageRepository.save(message);
    }

    // ✅ FIXED: Using correct method `findChatHistory()`
    public List<ChatMessageDTO> getChatHistory(Long senderId, Long receiverId) {
        Optional<User> sender = userRepository.findById(senderId);
        Optional<User> receiver = userRepository.findById(receiverId);

        if (sender.isEmpty() || receiver.isEmpty()) {
            throw new RuntimeException("Users not found");
        }

        // ✅ Call correct method to fetch messages from both directions
        List<Message> messages = messageRepository.findChatHistory(sender.get(), receiver.get());

        // ✅ Convert to DTO before returning
        return messages.stream().map(msg -> {
            ChatMessageDTO dto = new ChatMessageDTO();
            dto.setSenderId(msg.getSender().getUserId());
            dto.setReceiverId(msg.getReceiver().getUserId());
            dto.setContent(msg.getContent());
            dto.setTimestamp(msg.getTimestamp().toString());
            return dto;
        }).collect(Collectors.toList());
    }
}
