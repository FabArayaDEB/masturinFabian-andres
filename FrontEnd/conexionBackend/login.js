document.addEventListener("DOMContentLoaded", () => {
    const API = "http://localhost:3000";
    const loginForm = document.getElementById("login-form");
    const buttonId = document.getElementById("button-id");

    if(loginForm){
        loginForm.addEventListener("submit", e => {
            e.preventDefault();

            const correo = document.getElementById("email").value.trim();
            const contraseña = document.getElementById("password").value.trim();

            if (!correo || !contraseña){
                alert("coloca tu correo y contraseña para iniciar sesion");
                return;
            }

            const credenciales = {correo, contraseña};

            fetch(API + "/login", {
                method: "POST",
                headers: {"Content-type": "application/json"},
                body: JSON.stringify(credenciales)
            })
            .then((res) => {
                if (!res.ok){
                    throw new Error("Error en la peticion");
                }
                return res.json();
            })
            .then((data) => {
                localStorage.setItem("token", data.token);
                alert(data.mensaje);
            })
            .catch((err) => {
                alert("ocurrio un problema al iniciar sesion");
            })
        })
    }
})