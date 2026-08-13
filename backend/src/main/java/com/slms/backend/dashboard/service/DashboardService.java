package com.slms.backend.dashboard.service;

import com.slms.backend.dashboard.dto.DashboardResponse;
import com.slms.backend.delivery.enums.DeliveryStatus;
import com.slms.backend.delivery.enums.Priority;
import com.slms.backend.delivery.repository.DeliveryRepository;
import com.slms.backend.driver.enums.DriverStatus;
import com.slms.backend.driver.repository.DriverRepository;
import com.slms.backend.vehicle.enums.VehicleStatus;
import com.slms.backend.vehicle.repository.VehicleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DashboardService {

    private final DriverRepository driverRepository;
    private final VehicleRepository vehicleRepository;
    private final DeliveryRepository deliveryRepository;

    public DashboardResponse getDashboard() {

        long totalDrivers = driverRepository.count();

        long availableDrivers = driverRepository.findAll()
                .stream()
                .filter(driver -> driver.getStatus() == DriverStatus.AVAILABLE)
                .count();

        long totalVehicles = vehicleRepository.count();

        long availableVehicles = vehicleRepository.findAll()
                .stream()
                .filter(vehicle -> vehicle.getStatus() == VehicleStatus.AVAILABLE)
                .count();

        long totalDeliveries = deliveryRepository.count();

        long pendingDeliveries = deliveryRepository.findAll()
                .stream()
                .filter(delivery -> delivery.getStatus() == DeliveryStatus.PENDING)
                .count();

        long completedDeliveries = deliveryRepository.findAll()
                .stream()
                .filter(delivery -> delivery.getStatus() == DeliveryStatus.DELIVERED)
                .count();

        long highPriorityDeliveries = deliveryRepository.findAll()
                .stream()
                .filter(delivery -> delivery.getPriority() == Priority.HIGH)
                .count();

        return DashboardResponse.builder()
                .totalDrivers(totalDrivers)
                .availableDrivers(availableDrivers)
                .totalVehicles(totalVehicles)
                .availableVehicles(availableVehicles)
                .totalDeliveries(totalDeliveries)
                .pendingDeliveries(pendingDeliveries)
                .completedDeliveries(completedDeliveries)
                .highPriorityDeliveries(highPriorityDeliveries)
                .build();
    }
}