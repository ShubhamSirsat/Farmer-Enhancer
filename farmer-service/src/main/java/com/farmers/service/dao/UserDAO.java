package com.farmers.service.dao;

import com.farmers.service.enums.UserRoleEnum;
import com.farmers.service.models.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserDAO extends JpaRepository<User, Long> {
    Optional<User> findUserByUserName(String userName);
    Boolean existsByUserName(String useName);
    Page<User> findAllByRoleNot(UserRoleEnum role, Pageable pageable);

}
