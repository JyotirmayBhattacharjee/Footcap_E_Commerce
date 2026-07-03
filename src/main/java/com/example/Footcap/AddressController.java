package com.example.Footcap;

import java.util.Optional;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/address")
public class AddressController {

    private final AddressRepository addressRepository;

    public AddressController(AddressRepository addressRepository) {
        this.addressRepository = addressRepository;
    }

    @PostMapping("/save")
    public String saveAddress(@RequestBody Address address) {

        Optional<Address> existing =
                addressRepository.findByUserEmail(
                        address.getUserEmail());

        if(existing.isPresent()){

            Address old = existing.get();

            old.setFullName(address.getFullName());
            old.setMobile(address.getMobile());
            old.setAddressLine(address.getAddressLine());
            old.setCity(address.getCity());
            old.setState(address.getState());
            old.setPincode(address.getPincode());
            old.setCountry(address.getCountry());

            addressRepository.save(old);

            return "Address Updated";
        }

        addressRepository.save(address);

        return "Address Saved";
    }

    @GetMapping
    public Address getAddress(
            @RequestParam String email){

        return addressRepository
                .findByUserEmail(email)
                .orElse(null);
    }

}