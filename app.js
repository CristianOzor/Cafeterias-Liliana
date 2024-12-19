let cart = [];

// Función para actualizar la visualización del carrito
// .map para recorrer el array vacio por cada item y crear una fila de la tabla
function updateCartDisplay() {
    const cartContainer = document.querySelector('.cart-container');
    cartContainer.innerHTML = `
        <table class="table">
            <thead>
                <tr>
                    <th>Imagen</th>
                    <th>Producto</th>
                    <th>Precio</th>
                    <th>Cantidad</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>           
                ${cart.map(item => `
                    <tr>
                        <td><img src="${item.image}" alt="${item.title}" style="width: 50px;"/></td>
                        <td>${item.title}</td>
                        <td>$ ${item.price}</td>
                        <td>${item.quantity}</td>
                        <td><button class="btn-1" onclick="removeFromCart('${item.title}')">Quitar</button></td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;

    //Función para calcular el total de la compra
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartContainer.innerHTML += `<h4>Total: $ ${total}</h4>`;
    
    // Mostrar botón de finalizar compra si hay productos en el carrito
    if (cart.length > 0) {
        cartContainer.innerHTML += `<button class="btn-finish" onclick="finishPurchase()">Finalizar Compra</button>`;
    }
}

// Función para agregar productos al carrito para que no se repita el mismo producto y se sume
function addToCart(title, price, image) {
    const existingItem = cart.find(item => item.title === title);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ title, price, quantity: 1, image });
    }
    updateCartDisplay();
}

// Función para quitar productos del carrito
function removeFromCart(title) {
    const index = cart.findIndex(item => item.title === title);
    if (index > -1) {
        cart[index].quantity--;
        if (cart[index].quantity <= 0) {
            cart.splice(index, 1);
        }
    }
    updateCartDisplay();
}

// Función para finalizar la compra y generar el ticket
function finishPurchase() {
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    let ticketContent = '===== TICKET DE COMPRA =====\n\n';

    // Detallar los productos en el ticket
    cart.forEach(item => {
        ticketContent += `${item.title} - $ ${item.price} x ${item.quantity} = $ ${(item.price * item.quantity).toFixed(2)}\n`;
    });

    ticketContent += `\nTotal: $ ${total.toFixed(2)}\n\nGracias por tu compra!`;

    // Crear el archivo de texto con el contenido del ticket
    const blob = new Blob([ticketContent], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'ticket_compra.txt';
    link.click();

    // Vaciar el carrito
    cart = [];
    updateCartDisplay();
}

// Agrega este evento a los botones "Agregar al Carrito" extrayendo los datos de las cards que estan en el html
document.querySelectorAll('.btn-1').forEach(button => {
    button.addEventListener('click', (e) => {
        const card = e.target.closest('.card'); //Apuntamos a traer los datos de las cards
        const title = card.querySelector('.card-title').innerText; //Traemos los datos que nosotros queremos para el carrito de compra (imagen,titulo y precio)
        const price = parseFloat(card.querySelector('.card-price').innerText.replace('$ ', '')); //para que salga el precio con centavos
        const image = card.querySelector('.card-img-top').src; // Obtener la imagen de la card
        addToCart(title, price, image);
        console.log(cart);
    });
});