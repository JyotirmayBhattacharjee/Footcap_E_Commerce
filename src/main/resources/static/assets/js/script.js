'use strict';


/**
 * navbar toggle
 */

const overlay = document.querySelector("[data-overlay]");
const navOpenBtn = document.querySelector("[data-nav-open-btn]");
const navbar = document.querySelector("[data-navbar]");
const navCloseBtn = document.querySelector("[data-nav-close-btn]");

const navElems = [overlay, navOpenBtn, navCloseBtn];

for (let i = 0; i < navElems.length; i++) {
    navElems[i].addEventListener("click", function () {
        navbar.classList.toggle("active");
        overlay.classList.toggle("active");
    });
}



/**
 * header & go top btn active on page scroll
 */

const header = document.querySelector("[data-header]");
const goTopBtn = document.querySelector("[data-go-top]");

window.addEventListener("scroll", function () {
    if (window.scrollY >= 80) {
        header.classList.add("active");
        goTopBtn.classList.add("active");
    } else {
        header.classList.remove("active");
        goTopBtn.classList.remove("active");
    }
});

const loginIcon = document.getElementById('user-login-btn');







document.addEventListener("DOMContentLoaded", () => {

    loadCartCount();
    loadWishlistCount();

    const userArea = document.getElementById("userArea");

    fetch('/api/user')
        .then(response => response.json())
        .then(user => {
            loadCartCount();

            if (user.loggedIn && userArea) {

                const firstLetter = user.name.charAt(0).toUpperCase();

                userArea.innerHTML = `
                    <a href="#" class="nav-action-btn">

    <img
        id="profileImage"
        src="${user.picture}"
        alt="Profile"
        referrerpolicy="no-referrer"
        style="
            width:40px;
            height:40px;
            border-radius:50%;
            object-fit:cover;
        "
    >

    <span style="
        color:black;
        margin-left:10px;
        font-size:14px;
        font-weight:600;
        display:inline-block;
    ">
        ${user.name}
    </span>

    <a href="/logout"
       style="
            margin-left:10px;
            color:red;
            font-size:13px;
            font-weight:600;
            text-decoration:none;
       ">
       Logout
    </a>

</a>
                `;

                const profileImage = document.getElementById("profileImage");

                profileImage.onerror = function () {
                    userArea.innerHTML = `
                        <a href="#" class="nav-action-btn">

                            <div style="
                                width:40px;
                                height:40px;
                                border-radius:50%;
                                background:#000;
                                color:#fff;
                                display:flex;
                                align-items:center;
                                justify-content:center;
                                font-weight:bold;
                                font-size:16px;
                            ">
                                ${firstLetter}
                            </div>

                            <span class="nav-action-text">
                                ${user.name}
                            </span>

                        </a>
                    `;
                };

            }

        })
        .catch(error => {
            console.error("Error:", error);
        });

});

function loadCartCount() {

    fetch('/api/user')
        .then(res => res.json())
        .then(user => {

            if (!user.loggedIn) return;

            fetch(`/cart/count?email=${user.email}`)
                .then(res => res.text())
                .then(count => {

                    const badge =
                        document.getElementById("cartCount");

                    if (badge) {

                        badge.textContent = count;
                        badge.setAttribute("value", count);
                    }
                });

        });

}




// cart

document.querySelectorAll('ion-icon[name="cart-outline"]')
    .forEach(icon => {

        const button = icon.closest("button");

        button.addEventListener("click", () => {

            const productCard =
                button.closest(".product-card");

            const productName =
                productCard.querySelector(".card-title a")
                    .textContent.trim();

            const price =
                parseFloat(
                    productCard.querySelector(".card-price")
                        .getAttribute("value")
                );

            fetch('/api/user')
                .then(res => res.json())
                .then(user => {

                    if (!user.loggedIn) {
                        alert("Please Login First");
                        return;
                    }

                    fetch('/cart/add', {

                        method: 'POST',

                        headers: {
                            'Content-Type':
                                'application/json'
                        },

                        body: JSON.stringify({

                            userEmail: user.email,
                            productName: productName,
                            price: price,
                            quantity: 1
                        })
                    })

                        .then(() => {

                            loadCartCount();

                        });


                });

        });

    });



function loadWishlistCount() {

    fetch('/api/user')
        .then(res => res.json())
        .then(user => {

            if (!user.loggedIn) return;

            fetch(`/wishlist/count?email=${user.email}`)
                .then(res => res.text())
                .then(count => {

                    const badge =
                        document.getElementById("wishlistCount");

                    if (badge) {

                        badge.textContent = count;

                        badge.setAttribute(
                            "value",
                            count
                        );

                    }

                });

        });

}










document.querySelectorAll(".card-action-item")
.forEach(item => {

    const heartIcon =
        item.querySelector(
            'ion-icon[name="heart-outline"]'
        );

    if(!heartIcon) return;

    const button =
        item.querySelector(".card-action-btn");

    button.addEventListener("click", () => {

        const productCard =
            button.closest(".product-card");

        console.log("HEART CLICKED");

        const productName =
            productCard.querySelector(".card-title a")
            .textContent.trim();

        const price =
            parseFloat(
                productCard.querySelector(".card-price")
                .getAttribute("value")
            );

        fetch('/api/user')
        .then(res => res.json())
        .then(user => {

            if(!user.loggedIn){

                alert("Please Login First");
                return;

            }

            fetch('/wishlist/add', {

                method: 'POST',

                headers: {
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify({

                    userEmail: user.email,
                    productName: productName,
                    price: price

                })

            })
            .then(response => {

                console.log(
                    "Wishlist Status:",
                    response.status
                );

                loadWishlistCount();

            });

        });

    });

});