package com.slms.backend.delivery.dto;

import com.slms.backend.delivery.enums.DeliveryStatus;
import com.slms.backend.delivery.enums.Priority;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class DeliveryRequest {

    @NotBlank
    private String pickupLocation;

    @NotBlank
    private String dropLocation;

    @NotNull
    private Double packageWeight;

    @NotNull
    private Priority priority;

    private DeliveryStatus status;

    @NotNull
    private Long driverId;

    @NotNull
    private Long vehicleId;
}