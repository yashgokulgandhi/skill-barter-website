package com.example.skillbarter.controllers;

import com.example.skillbarter.dtos.ChatMessageDTO;
import com.example.skillbarter.models.Message;
import com.example.skillbarter.models.User;
import com.example.skillbarter.repositories.UserRepository;
import com.example.skillbarter.services.MessageService;
import com.example.skillbarter.services.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

import java.time.LocalDateTime;
import java.util.List;

@Controller
@CrossOrigin(origins = "http://localhost:5173")
public class ChatController {
    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @Autowired
    private MessageService messageService;

    @Autowired
    private UserRepository userRepository;

    @MessageMapping("/chat")
    public void sendMessage(@Payload ChatMessageDTO chatMessage) {
        User sender = userRepository.findById(chatMessage.getSenderId()).orElseThrow(() -> new RuntimeException("Sender not found"));
        User receiver = userRepository.findById(chatMessage.getReceiverId()).orElseThrow(() -> new RuntimeException("Receiver not found"));

        Message message = new Message(sender, receiver, chatMessage.getContent(), LocalDateTime.now());
        messageService.saveMessage(message);


        messagingTemplate.convertAndSendToUser(
                chatMessage.getReceiverId().toString(),
                "/queue/messages",
                chatMessage
        );

        messagingTemplate.convertAndSend("/topic/messages/" + chatMessage.getReceiverId(), chatMessage);
    }


    @GetMapping("/api/chat/{receiverId}/messages")
    public ResponseEntity<List<Message>> getMessages(
            @PathVariable Long receiverId,
            @RequestParam Long userId
    ) {

        User sender = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("Sender not found"));
        User receiver = userRepository.findById(receiverId).orElseThrow(() -> new RuntimeException("Receiver not found"));

        List<Message> messages = messageService.getConversation(sender, receiver);
        return ResponseEntity.ok(messages);
    }
}