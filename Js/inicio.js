const usuarioIngresado = document.querySelector("#namesaved");
const contraseñaIngresada = document.querySelector("#passwsaved");
const btnEntrar = document.querySelector("#btnIngresar");
const div2 = document.querySelector("#contenedor2");

const guardados = JSON.parse(localStorage.getItem("usuarios"));
btnEntrar.addEventListener("click", (e) => {
  e.preventDefault();

  const nombreIngresado = usuarioIngresado.value.trim();
  const claveIngresada = contraseñaIngresada.value.trim();
  if (nombreIngresado === "" || claveIngresada === "") {
    div2.innerHTML = "";
    const error = document.createElement("p");
    error.textContent = "Completa los campos vacios";
    error.style.color = "red";
    div2.appendChild(error);
    return;
  }
  const usuarioEncontrado = guardados.find((us) => {
    return nombreIngresado == us.username && claveIngresada === us.password;
  });
  if (usuarioEncontrado) {
    window.location.href = "../pages/productos.html";
  } else {
    div2.innerHTML = "";
    const error = document.createElement("p");
    error.textContent = "Usuario y/o contraseña incorrecto.";
    error.style.color = "red";
    div2.appendChild(error);
  }
});
