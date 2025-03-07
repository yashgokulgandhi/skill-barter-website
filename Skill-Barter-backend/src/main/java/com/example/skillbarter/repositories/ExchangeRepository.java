package com.example.skillbarter.repositories;

import com.example.skillbarter.models.Exchange;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ExchangeRepository extends JpaRepository<Exchange, Long> {


    List<Exchange> findByStatusAndUserA_UserIdOrUserB_UserId(String status, Long userAId, Long userBId);
}
