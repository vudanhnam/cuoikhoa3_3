document.addEventListener('DOMContentLoaded', () => {
    const cartCountElement = document.querySelector('.cart-count');
    const addToCartButtons = document.querySelectorAll('.add-to-cart');

    addToCartButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const productElement = event.target.closest('.product');
            const productId = productElement.getAttribute('data-id');
            const productName = productElement.getAttribute('data-name');
            const productPrice = productElement.getAttribute('data-price');

            const product = {
                id: productId,
                name: productName,
                price: productPrice,
                quantity: 1
            };

            addToCart(product);
        });
    });

    function addToCart(product) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];

        const existingProductIndex = cart.findIndex(item => item.id === product.id);
        if (existingProductIndex !== -1) {
            cart[existingProductIndex].quantity += 1;
        } else {
            cart.push(product);
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
    }

    function updateCartCount() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCountElement.textContent = totalItems;
    }

    updateCartCount(); // Update cart count on page load
});

//load dữ liệu  keycart lên giỏ hàng
function loadCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsDiv = document.getElementById('cart-items');

    if (cart.length === 0) {
      cartItemsDiv.innerHTML = '<p>Giỏ hàng trống.</p>';
      return;
    }

    cart.forEach(item => {
      const itemDiv = document.createElement('div');
      itemDiv.className = 'product';
      itemDiv.innerHTML = `
        <img src=${item.image} alt="Sản phẩm 1">
            <h2>${item.name}</h2>
            <p>Giá: ${item.price}</p>
      `;
      cartItemsDiv.appendChild(itemDiv);
    });
  }

loadCart();
function xoa() {
    localStorage.removeItem("cart")
    
}
    let products = JSON.parse(localStorage.getItem("product")) || [];

    function renderProducts() {
        productTableBody.innerHTML = '';
        products.forEach((product, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>
                    <button onclick="editProduct(${index})">Sửa</button>
                    <button onclick="deleteProduct(${index})">Xóa</button>
                </td>
            `;
            productTableBody.appendChild(row);
        });
    }
    renderProducts();

    window.deleteProduct = function(index) {
        products.splice(index, 1);
        localStorage.setItem("product",JSON.stringify(products));
        renderProducts();
    };
