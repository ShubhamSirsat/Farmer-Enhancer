package com.farmers.service.dto;

import com.farmers.service.models.Exporter;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GetAllExporterDetailsDTOResponse {
    private Boolean IsSuccess;
    private String Message;
    private List<Exporter> data;
	public GetAllExporterDetailsDTOResponse(Boolean isSuccess, String message, List<Exporter> data) {
		super();
		IsSuccess = isSuccess;
		Message = message;
		this.data = data;
	}
	public Boolean getIsSuccess() {
		return IsSuccess;
	}
	public void setIsSuccess(Boolean isSuccess) {
		IsSuccess = isSuccess;
	}
	public String getMessage() {
		return Message;
	}
	public void setMessage(String message) {
		Message = message;
	}
	public List<Exporter> getData() {
		return data;
	}
	public void setData(List<Exporter> data) {
		this.data = data;
	}
    
    
}
