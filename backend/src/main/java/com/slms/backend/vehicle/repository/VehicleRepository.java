package com.slms.backend.vehicle.repository;

import com.slms.backend.vehicle.entity.Vehicle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VehicleRepository extends JpaRepository<Vehicle, Long> {

    boolean existsByVehicleNumber(String vehicleNumber);

    boolean existsByRegistrationNumber(String registrationNumber);
    // For update validation
    boolean existsByVehicleNumberAndIdNot(String vehicleNumber, Long id);

    boolean existsByRegistrationNumberAndIdNot(String registrationNumber, Long id);

}