package com.slms.backend.vehicle.dto;

import com.slms.backend.vehicle.enums.FuelType;
import com.slms.backend.vehicle.enums.VehicleStatus;
import com.slms.backend.vehicle.enums.VehicleType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class VehicleRequest {

    @NotBlank
    private String vehicleNumber;

    @NotBlank
    private String registrationNumber;

    @NotNull
    private VehicleType vehicleType;

    @NotNull
    private FuelType fuelType;

    @NotNull
    private Integer capacityKg;

    private Boolean availability;

    private VehicleStatus status;
}