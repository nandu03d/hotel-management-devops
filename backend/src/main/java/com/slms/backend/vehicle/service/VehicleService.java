package com.slms.backend.vehicle.service;

import com.slms.backend.vehicle.dto.VehicleRequest;
import com.slms.backend.vehicle.dto.VehicleResponse;
import com.slms.backend.vehicle.entity.Vehicle;
import com.slms.backend.vehicle.repository.VehicleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class VehicleService {

    private final VehicleRepository repository;

    public VehicleResponse createVehicle(VehicleRequest request) {

        if (repository.existsByVehicleNumber(request.getVehicleNumber())) {
            throw new RuntimeException("Vehicle Number already exists");
        }

        if (repository.existsByRegistrationNumber(request.getRegistrationNumber())) {
            throw new RuntimeException("Registration Number already exists");
        }

        Vehicle vehicle = Vehicle.builder()
                .vehicleNumber(request.getVehicleNumber())
                .registrationNumber(request.getRegistrationNumber())
                .vehicleType(request.getVehicleType())
                .fuelType(request.getFuelType())
                .capacityKg(request.getCapacityKg())
                .availability(request.getAvailability())
                .status(request.getStatus())
                .build();

        return map(repository.save(vehicle));
    }

    public List<VehicleResponse> getAllVehicles() {
        return repository.findAll().stream().map(this::map).toList();
    }

    public VehicleResponse getVehicle(Long id) {
        return map(repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Vehicle not found")));
    }

    public VehicleResponse updateVehicle(Long id, VehicleRequest request) {

        Vehicle vehicle = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Vehicle not found"));

        if (repository.existsByVehicleNumberAndIdNot(request.getVehicleNumber(), id)) {
            throw new RuntimeException("Vehicle Number already exists");
        }

        if (repository.existsByRegistrationNumberAndIdNot(request.getRegistrationNumber(), id)) {
            throw new RuntimeException("Registration Number already exists");
        }

        vehicle.setVehicleNumber(request.getVehicleNumber());
        vehicle.setRegistrationNumber(request.getRegistrationNumber());
        vehicle.setVehicleType(request.getVehicleType());
        vehicle.setFuelType(request.getFuelType());
        vehicle.setCapacityKg(request.getCapacityKg());
        vehicle.setAvailability(request.getAvailability());
        vehicle.setStatus(request.getStatus());

        return map(repository.save(vehicle));
    }

    public void deleteVehicle(Long id) {

        if (!repository.existsById(id)) {
            throw new RuntimeException("Vehicle not found");
        }

        repository.deleteById(id);
    }

    private VehicleResponse map(Vehicle vehicle) {

        return VehicleResponse.builder()
                .id(vehicle.getId())
                .vehicleNumber(vehicle.getVehicleNumber())
                .registrationNumber(vehicle.getRegistrationNumber())
                .vehicleType(vehicle.getVehicleType())
                .fuelType(vehicle.getFuelType())
                .capacityKg(vehicle.getCapacityKg())
                .availability(vehicle.getAvailability())
                .status(vehicle.getStatus())
                .createdAt(vehicle.getCreatedAt())
                .build();
    }
}