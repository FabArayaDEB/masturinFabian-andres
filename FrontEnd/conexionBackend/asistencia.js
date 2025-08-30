document.addEventListener("DOMContentLoaded", () => {
    const API = "http://localhost:3000";
    const btnEntrada = document.getElementById("btn-entrada");
    const btnSalida = document.getElementById("btn-salida-final");
    const btnSalidaColacion = document.getElementById("btn-salida-colacion");
    const btnEntradaColacion = document.getElementById("btn-entrada-colacion")

    const token = localStorage.getItem("token");
    const payload = jwt_decode(token);

    //marcar entrada
    btnEntrada.addEventListener("click", async () => {
        const correo = payload.correo;
        console.log(correo);

        fetch(API + "/entrada", {
            method: 'POST',
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({ correo })
        }).then(async res => {
            const data = await res.json();
            if (!res.ok) throw new Error(data.error);
            return data;

        }).then(data => {
            alert(data.data.mensaje);
        }).catch((err) => {
            alert(err.message);
        })
    })

    //marcar salida
    btnSalida.addEventListener("click", async () => {
        const correo = payload.correo;
        console.log(correo)

        fetch(API + "/salida", {
            method: 'POST',
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({ correo })
        }).then(async res => {
            const data = await res.json();
            if (!res.ok) throw new Error(data.error);
            return data;
        }).then(data => {
            alert(data.data.mensaje);
        }).catch((err) => {
            alert(err.message);
        })
    })

    //marcar salida colacion
    btnSalidaColacion.addEventListener("click", async () => {
        const correo = payload.correo;
        console.log(correo)

        fetch(API + "/salidaColacion", {
            method: 'POST',
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({ correo })
        }).then(async res => {
            const data = await res.json();
            if (!res.ok) throw new Error(data.error);
            return data;
        }).then(data => {
            alert(data.data.mensaje);
        }).catch((err) => {
            alert(err.message);
        })
    })

        //marcar entrada colacion
    btnEntradaColacion.addEventListener("click", async () => {
        const correo = payload.correo;
        console.log(correo)

        fetch(API + "/entradaColacion", {
            method: 'POST',
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({ correo })
        }).then(async res => {
            const data = await res.json();
            if (!res.ok) throw new Error(data.error);
            return data;
        }).then(data => {
            alert(data.data.mensaje);
        }).catch((err) => {
            alert(err.message);
        })
    })
})