let total = 0;
document.addEventListener("DOMContentLoaded", () => {

    fetch('/api/user')
        .then(res => res.json())
        .then(user => {

            fetch(`/cart/items?email=${user.email}`)
                .then(res => res.json())
                .then(items => {

                    const cartDiv =
                        document.getElementById(
                            "cartItems"
                        );

                    items.forEach(item => {
                        total += item.price;
                        cartDiv.innerHTML += `
<div class="cart-item">

    <div class="product-info">
        <h3>${item.productName}</h3>
        <p>${item.price}</p>
    </div>

    <button
        class="delete-btn"
        onclick="deleteCartItem(${item.id})">

        Delete
    </button>

</div>
`;

                    });

                    cartDiv.innerHTML += `
                    <div class="total-box">
                        Total: ${total.toFixed(2)}
                    </div>

                    <a href="index.html" class="continue-btn">
                        Continue Shopping
                    </a>
                    `;

                });

        });
    loadCartCount();

});


function deleteCartItem(id) {

    fetch(`/cart/delete/${id}`, {
        method: 'DELETE'
    })
        .then(response => {

            console.log(response.status);

            if (response.ok) {
                location.reload();
            }

        });

}

