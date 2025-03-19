package com.example.skillbarter.repositories;

import com.example.skillbarter.models.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);

    @Query("SELECT DISTINCT u FROM User u LEFT JOIN u.userSkills us " +
            "WHERE u.userId <> :currentUserId AND " +
            "(LOWER(u.name) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
            "LOWER(us.skill.skillName) LIKE LOWER(CONCAT('%', :query, '%')))")
    Page<User> searchUsers(@Param("currentUserId") Long currentUserId,
                           @Param("query") String query,
                           Pageable pageable);
}
