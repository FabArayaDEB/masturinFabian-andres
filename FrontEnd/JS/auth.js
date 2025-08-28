document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('login-form');
  const errorsUl = document.getElementById('error-list');

  form?.addEventListener('submit', async function (e) {
    e.preventDefault();
    errorsUl.innerHTML = '';

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    // 🔍 Validación básica
    const errores = [];
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      errores.push('Correo inválido.');
    }
    if (!password) {
      errores.push('Contraseña obligatoria.');
    }

    if (errores.length) {
      errores.forEach(msg => {
        const li = document.createElement('li');
        li.innerText = msg;
        errorsUl.appendChild(li);
      });
      return;
    }

    // 🧪 Simulación local (sin backend)
    const usuariosDemo = [
      { correo: 'admin@empresa.com', contraseña: 'admin123', rol: 'admin' },
      { correo: 'usuario@empresa.com', contraseña: 'usuario123', rol: 'trabajador' }
    ];

    const usuarioSimulado = usuariosDemo.find(
      u => u.correo === email && u.contraseña === password
    );

    if (usuarioSimulado) {
      localStorage.setItem('userEmail', usuarioSimulado.correo);
      localStorage.setItem('userRol', usuarioSimulado.rol);
      window.location.href = usuarioSimulado.rol === 'admin' ? 'admin.html' : 'marca.html';
      return;
    }

    // 🌐 Intento real con backend
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ correo: email, contraseña: password })
      });

      const data = await res.json();

      if (res.ok && data.rol) {
        localStorage.setItem('userEmail', email);
        localStorage.setItem('userRol', data.rol);
        window.location.href = data.rol === 'admin' ? 'admin.html' : 'marca.html';
      } else {
        const li = document.createElement('li');
        li.innerText = data.error || 'Credenciales inválidas.';
        errorsUl.appendChild(li);
      }
    } catch {
      const li = document.createElement('li');
      li.innerText = 'Error de conexión con el servidor.';
      errorsUl.appendChild(li);
    }
  });
});
