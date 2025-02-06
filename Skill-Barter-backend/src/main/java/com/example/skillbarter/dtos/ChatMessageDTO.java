package com.example.skillbarter.dtos;

import lombok.Data;

@Data
public class ChatMessageDTO {
    private Long senderId;
    private Long receiverId;
    private String content;
    private String timestamp; // ISO 8601 format
}