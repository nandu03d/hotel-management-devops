package com.slms.backend.driver.controller;

import com.slms.backend.driver.dto.DriverRequest;
import com.slms.backend.driver.dto.DriverResponse;
import com.slms.backend.driver.service.DriverService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/drivers")
@RequiredArgsConstructor
public class DriverController {

    private final DriverService service;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public DriverResponse create(@Valid @RequestBody DriverRequest request){
        return service.createDriver(request);
    }

    @GetMapping
    public List<DriverResponse> getAll(){
        return service.getAllDrivers();
    }

    @GetMapping("/{id}")
    public DriverResponse getById(@PathVariable Long id){
        return service.getDriver(id);
    }

    @PutMapping("/{id}")
    public DriverResponse update(@PathVariable Long id,
                                 @Valid @RequestBody DriverRequest request){

        return service.updateDriver(id,request);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id){
        service.deleteDriver(id);
    }
}