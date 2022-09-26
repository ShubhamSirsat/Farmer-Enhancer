package com.farmers.service.dto;

import com.farmers.service.models.ProductOrder;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.OneToOne;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class SaveVehicleDTO {
    private String vehicleName;
    private Long quantity;
    private Long price;
    private Long noOfDays;
    private Long totalPrice;
    private Boolean isRequired;
    private String boardingPoint;
    private String droppingPoint;
}
