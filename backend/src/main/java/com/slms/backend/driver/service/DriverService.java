package com.slms.backend.driver.service;

import com.slms.backend.driver.dto.DriverRequest;
import com.slms.backend.driver.dto.DriverResponse;
import com.slms.backend.driver.entity.Driver;
import com.slms.backend.driver.repository.DriverRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DriverService {

    private final DriverRepository repository;

    public DriverResponse createDriver(DriverRequest request) {

        if(repository.existsByEmployeeId(request.getEmployeeId())){
            throw new RuntimeException("Employee ID already exists");
        }

        if(repository.existsByEmail(request.getEmail())){
            throw new RuntimeException("Email already exists");
        }

        if(repository.existsByPhone(request.getPhone())){
            throw new RuntimeException("Phone already exists");
        }

        Driver driver = Driver.builder()
                .employeeId(request.getEmployeeId())
                .fullName(request.getFullName())
                .phone(request.getPhone())
                .email(request.getEmail())
                .licenseNumber(request.getLicenseNumber())
                .experience(request.getExperience())
                .availability(request.getAvailability())
                .status(request.getStatus())
                .build();

        Driver saved = repository.save(driver);

        return map(saved);
    }

    public List<DriverResponse> getAllDrivers() {
        return repository.findAll()
                .stream()
                .map(this::map)
                .toList();
    }

    public DriverResponse getDriver(Long id) {

        Driver driver = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Driver not found"));

        return map(driver);
    }

    public DriverResponse updateDriver(Long id, DriverRequest request){

        Driver driver = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Driver not found"));

        driver.setEmployeeId(request.getEmployeeId());
        driver.setFullName(request.getFullName());
        driver.setPhone(request.getPhone());
        driver.setEmail(request.getEmail());
        driver.setLicenseNumber(request.getLicenseNumber());
        driver.setExperience(request.getExperience());
        driver.setAvailability(request.getAvailability());
        driver.setStatus(request.getStatus());

        return map(repository.save(driver));
    }

    public void deleteDriver(Long id){

        if(!repository.existsById(id)){
            throw new RuntimeException("Driver not found");
        }

        repository.deleteById(id);
    }

    private DriverResponse map(Driver driver){

        return DriverResponse.builder()
                .id(driver.getId())
                .employeeId(driver.getEmployeeId())
                .fullName(driver.getFullName())
                .phone(driver.getPhone())
                .email(driver.getEmail())
                .licenseNumber(driver.getLicenseNumber())
                .experience(driver.getExperience())
                .availability(driver.getAvailability())
                .status(driver.getStatus())
                .createdAt(driver.getCreatedAt())
                .build();
    }
}