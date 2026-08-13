package com.slms.backend.ai.controller;

import com.slms.backend.ai.dto.AIRequest;
import com.slms.backend.ai.dto.AIResponse;
import com.slms.backend.ai.service.AIService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/ai")
@RequiredArgsConstructor
public class AIController {

    private final AIService aiService;

    @PostMapping("/ask")
    public AIResponse ask(@Valid @RequestBody AIRequest request) {
        return aiService.askQuestion(request.getQuestion());
    }
}