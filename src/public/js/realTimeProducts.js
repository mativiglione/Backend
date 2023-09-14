const socket = io();

const form = document.getElementById("formProduct");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const datForm = new FormData(e.target);
  const prod = Object.fromEntries(datForm);
  socket.emit("nuevoProducto", prod);
  socket.on("mensajeProductoCreado", (mensaje) => {
    Swal.fire(mensaje);
  });
  e.target.reset();
});

socket.on("products", (products) => {
  const productsDiv = document.getElementById("productsDiv");

  productsDiv.innerHTML = "";
  products.forEach((prod) => {
    productsDiv.innerHTML += `
        <div class="product-container shadow">
          <p>Id: ${prod.id}</p>
          <p>Title: ${prod.title}</p>
          <p>Description: ${prod.description}</p>
          <p>Price: ${prod.price}</p>
          <p>Status: ${prod.status}</p>
          <p>Code: ${prod.code}</p>
          <p>Stock: ${prod.stock}</p>
        </div>
        `;
  });
});
