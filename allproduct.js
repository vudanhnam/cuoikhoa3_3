let product = JSON.parse(localStorage.getItem("product")) || [];
function displayProducts(productArray) {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';
    productArray.forEach(product => {
        const productItem = document.createElement('div');
        productItem.className = 'product-item';
        productItem.innerHTML = `
            <h2>${product.name}</h2>
            <p>Price: $${product.price}</p>
        `;
        productList.appendChild(productItem);
    });
}

function filterProducts() {
    const searchInput = document.getElementById('search-input').value.toLowerCase();
    const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(searchInput)
    );
    displayProducts(filteredProducts);
}

displayProducts(products);