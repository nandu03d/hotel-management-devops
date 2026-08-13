package com.slms.backend.delivery.dto;

import com.slms.backend.delivery.enums.DeliveryStatus;
import com.slms.backend.delivery.enums.Priority;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class DeliveryResponse {

    private Long id;

    private String pickupLocation;

    private String dropLocation;

    private Double packageWeight;

    private Priority priority;

    private DeliveryStatus status;

    private String driverName;

    private String vehicleNumber;

    private LocalDateTime createdAt;
    private Long driverId;
    private Long vehicleId;

}