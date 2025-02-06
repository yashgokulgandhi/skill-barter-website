package com.example.skillbarter.repositories;

import com.example.skillbarter.models.Message;
import com.example.skillbarter.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface MessageRepository extends JpaRepository<Message, Long> {
    List<Message> findBySenderAndReceiverOrderByTimestampAsc(User sender, User receiver);
}
