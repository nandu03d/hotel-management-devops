package com.slms.backend.ai.service;

import com.slms.backend.ai.dto.AIResponse;
import com.slms.backend.delivery.entity.Delivery;
import com.slms.backend.delivery.enums.DeliveryStatus;
import com.slms.backend.delivery.repository.DeliveryRepository;
import com.slms.backend.driver.entity.Driver;
import com.slms.backend.driver.enums.DriverStatus;
import com.slms.backend.driver.repository.DriverRepository;
import com.slms.backend.vehicle.entity.Vehicle;
import com.slms.backend.vehicle.enums.VehicleStatus;
import com.slms.backend.vehicle.repository.VehicleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AIService {

    private final DriverRepository driverRepository;
    private final VehicleRepository vehicleRepository;
    private final DeliveryRepository deliveryRepository;

    public AIResponse askQuestion(String question) {

        String q = question.toLowerCase();

        if (q.contains("available driver")) {

            List<Driver> drivers = driverRepository.findAll()
                    .stream()
                    .filter(d -> d.getStatus() == DriverStatus.AVAILABLE)
                    .toList();

            if (drivers.isEmpty()) {
                return new AIResponse("No available drivers.");
            }

            return new AIResponse("Available Driver: " + drivers.get(0).getFullName());
        }

        if (q.contains("available vehicle")) {

            List<Vehicle> vehicles = vehicleRepository.findAll()
                    .stream()
                    .filter(v -> v.getStatus() == VehicleStatus.AVAILABLE)
                    .toList();

            if (vehicles.isEmpty()) {
                return new AIResponse("No available vehicles.");
            }

            Vehicle vehicle = vehicles.get(0);

            return new AIResponse(
                    "Available Vehicle: "
                            + vehicle.getVehicleNumber()
                            + " (Capacity "
                            + vehicle.getCapacityKg()
                            + " kg)"
            );
        }

        if (q.contains("pending")) {

            long count = deliveryRepository.findAll()
                    .stream()
                    .filter(d -> d.getStatus() == DeliveryStatus.PENDING)
                    .count();

            return new AIResponse("Pending Deliveries : " + count);
        }

        if (q.contains("summary")) {

            return new AIResponse(
                    "Drivers : "
                            + driverRepository.count()
                            + ", Vehicles : "
                            + vehicleRepository.count()
                            + ", Deliveries : "
                            + deliveryRepository.count()
            );
        }

        return new AIResponse(
                "Try asking:\n"
                        + "- available drivers\n"
                        + "- available vehicles\n"
                        + "- pending deliveries\n"
                        + "- summary"
        );
    }
}