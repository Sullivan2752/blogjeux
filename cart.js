document.addEventListener('DOMContentLoaded', () => {
    const cart = [];
    const products = [
        { id: 1, name: 'Produit 1', price: 20 },
        { id: 2, name: 'Produit 2', price: 30 },
        { id: 3, name: 'Produit 3', price: 40 }
    ];

    const updateCartDisplay = () => {
        const cartItemsContainer = document.querySelector('.cart-items');
        const cartTotalAmount = document.getElementById('cart-total-amount');

        cartItemsContainer.innerHTML = '';
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p>Votre panier est vide.</p>';
        } else {
            let totalAmount = 0;
            cart.forEach(item => {
                const product = products.find(p => p.id === item.productId);
                const cartItem = document.createElement('div');
                cartItem.className = 'cart-item';
                cartItem.innerHTML = `
                    <p>${product.name} - ${item.quantity} x ${product.price}€</p>
                `;
                cartItemsContainer.appendChild(cartItem);
                totalAmount += item.quantity * product.price;
            });
            cartTotalAmount.textContent = `${totalAmount}€`;
        }
    };

    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', () => {
            const productId = parseInt(button.closest('.product').getAttribute('data-product-id'));
            const cartItem = cart.find(item => item.productId === productId);

            if (cartItem) {
                cartItem.quantity += 1;
            } else {
                cart.push({ productId, quantity: 1 });
            }

            updateCartDisplay();
        });
    });

    document.getElementById('checkout').addEventListener('click', () => {
        alert('Merci pour votre achat!');
        cart.length = 0;
        updateCartDisplay();
    });

    updateCartDisplay();
});
