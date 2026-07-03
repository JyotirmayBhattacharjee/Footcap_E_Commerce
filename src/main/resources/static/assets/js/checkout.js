document.addEventListener("DOMContentLoaded", () => {

    fetch('/api/user')
        .then(res => res.json())
        .then(user => {

            fetch(`/address?email=${user.email}`)
                .then(res => res.json())
                .then(address => {

                    if (!address) return;

                    document.getElementById("fullName").value =
                        address.fullName;

                    document.getElementById("mobile").value =
                        address.mobile;

                    document.getElementById("address").value =
                        address.addressLine;

                    document.getElementById("city").value =
                        address.city;

                    document.getElementById("state").value =
                        address.state;

                    document.getElementById("pincode").value =
                        address.pincode;

                });

        });

});

document.getElementById("saveAddressBtn")
    .addEventListener("click", () => {

        fetch('/api/user')
            .then(res => res.json())
            .then(user => {

                fetch('/address/save', {

                    method: 'POST',

                    headers: {
                        'Content-Type': 'application/json'
                    },

                    body: JSON.stringify({

                        userEmail: user.email,

                        fullName: document.getElementById("fullName").value,

                        mobile: document.getElementById("mobile").value,

                        addressLine: document.getElementById("address").value,

                        city: document.getElementById("city").value,

                        state: document.getElementById("state").value,

                        pincode: document.getElementById("pincode").value,

                        country: "India"

                    })

                })
                    .then(() => {

                        fetch(`/order/place?email=${user.email}`, {

                            method: 'POST'

                        })
                            .then(res => res.text())
                            .then(msg => {

                                console.log(msg);

                                window.location.href = "/order_success.html";

                            });

                    });

            });

    });