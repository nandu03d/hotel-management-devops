package com.slms.backend.delivery.service;

import com.slms.backend.delivery.dto.DeliveryRequest;
import com.slms.backend.delivery.dto.DeliveryResponse;
import com.slms.backend.delivery.entity.Delivery;
import com.slms.backend.delivery.repository.DeliveryRepository;
import com.slms.backend.delivery.enums.DeliveryStatus;
import com.slms.backend.driver.entity.Driver;
import com.slms.backend.driver.repository.DriverRepository;
import com.slms.backend.vehicle.entity.Vehicle;
import com.slms.backend.vehicle.repository.VehicleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DeliveryService {

    private final DeliveryRepository deliveryRepository;
    private final DriverRepository driverRepository;
    private final VehicleRepository vehicleRepository;

    public DeliveryResponse createDelivery(DeliveryRequest request) {

        Driver driver = driverRepository.findById(request.getDriverId())
                .orElseThrow(() -> new RuntimeException("Driver not found"));

        Vehicle vehicle = vehicleRepository.findById(request.getVehicleId())
                .orElseThrow(() -> new RuntimeException("Vehicle not found"));

        Delivery delivery = Delivery.builder()
                .pickupLocation(request.getPickupLocation())
                .dropLocation(request.getDropLocation())
                .packageWeight(request.getPackageWeight())
                .priority(request.getPriority())
                .status(request.getStatus() == null ? DeliveryStatus.PENDING : request.getStatus())
                .driver(driver)
                .vehicle(vehicle)
                .build();

        return map(deliveryRepository.save(delivery));
    }

    public List<DeliveryResponse> getAllDeliveries() {
        return deliveryRepository.findAll().stream().map(this::map).toList();
    }

    public DeliveryResponse getDelivery(Long id) {
        return map(deliveryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Delivery not found")));
    }

    public DeliveryResponse updateDelivery(Long id, DeliveryRequest request) {

        Delivery delivery = deliveryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Delivery not found"));

        Driver driver = driverRepository.findById(request.getDriverId())
                .orElseThrow(() -> new RuntimeException("Driver not found"));

        Vehicle vehicle = vehicleRepository.findById(request.getVehicleId())
                .orElseThrow(() -> new RuntimeException("Vehicle not found"));

        delivery.setPickupLocation(request.getPickupLocation());
        delivery.setDropLocation(request.getDropLocation());
        delivery.setPackageWeight(request.getPackageWeight());
        delivery.setPriority(request.getPriority());
        delivery.setStatus(request.getStatus());

        delivery.setDriver(driver);
        delivery.setVehicle(vehicle);

        return map(deliveryRepository.save(delivery));
    }

    public void deleteDelivery(Long id) {

        if (!deliveryRepository.existsById(id)) {
            throw new RuntimeException("Delivery not found");
        }

        deliveryRepository.deleteById(id);
    }

    private DeliveryResponse map(Delivery delivery) {

        return DeliveryResponse.builder()
                .id(delivery.getId())

                .pickupLocation(delivery.getPickupLocation())
                .dropLocation(delivery.getDropLocation())
                .packageWeight(delivery.getPackageWeight())

                .priority(delivery.getPriority())
                .status(delivery.getStatus())

                .driverId(delivery.getDriver().getId())
                .driverName(delivery.getDriver().getFullName())

                .vehicleId(delivery.getVehicle().getId())
                .vehicleNumber(delivery.getVehicle().getVehicleNumber())

                .createdAt(delivery.getCreatedAt())
                .build();
    }
}