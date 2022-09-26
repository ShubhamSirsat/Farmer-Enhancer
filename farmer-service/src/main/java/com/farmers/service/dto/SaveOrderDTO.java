package com.farmers.service.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@NoArgsConstructor
@AllArgsConstructor
@Data
public class SaveOrderDTO {
    private Long userId;
    private Long productId;
    private Long quantity;
    private Long unit;
    private Long price;
    private Long totalPrice;
    private Boolean paymentStatus;
    private Boolean haveVehicle;
    private SaveVehicleDTO vehicleDetails;
	public Long getUserId() {
		return userId;
	}
	public void setUserId(Long userId) {
		this.userId = userId;
	}
	public Long getProductId() {
		return productId;
	}
	public void setProductId(Long productId) {
		this.productId = productId;
	}
	public Long getQuantity() {
		return quantity;
	}
	public void setQuantity(Long quantity) {
		this.quantity = quantity;
	}
	public Long getUnit() {
		return unit;
	}
	public void setUnit(Long unit) {
		this.unit = unit;
	}
	public Long getPrice() {
		return price;
	}
	public void setPrice(Long price) {
		this.price = price;
	}
	public Long getTotalPrice() {
		return totalPrice;
	}
	public void setTotalPrice(Long totalPrice) {
		this.totalPrice = totalPrice;
	}
	public Boolean getPaymentStatus() {
		return paymentStatus;
	}
	public void setPaymentStatus(Boolean paymentStatus) {
		this.paymentStatus = paymentStatus;
	}
	public Boolean getHaveVehicle() {
		return haveVehicle;
	}
	public void setHaveVehicle(Boolean haveVehicle) {
		this.haveVehicle = haveVehicle;
	}
	public SaveVehicleDTO getVehicleDetails() {
		return vehicleDetails;
	}
	public void setVehicleDetails(SaveVehicleDTO vehicleDetails) {
		this.vehicleDetails = vehicleDetails;
	}
    
    
}
