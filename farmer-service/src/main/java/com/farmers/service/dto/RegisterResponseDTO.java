package com.farmers.service.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RegisterResponseDTO {
    private String token;
    private String email;
    private String name;
	public RegisterResponseDTO(String token, String email, String name) {
		super();
		this.token = token;
		this.email = email;
		this.name = name;
	}
    
    
}
