package com.farmers.service.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Exporter {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long userid;
    private Date InsertionDate=new Date();
    private String ProductName;
    private Long Quentity;
    private String ProductType;
    private Boolean isPending;
	public Exporter() {
		super();
		// TODO Auto-generated constructor stub
	}
	public Exporter(Long id, Long userid, Date insertionDate, String productName, Long quentity, String productType,
			Boolean isPending) {
		super();
		this.id = id;
		this.userid = userid;
		InsertionDate = insertionDate;
		ProductName = productName;
		Quentity = quentity;
		ProductType = productType;
		this.isPending = isPending;
	}
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public Long getUserid() {
		return userid;
	}
	public void setUserid(Long userid) {
		this.userid = userid;
	}
	public Date getInsertionDate() {
		return InsertionDate;
	}
	public void setInsertionDate(Date insertionDate) {
		InsertionDate = insertionDate;
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
	public Boolean getIsPending() {
		return isPending;
	}
	public void setIsPending(Boolean isPending) {
		this.isPending = isPending;
	}
    
    
}
