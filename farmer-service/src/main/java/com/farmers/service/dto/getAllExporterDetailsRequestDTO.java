package com.farmers.service.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class getAllExporterDetailsRequestDTO {
    private Long ExportProductID;
    private Boolean isPending;
	public Long getExportProductID() {
		return ExportProductID;
	}
	public void setExportProductID(Long exportProductID) {
		ExportProductID = exportProductID;
	}
	public Boolean getIsPending() {
		return isPending;
	}
	public void setIsPending(Boolean isPending) {
		this.isPending = isPending;
	}
    
    
}
