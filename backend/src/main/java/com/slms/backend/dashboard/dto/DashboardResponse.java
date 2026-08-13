package com.slms.backend.dashboard.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DashboardResponse {

    private long totalDrivers;
    private long availableDrivers;

    private long totalVehicles;
    private long availableVehicles;

    private long totalDeliveries;
    private long pendingDeliveries;
    private long completedDeliveries;
    private long highPriorityDeliveries;
}