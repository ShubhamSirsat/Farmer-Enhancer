package com.farmers.service.dao;

import com.farmers.service.models.ProductOrder;
import com.farmers.service.models.Vehicle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VehicleDAO extends JpaRepository<Vehicle, Long> {
    void deleteAllByProductOrder(ProductOrder productOrder);
}
