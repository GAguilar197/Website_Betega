let cart = [];

function addToCart(productName, price, pieces, lang) {
    // Verifica si la cantidad es válida
    if (pieces < 200) {
        let message;
        if(lang== 'es'){
            message = `La cantidad mínima es 200 piezas.`;
        }
        else if(lang == 'en'){
            message = `The minimum quantity is 200 pieces.`;
        }
        const cartMessage = document.getElementById("cart-message");
        cartMessage.textContent = message;
        cartMessage.style.display = "block";
        cartMessage.style.color = "red";
    
        setTimeout(() => {
            cartMessage.style.display = "none";
        }, 5000);
        return;
    }

    // Añade el producto al carrito
    // Suponiendo que 'cart' es un array que almacena los productos
    cart.push({ productName, price, pieces});

    // Actualiza la interfaz del usuario
    updateCartDisplay();
    // Save the updated cart array to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    showAddedItems(productName, price, pieces);
}

function showAddedItems(productName, price, pieces){

        const message = `Added ${pieces} ${productName} to the cart for $${price}`;

        // Show the message
        const cartMessage = document.getElementById("cart-message");
        cartMessage.textContent = message;
        cartMessage.style.display = "block";
        cartMessage.style.color = "green";
    
        // You can hide the message after a few seconds if desired
        // setTimeout(() => {
        //     cartMessage.style.display = "none";
        // }, 3000);
}

function removeFromCart(index) {
    cart.splice(index, 1); // Eliminar artículo del carrito
    updateCartDisplay(); // Actualizar la visualización del carrito
}

function updateCartDisplay() {
    // Actualiza la visualización del carrito de compras
    // Encuentra el elemento en tu HTML donde deseas mostrar los detalles del carrito
    const cartDisplay = document.getElementById('cart-items');
    if (!cartDisplay) return;

    // Vacía el contenido actual
    cartDisplay.innerHTML = '';

    // Calcular el total
    let total = 0;

    // Itera sobre los elementos del carrito y crea elementos HTML para cada uno
    cart.forEach((item, index) => {
        // ... creación de elementos existentes ...
        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item';

        const nameElement = document.createElement('p');
        nameElement.textContent = `Producto: ${item.productName}`;

        const priceElement = document.createElement('p');
        priceElement.textContent = `Precio: ${item.price}ct por pieza`;

        const quantityElement = document.createElement('p');
        quantityElement.textContent = `Cantidad: ${item.pieces} piezas`;

        const subtotal = item.price * item.pieces;
        total += subtotal;
        const subtotalElement = document.createElement('p');
        subtotalElement.textContent = `Subtotal: ${subtotal}ct`;

        // Añadir los elementos al contenedor del artículo
        itemElement.appendChild(nameElement);
        itemElement.appendChild(priceElement);
        itemElement.appendChild(quantityElement);
        itemElement.appendChild(subtotalElement);

        // Añadir el artículo al display del carrito
        cartDisplay.appendChild(itemElement);
        // Botón para eliminar artículo
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Eliminar';
        removeButton.onclick = function() { removeFromCart(index); }; // Asignar función para eliminar

        itemElement.appendChild(removeButton); // Añadir botón al elemento del artículo
        cartDisplay.appendChild(itemElement); // Añadir elemento al display del carrito
    });

    // Mostrar el total
    const totalDisplay = document.getElementById('total');
    if (totalDisplay) {
        totalDisplay.textContent = `Total: ${total}ct`;
    }
}

function placeOrder() {
    // Procesa el pedido
    // Puedes enviar la información a un backend o a un sistema de pago
}

//Event Listener para cargar el carrito de compras
document.addEventListener('DOMContentLoaded', (event) => {
    if (localStorage.getItem('cart')) {
        cart = JSON.parse(localStorage.getItem('cart'));
        updateCartDisplay();
    }
});
