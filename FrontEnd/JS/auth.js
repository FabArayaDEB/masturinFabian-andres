// ...validación de login...
document.getElementById('login-form')?.addEventListener('submit', async function(e) {
    e.preventDefault();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const errorsUl = document.getElementById('error-list');
    errorsUl.innerHTML = '';

    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
        errorsUl.innerHTML += '<li>Correo inválido.</li>';
        return;
    }
    if (!password) {
        errorsUl.innerHTML += '<li>Contraseña obligatoria.</li>';
        return;
    }

    try {
        const res = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ correo: email, contraseña: password })
        });
        const data = await res.json();
        if (res.ok) {
            localStorage.setItem('userEmail', email);
            // Redirigir según rol (simulado)
            window.location.href = data.rol === 'admin' ? 'admin.html' : 'asistencia.html';
        } else {
            errorsUl.innerHTML += `<li>${data.error || 'Credenciales inválidas.'}</li>`;
        }
    } catch {
        errorsUl.innerHTML += '<li>Error de conexión.</li>';
    }
});

// ...validación de registro...
document.getElementById('register-form')?.addEventListener('submit', async function(e) {
    e.preventDefault();
    const email = document.getElementById('reg-email').value.trim();
    const password = document.getElementById('reg-password').value.trim();
    const errorsUl = document.getElementById('register-error-list');
    errorsUl.innerHTML = '';

    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
        errorsUl.innerHTML += '<li>Correo inválido.</li>';
        return;
    }
    if (!password || password.length < 6) {
        errorsUl.innerHTML += '<li>Contraseña mínima 6 caracteres.</li>';
        return;
    }

    try {
        const res = await fetch('/api/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ correo: email, contraseña: password, rol: 'trabajador' })
        });
        const data = await res.json();
        if (res.ok) {
            window.location.href = 'index.html';
        } else {
            errorsUl.innerHTML += `<li>${data.error || 'No se pudo registrar.'}</li>`;
        }
    } catch {
        errorsUl.innerHTML += '<li>Error de conexión.</li>';
    }
});
