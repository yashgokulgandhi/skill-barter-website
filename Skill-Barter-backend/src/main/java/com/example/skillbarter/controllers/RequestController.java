package com.example.skillbarter.controllers;

import com.example.skillbarter.models.*;
import com.example.skillbarter.repositories.*;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/requests")
public class RequestController {

    private final RequestRepository requestRepository;
    private final UserRepository userRepository;
    private final SkillRepository skillRepository;
    private final ExchangeRepository exchangeRepository;
    private final UserSkillRepository userSkillRepository;

    public RequestController(RequestRepository requestRepository, UserRepository userRepository, SkillRepository skillRepository, ExchangeRepository exchangeRepository, UserSkillRepository userSkillRepository) {
        this.requestRepository = requestRepository;
        this.userRepository = userRepository;
        this.skillRepository = skillRepository;
        this.exchangeRepository = exchangeRepository;
        this.userSkillRepository = userSkillRepository;
    }

    // 📌 Create a new skill exchange request
    @PostMapping("/create")
    public String createRequest(
            @RequestParam Long userAId,
            @RequestParam Long userASkillId,
            @RequestParam Long userBId,
            @RequestParam Long userBSkillId,
            @RequestParam String requestMessage) {

        // Logging received data
        System.out.println("📩 Received Request:");
        System.out.println("User A ID: " + userAId + ", Skill ID: " + userASkillId);
        System.out.println("User B ID: " + userBId + ", Skill ID: " + userBSkillId);

        // Fetch Users and Skills
        Optional<User> userAOpt = userRepository.findById(userAId);
        Optional<User> userBOpt = userRepository.findById(userBId);
        UserSkill userASkill=userSkillRepository.findById(userASkillId).orElse(null);
        UserSkill userBSkill=userSkillRepository.findById(userBSkillId).orElse(null);

        Skill userASkillOpt = userASkill.getSkill();
        Skill userBSkillOpt = userBSkill.getSkill();



        // Create and save request
        Request request = new Request();
        request.setUserA(userAOpt.get());
        request.setUserASkill(userASkillOpt);
        request.setUserB(userBOpt.get());
        request.setRequestMessage(requestMessage);
        request.setUserBSkill(userBSkillOpt);
        request.setStatus(Request.Status.PENDING);
        request.setCreatedAt(LocalDateTime.now());

        requestRepository.save(request);
        System.out.println("✅ Request saved successfully!");
        return "Request sent successfully!";
    }

    // 📌 Get all pending requests where the logged-in user is `userB`
    @GetMapping("/pending/{userId}")
    public List<Request> getPendingRequests(@PathVariable Long userId) {
        return requestRepository.findByStatusAndUserB_Id(Request.Status.PENDING, userId);
    }

    // 📌 Accept a request
    @PostMapping("/accept/{requestId}")
    public String acceptRequest(@PathVariable Long requestId) {
        Optional<Request> requestOpt = requestRepository.findById(requestId);
        if (requestOpt.isEmpty()) {
            return "⚠️ Request not found!";
        }



        Request request = requestOpt.get();

        Exchange exchange = new Exchange();
        exchange.setUserA(request.getUserA());
        exchange.setUserASkill(request.getUserASkill());
        exchange.setUserB(request.getUserB());
        exchange.setUserBSkill(request.getUserBSkill());
        exchange.setCreatedAt(LocalDateTime.now());
        exchange.setStatus("ONGOING");
        exchangeRepository.save(exchange);


        request.setStatus(Request.Status.ACCEPTED);
        requestRepository.delete(request);

        return "✅ Request accepted successfully!";
    }

    // 📌 Decline a request
    @PostMapping("/decline/{requestId}")
    public String declineRequest(@PathVariable Long requestId) {
        Optional<Request> requestOpt = requestRepository.findById(requestId);
        if (requestOpt.isEmpty()) {
            return "⚠️ Request not found!";
        }

        Request request = requestOpt.get();
        request.setStatus(Request.Status.DECLINED);
        requestRepository.save(request);

        return "❌ Request declined successfully!";
    }
}
