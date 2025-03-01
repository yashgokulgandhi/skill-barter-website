package com.example.skillbarter.repositories;

import ch.qos.logback.core.status.Status;
import com.example.skillbarter.models.Request;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface RequestRepository extends JpaRepository<Request, Long> {
    @Query("SELECT r FROM Request r WHERE r.status = :status AND r.userB.userId = :userId")
    List<Request> findByStatusAndUserB_Id(@Param("status") Request.Status status, @Param("userId") Long userId);

}
