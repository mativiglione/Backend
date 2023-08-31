const socket = io();

const botonChat = document.getElementById("botonChat");
const parrafosMensajes = document.getElementById("parrafosMensajes");
const valInput = document.getElementById("chatBox");
let user;

Swal.fire({
  title: "Identificacion de usuario",
  text: "Ingrese su nombre de usuario",
  input: "text",
  inputValidator: (valor) => {
    return !valor && "Ingrese un nombre de usuario valido";
  },
  allowOutsideClick: false,
}).then((resultado) => {
  user = resultado.value;
  console.log(user);
});

botonChat.addEventListener("click", () => {
  let fechaActual = new Date().toLocaleString();
  console.log(fechaActual);
  if (valInput.value.trim().length > 0) {
    //evitar mensajes vacios
    socket.emit("mensaje", {
      fecha: fechaActual,
      user: user,
      mensaje: valInput.value,
    });
    valInput.value = ""; //limpiar input
  }
});

socket.on("mensajes", (arrayMensajes) => {
  parrafosMensajes.innerHTML = "";
  arrayMensajes.forEach((mensaje) => {
    parrafosMensajes.innerHTML += `<p>${mensaje.fecha} : ${mensaje.user} escribio ${mensaje.mensaje}</p>`;
  });
});
