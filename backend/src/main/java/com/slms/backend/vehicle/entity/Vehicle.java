package com.slms.backend.vehicle.entity;

import com.slms.backend.vehicle.enums.FuelType;
import com.slms.backend.vehicle.enums.VehicleStatus;
import com.slms.backend.vehicle.enums.VehicleType;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "vehicles")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Vehicle {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String vehicleNumber;

    @Column(nullable = false, unique = true)
    private String registrationNumber;

    @Enumerated(EnumType.STRING)
    private VehicleType vehicleType;

    @Enumerated(EnumType.STRING)
    private FuelType fuelType;

    private Integer capacityKg;

    private Boolean availability;

    @Enumerated(EnumType.STRING)
    private VehicleStatus status;

    private LocalDateTime createdAt;

    @PrePersist
    public void prePersist() {

        createdAt = LocalDateTime.now();

        if (availability == null) {
            availability = true;
        }

        if (status == null) {
            status = VehicleStatus.AVAILABLE;
        }
    }
}