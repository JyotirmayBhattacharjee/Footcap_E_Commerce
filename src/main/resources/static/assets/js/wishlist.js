document.addEventListener("DOMContentLoaded", () => {

    fetch('/api/user')
        .then(res => res.json())
        .then(user => {

            fetch(`/wishlist/items?email=${user.email}`)
                .then(res => res.json())
                .then(items => {

                    const wishlistDiv =
                        document.getElementById("wishlistItems");

                    items.forEach(item => {

                        wishlistDiv.innerHTML += `
                    <div class="wishlist-item">

                        <div class="product-info">
                            <h3>${item.productName}</h3>
                            <p>${item.price}</p>
                        </div>

                        <div>

                                <button
                                    class="cart-btn"
                                    onclick="addWishlistToCart(${item.id},
                                    '${item.productName}',
                                    ${item.price})">

                                    Add To Cart

                                </button>

                                <button
                                    class="delete-btn"
                                    onclick="deleteWishlistItem(${item.id})">

                                    Delete

                                </button>

                         </div>

                    </div>
                `;

                    });

                });

        });

});

function deleteWishlistItem(id) {

    fetch(`/wishlist/delete/${id}`, {
        method: 'DELETE'
    })
        .then(() => {
            location.reload();
        });

}


function addWishlistToCart(
    wishlistId,
    productName,
    price
){

    fetch('/api/user')
    .then(res => res.json())
    .then(user => {

        fetch('/cart/add', {

            method:'POST',

            headers:{
                'Content-Type':'application/json'
            },

            body: JSON.stringify({

                userEmail:user.email,

                productName:productName,

                price:price,

                quantity:1

            })

        })
        .then(() => {

            deleteWishlistItem(
                wishlistId
            );

        });

    });

}