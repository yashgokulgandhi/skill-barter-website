package com.example.skillbarter.repositories;

import com.example.skillbarter.models.Exchange;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ExchangeRepository extends JpaRepository<Exchange, Long> {

    List<Exchange> findByUserA_UserIdOrUserB_UserId(Long userAId, Long userBId);
}
