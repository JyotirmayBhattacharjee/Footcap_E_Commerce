package com.example.Footcap;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface WishlistRepository
        extends JpaRepository<Wishlist, Long> {

    long countByUserEmail(String userEmail);

    List<Wishlist> findByUserEmail(String userEmail);
}