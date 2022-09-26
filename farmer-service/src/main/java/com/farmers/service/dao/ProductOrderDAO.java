package com.farmers.service.dao;

import com.farmers.service.models.Product;
import com.farmers.service.models.ProductOrder;
import com.farmers.service.models.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProductOrderDAO extends JpaRepository<ProductOrder, Long> {
    Page<ProductOrder> findAllByUser(User user, Pageable pageable);
    Optional<ProductOrder> findByProduct(Product product);
}
