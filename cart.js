let cart = [];
const lang = document.documentElement.lang;

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
    // Save the updated cart array to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    updateCartDisplay(); // Actualizar la visualización del carrito
}

function updateCartDisplay() {
    //const lang = document.documentElement.lang; // Retrieve the page's language setting

    // Find the element in your HTML where you want to display the cart details
    const cartDisplay = document.getElementById('cart-items');
    if (!cartDisplay) return;

    // Clear the current content
    cartDisplay.innerHTML = '';

    // Calculate the total
    let total = 0;
    // Iterate over the cart items and create HTML elements for each
    cart.forEach((item, index) => {
        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item';

        const nameElement = document.createElement('p');
        const priceElement = document.createElement('p');
        const quantityElement = document.createElement('p');
        const subtotalElement = document.createElement('p');

        const subtotal = (item.price * item.pieces) / 100;
        total += subtotal;



        if (lang === 'es') {
            nameElement.textContent = `Producto: ${item.productName}`;
            priceElement.textContent = `Precio: ${item.price}ct por pieza`;
            quantityElement.textContent = `Cantidad: ${item.pieces} piezas`;
            subtotalElement.textContent = `Subtotal: ${subtotal}$`;
        } else if (lang === 'en') {
            itemElement.className = 'cart-item';
            priceElement.textContent = `Price: ${item.price}ct each`;
            quantityElement.textContent = `Quantity: ${item.pieces} pieces`;
            subtotalElement.textContent = `Subtotal: ${subtotal}$`;
        }

        // Add elements to the item container
        itemElement.appendChild(nameElement);
        itemElement.appendChild(priceElement);
        itemElement.appendChild(quantityElement);
        itemElement.appendChild(subtotalElement);

        // Add remove button
        const removeButton = document.createElement('button');
        removeButton.textContent = lang === 'es' ? 'Eliminar' : 'Delete';
        removeButton.onclick = function() { removeFromCart(index); };

        itemElement.appendChild(removeButton);

        // Add item to the cart display
        cartDisplay.appendChild(itemElement);
    });

    // Display the total
    const totalDisplay = document.getElementById('total');
    if (totalDisplay) {
        totalDisplay.textContent = `Total: ${total}$`;
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
