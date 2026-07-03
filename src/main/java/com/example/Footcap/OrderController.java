package com.example.Footcap;

import java.util.List;

import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/order")
public class OrderController {

    private final OrderRepository orderRepository;
    private final CartRepository cartRepository;
    private final AddressRepository addressRepository;

    public OrderController(
            OrderRepository orderRepository,
            CartRepository cartRepository,
            AddressRepository addressRepository) {

        this.orderRepository = orderRepository;
        this.cartRepository = cartRepository;
        this.addressRepository = addressRepository;
    }

    @Transactional
    @PostMapping("/place")
    public String placeOrder(@RequestParam String email) {

        List<Cart> cartItems =
                cartRepository.findByUserEmail(email);

        if (cartItems.isEmpty()) {
            return "Cart is Empty";
        }

        Address address =
                addressRepository
                        .findByUserEmail(email)
                        .orElse(null);

        if (address == null) {
            return "Address Not Found";
        }

        for (Cart cart : cartItems) {

            Order order = new Order();

            order.setUserEmail(cart.getUserEmail());
            order.setProductName(cart.getProductName());
            order.setPrice(cart.getPrice());
            order.setQuantity(cart.getQuantity());

            order.setFullName(address.getFullName());
            order.setMobile(address.getMobile());
            order.setAddress(address.getAddressLine());
            order.setCity(address.getCity());
            order.setState(address.getState());
            order.setPincode(address.getPincode());
            order.setCountry(address.getCountry());

            order.setPaymentMethod("Cash On Delivery");
            order.setStatus("PLACED");

            orderRepository.save(order);
        }

        // Delete all cart items
        cartRepository.deleteAll(cartItems);

        return "Order Placed Successfully";
    }

    @GetMapping("/items")
    public List<Order> getOrders(
            @RequestParam String email) {

        return orderRepository.findByUserEmail(email);
    }
}