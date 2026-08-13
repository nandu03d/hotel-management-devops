package com.slms.backend.ai.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class AIRequest {

    @NotBlank
    private String question;
}