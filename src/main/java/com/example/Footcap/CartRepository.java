package com.example.Footcap;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface CartRepository extends JpaRepository<Cart, Long> {

    long countByUserEmail(String userEmail);

    List<Cart> findByUserEmail(String userEmail);
    
    // void deleteByUserEmail(String userEmail);
}

