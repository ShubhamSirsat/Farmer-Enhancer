package com.farmers.service.dao;

import com.farmers.service.models.Feedback;
import com.farmers.service.models.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FeedbackDAO extends JpaRepository<Feedback, Long> {
    Page<Feedback> findAllByUser(User user, Pageable pageable);
    Page<Feedback> findAllByProductUser(User user, Pageable pageable);
}
