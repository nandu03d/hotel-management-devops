package com.slms.backend.driver.dto;

import com.slms.backend.driver.enums.DriverStatus;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class DriverResponse {

    private Long id;
    private String employeeId;
    private String fullName;
    private String phone;
    private String email;
    private String licenseNumber;
    private Integer experience;
    private Boolean availability;
    private DriverStatus status;
    private LocalDateTime createdAt;
}