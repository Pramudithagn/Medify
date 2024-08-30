package com.pramu.medify.treatment;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.util.Set;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
@Entity
public class Treatment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String description;
    private BigDecimal price;
    private Boolean status;

    @ElementCollection
    @CollectionTable(name = "treatment_doctors", joinColumns = @JoinColumn(name = "treatment_id"))
    @Column(name = "doctor_id")
    private Set<Long> doctorIds;

}
