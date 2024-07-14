document.addEventListener('DOMContentLoaded', () => {
    const addProductBtn = document.getElementById('addProductBtn');
    const productModal = document.getElementById('productModal');
    const closeBtn = document.querySelector('.modal-content .close');
    const productForm = document.getElementById('productForm');
    const productTableBody = document.getElementById('productTableBody');

    let products = [];

    addProductBtn.addEventListener('click', () => {
        productForm.reset();
        productModal.style.display = 'flex';
    });

    closeBtn.addEventListener('click', () => {
        productModal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === productModal) {
            productModal.style.display = 'none';
        }
    });

    productForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const product = {
            id: productForm.productId.value,
            name: productForm.productName.value,
            category: productForm.productCategory.value,
            price: productForm.productPrice.value,
            quantity: productForm.productQuantity.value,
            status: productForm.productStatus.value
        };
        products.push(product);
        productModal.style.display = 'none';
        renderProducts();
    });

    function renderProducts() {
        productTableBody.innerHTML = '';
        products.forEach((product, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${product.id}</td>
                <td>${product.name}</td>
                <td>${product.category}</td>
                <td>${product.price}</td>
                <td>${product.quantity}</td>
                <td>${product.status}</td>
                <td>
                    <button onclick="editProduct(${index})">Sửa</button>
                    <button onclick="deleteProduct(${index})">Xóa</button>
                </td>
            `;
            productTableBody.appendChild(row);
        });
    }

    window.editProduct = function(index) {
        const product = products[index];
        productForm.productId.value = product.id;
        productForm.productName.value = product.name;
        productForm.productCategory.value = product.category;
        productForm.productPrice.value = product.price;
        productForm.productQuantity.value = product.quantity;
        productForm.productStatus.value = product.status;
        productModal.style.display = 'flex';
    };

    window.deleteProduct = function(index) {
        products.splice(index, 1);
        renderProducts();
    };
});

