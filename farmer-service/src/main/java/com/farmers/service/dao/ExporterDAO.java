package com.farmers.service.dao;

import com.farmers.service.models.Exporter;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ExporterDAO extends JpaRepository<Exporter, Long> {
}
