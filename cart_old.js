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

            const subtotal = (item.price * item.pieces)/100;
            total += subtotal;
            const subtotalElement = document.createElement('p');
            subtotalElement.textContent = `Subtotal: ${subtotal}$`;

        // Añadir los elementos al contenedor del artículo
        itemElement.appendChild(nameElement);
        itemElement.appendChild(priceElement);
        itemElement.appendChild(quantityElement);
        itemElement.appendChild(subtotalElement);

        // Añadir el artículo al display del carrito
        cartDisplay.appendChild(itemElement);
        //Botón para eliminar artículo
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Eliminar';
        
        removeButton.onclick = function() { removeFromCart(index); }; // Asignar función para eliminar

        itemElement.appendChild(removeButton); // Añadir botón al elemento del artículo
        cartDisplay.appendChild(itemElement); // Añadir elemento al display del carrito
    });

    // Mostrar el total
    const totalDisplay = document.getElementById('total');
    if (totalDisplay) {
        totalDisplay.textContent = `Total: ${total}$`;
    }
}