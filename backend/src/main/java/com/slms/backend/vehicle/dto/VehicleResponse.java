package com.slms.backend.vehicle.dto;

import com.slms.backend.vehicle.enums.FuelType;
import com.slms.backend.vehicle.enums.VehicleStatus;
import com.slms.backend.vehicle.enums.VehicleType;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class VehicleResponse {

    private Long id;
    private String vehicleNumber;
    private String registrationNumber;
    private VehicleType vehicleType;
    private FuelType fuelType;
    private Integer capacityKg;
    private Boolean availability;
    private VehicleStatus status;
    private LocalDateTime createdAt;
}