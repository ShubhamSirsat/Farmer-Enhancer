package com.farmers.service.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;

@NoArgsConstructor @Data @AllArgsConstructor
public class PaginationDTO {
    @NotBlank
    private int page;
    @NotBlank
    private int size;
	public PaginationDTO() {
		super();
		// TODO Auto-generated constructor stub
	}
	public PaginationDTO(@NotBlank int page, @NotBlank int size) {
		super();
		this.page = page;
		this.size = size;
	}
	public int getPage() {
		return page;
	}
	public void setPage(int page) {
		this.page = page;
	}
	public int getSize() {
		return size;
	}
	public void setSize(int size) {
		this.size = size;
	}
    
    
}
