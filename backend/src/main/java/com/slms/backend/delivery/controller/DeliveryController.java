package com.slms.backend.delivery.controller;

import com.slms.backend.delivery.dto.DeliveryRequest;
import com.slms.backend.delivery.dto.DeliveryResponse;
import com.slms.backend.delivery.service.DeliveryService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/deliveries")
@RequiredArgsConstructor
public class DeliveryController {

    private final DeliveryService service;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public DeliveryResponse create(@Valid @RequestBody DeliveryRequest request) {
        return service.createDelivery(request);
    }

    @GetMapping
    public List<DeliveryResponse> getAll() {
        return service.getAllDeliveries();
    }

    @GetMapping("/{id}")
    public DeliveryResponse getById(@PathVariable Long id) {
        return service.getDelivery(id);
    }

    @PutMapping("/{id}")
    public DeliveryResponse update(
            @PathVariable Long id,
            @Valid @RequestBody DeliveryRequest request) {

        return service.updateDelivery(id, request);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        service.deleteDelivery(id);
    }
}