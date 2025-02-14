package com.example.skillbarter.controllers;

import com.example.skillbarter.dtos.ChatMessageDTO;
import com.example.skillbarter.models.Message;
import com.example.skillbarter.models.User;
import com.example.skillbarter.repositories.UserRepository;
import com.example.skillbarter.services.MessageService;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.time.LocalDateTime;
import java.util.Optional;

@Controller

public class ChatController {

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @Autowired
    private MessageService messageService;

    @Autowired
    private UserRepository userRepository;

    @MessageMapping("/chat")
    public void sendMessage(@Payload ChatMessageDTO chatMessage) {
        User sender = userRepository.findById(chatMessage.getSenderId())
                .orElseThrow(() -> new RuntimeException("Sender not found"));
        User receiver = userRepository.findById(chatMessage.getReceiverId())
                .orElseThrow(() -> new RuntimeException("Receiver not found"));

        Message message = new Message(sender, receiver, chatMessage.getContent(), LocalDateTime.now());
        messageService.saveMessage(message);

        ChatMessageDTO responseMessage = new ChatMessageDTO();
        responseMessage.setSenderId(message.getSender().getUserId());
        responseMessage.setReceiverId(message.getReceiver().getUserId());
        responseMessage.setContent(message.getContent());
        responseMessage.setTimestamp(message.getTimestamp().toString());

        // ✅ Send to specific user WebSocket queue
        messagingTemplate.convertAndSendToUser(
                receiver.getUserId().toString(),
                "/queue/messages",
                responseMessage
        );
    }
}
