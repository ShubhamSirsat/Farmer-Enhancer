package com.farmers.service.dao;

import com.farmers.service.enums.ProductTypeEnum;
import com.farmers.service.models.Product;
import com.farmers.service.models.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductDAO extends JpaRepository<Product, Long> {
    Page<Product> findAllByProductType(ProductTypeEnum productType, Pageable pageable);
    Page<Product> findAllByUser(User user, Pageable pageable);
}
