package com.farmers.service.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SaveExporterDemandRequestDTO {

    private Long UserID;
    private String ProductName;
    private Long Quentity;
    private String ProductType;
	public Long getUserID() {
		return UserID;
	}
	public void setUserID(Long userID) {
		UserID = userID;
	}
	public String getProductName() {
		return ProductName;
	}
	public void setProductName(String productName) {
		ProductName = productName;
	}
	public Long getQuentity() {
		return Quentity;
	}
	public void setQuentity(Long quentity) {
		Quentity = quentity;
	}
	public String getProductType() {
		return ProductType;
	}
	public void setProductType(String productType) {
		ProductType = productType;
	}
    
    
}
