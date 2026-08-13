package com.slms.backend.driver.entity;

import com.slms.backend.driver.enums.DriverStatus;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "drivers")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Driver {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String employeeId;

    @Column(nullable = false)
    private String fullName;

    @Column(nullable = false, unique = true)
    private String phone;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String licenseNumber;

    private Integer experience;

    private Boolean availability;

    @Enumerated(EnumType.STRING)
    private DriverStatus status;

    private LocalDateTime createdAt;

    @PrePersist
    public void prePersist() {
        createdAt = LocalDateTime.now();

        if (availability == null) {
            availability = true;
        }

        if (status == null) {
            status = DriverStatus.AVAILABLE;
        }
    }
}