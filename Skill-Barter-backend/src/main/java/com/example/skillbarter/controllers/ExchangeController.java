package com.example.skillbarter.controllers;

import com.example.skillbarter.models.Exchange;
import com.example.skillbarter.repositories.ExchangeRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/exchanges")
public class ExchangeController {

    private final ExchangeRepository exchangeRepository;

    public ExchangeController(ExchangeRepository exchangeRepository) {
        this.exchangeRepository = exchangeRepository;
    }

    // ✅ Fetch all ongoing exchanges for a user
    @GetMapping("/ongoing/{userId}")
    public List<Exchange> getOngoingExchanges(@PathVariable Long userId) {
        return exchangeRepository.findByStatusAndUserA_UserIdOrUserB_UserId("ONGOING", userId, userId);
    }

    // ✅ Complete an exchange
    @PostMapping("/complete/{exchangeId}")
    public String completeExchange(@PathVariable Long exchangeId) {
        Optional<Exchange> exchangeOpt = exchangeRepository.findById(exchangeId);
        if (exchangeOpt.isEmpty()) {
            return "⚠️ Exchange not found!";
        }
        Exchange exchange = exchangeOpt.get();
        exchange.setStatus("COMPLETED");
        exchangeRepository.save(exchange);
        return "✅ Exchange completed successfully!";
    }

    // ✅ Cancel an exchange
    @PostMapping("/cancel/{exchangeId}")
    public String cancelExchange(@PathVariable Long exchangeId) {
        Optional<Exchange> exchangeOpt = exchangeRepository.findById(exchangeId);
        if (exchangeOpt.isEmpty()) {
            return "⚠️ Exchange not found!";
        }
        Exchange exchange = exchangeOpt.get();
        exchange.setStatus("CANCELLED");
        exchangeRepository.save(exchange);
        return "❌ Exchange canceled successfully!";
    }
}
