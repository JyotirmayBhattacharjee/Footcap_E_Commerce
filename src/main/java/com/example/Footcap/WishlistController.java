package com.example.Footcap;

import java.util.List;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/wishlist")
public class WishlistController {

    private final WishlistRepository wishlistRepository;

    public WishlistController(
            WishlistRepository wishlistRepository) {

        this.wishlistRepository = wishlistRepository;
    }

    @PostMapping("/add")
    public String addToWishlist(
            @RequestBody Wishlist wishlist) {

        wishlistRepository.save(wishlist);

        return "Added To Wishlist";
    }

    @GetMapping("/count")
    public long getWishlistCount(
            @RequestParam String email) {

        return wishlistRepository
                .countByUserEmail(email);
    }

    @GetMapping("/items")
    public List<Wishlist> getWishlistItems(
            @RequestParam String email) {

        return wishlistRepository
                .findByUserEmail(email);
    }

    @DeleteMapping("/delete/{id}")
    public String deleteWishlistItem(
            @PathVariable Long id) {

        wishlistRepository.deleteById(id);

        return "Deleted";
    }
}