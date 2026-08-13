package com.slms.backend.vehicle.controller;

import com.slms.backend.vehicle.dto.VehicleRequest;
import com.slms.backend.vehicle.dto.VehicleResponse;
import com.slms.backend.vehicle.service.VehicleService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/vehicles")
@RequiredArgsConstructor
public class VehicleController {

    private final VehicleService service;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public VehicleResponse create(@Valid @RequestBody VehicleRequest request) {
        return service.createVehicle(request);
    }

    @GetMapping
    public List<VehicleResponse> getAll() {
        return service.getAllVehicles();
    }

    @GetMapping("/{id}")
    public VehicleResponse getById(@PathVariable Long id) {
        return service.getVehicle(id);
    }

    @PutMapping("/{id}")
    public VehicleResponse update(@PathVariable Long id,
                                  @Valid @RequestBody VehicleRequest request) {
        return service.updateVehicle(id, request);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        service.deleteVehicle(id);
    }
}