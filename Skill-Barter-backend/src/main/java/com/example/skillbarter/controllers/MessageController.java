package com.example.skillbarter.controllers;

import com.example.skillbarter.dtos.ChatMessageDTO;
import com.example.skillbarter.models.Message;
import com.example.skillbarter.models.User;
import com.example.skillbarter.repositories.UserRepository;
import com.example.skillbarter.services.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/messages")
// Allow React frontend requests
public class MessageController {

    @Autowired
    private MessageService messageService;

    @Autowired
    private UserRepository userRepository;

    @GetMapping
    public ResponseEntity<List<ChatMessageDTO>> getMessages(@RequestParam Long senderId, @RequestParam Long receiverId) {
        List<ChatMessageDTO> messages = messageService.getChatHistory(senderId, receiverId);
        return ResponseEntity.ok(messages);
    }

    @PostMapping
    public ResponseEntity<ChatMessageDTO> sendMessage(@RequestBody ChatMessageDTO chatMessageDTO) {
        Optional<User> senderOpt = userRepository.findById(chatMessageDTO.getSenderId());
        Optional<User> receiverOpt = userRepository.findById(chatMessageDTO.getReceiverId());

        if (senderOpt.isEmpty() || receiverOpt.isEmpty()) {
            throw new RuntimeException("Sender or Receiver not found.");
        }

        Message message = new Message();
        message.setSender(senderOpt.get());
        message.setReceiver(receiverOpt.get());
        message.setContent(chatMessageDTO.getContent());
        message.setTimestamp(LocalDateTime.now());

        Message savedMessage = messageService.saveMessage(message);

        ChatMessageDTO responseMessage = new ChatMessageDTO();
        responseMessage.setSenderId(savedMessage.getSender().getUserId());
        responseMessage.setReceiverId(savedMessage.getReceiver().getUserId());
        responseMessage.setContent(savedMessage.getContent());
        responseMessage.setTimestamp(savedMessage.getTimestamp().toString());

        return ResponseEntity.ok(responseMessage);
    }
}
