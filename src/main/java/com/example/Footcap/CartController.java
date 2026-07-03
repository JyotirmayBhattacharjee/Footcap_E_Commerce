package com.example.Footcap;

import java.util.List;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/cart")
public class CartController {

    private final CartRepository cartRepository;

    public CartController(CartRepository cartRepository) {
        this.cartRepository = cartRepository;
    }

    @PostMapping("/add")
    public String addToCart(@RequestBody Cart cart) {

        cartRepository.save(cart);

        return "Added To Cart";
    }

    @GetMapping("/count")
    public long getCartCount(
            @RequestParam String email) {

        return cartRepository.countByUserEmail(email);
    }

    @GetMapping("/items")
    public List<Cart> getCartItems(
            @RequestParam String email) {

        return cartRepository.findByUserEmail(email);
    }

    @DeleteMapping("/delete/{id}")
    public String deleteItem(
            @PathVariable Long id) {

        cartRepository.deleteById(id);

        return "Deleted";
    }
}
