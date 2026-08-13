package com.slms.backend.driver.dto;

import com.slms.backend.driver.enums.DriverStatus;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class DriverRequest {

    @NotBlank
    private String employeeId;

    @NotBlank
    private String fullName;

    @NotBlank
    private String phone;

    @Email
    private String email;

    @NotBlank
    private String licenseNumber;

    private Integer experience;

    private Boolean availability;

    private DriverStatus status;
}