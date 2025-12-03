const ingreseNombre = document.querySelector("#name");
const ingresePassword = document.querySelector("#pass");
const ingreseGmail = document.querySelector("#email");
const btnEnviar = document.querySelector("#btn");
const div = document.querySelector("#contenedor");

let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

btnEnviar.addEventListener("click", (e) => {
  e.preventDefault();
  const user = {
    username: ingreseNombre.value.trim(),
    password: ingresePassword.value.trim(),
    gmail: ingreseGmail.value.trim(),
  };

  if (user.username === "" || user.password === "" || user.gmail === "") {
    div.innerHTML = "";
    const error = document.createElement("p");
    error.textContent = "Completa los campos vacios";
    error.style.color = "red";
    div.appendChild(error);
    return;
  }
  const usuarioExistente = usuarios.some((u) => {
    return user.username == u.username || user.gmail == u.gmail;
  });
  if (usuarioExistente) {
    div.innerHTML = "";
    const error = document.createElement("p");
    error.textContent = "El usuario ya existe";
    error.style.color = "red";
    div.appendChild(error);
    return;
  }
  usuarios.push(user);

  localStorage.setItem("usuarios", JSON.stringify(usuarios));
  window.location.href = "iniciarsesion.html";
});
