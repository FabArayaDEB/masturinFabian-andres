document.getElementById('login-form')
  .addEventListener('submit', function(e) {
    e.preventDefault();

    const emailField     = document.getElementById('email');
    const passwordField  = document.getElementById('password');
    const errorsUl       = document.getElementById('error-list');

    errorsUl.innerHTML = '';

    const email    = emailField.value.trim();
    const password = passwordField.value.trim();
    const errors   = [];

    if (!email) {
      errors.push('El correo electrónico es obligatorio.');
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      errors.push('Formato de correo inválido.');
    }

    if (!password) {
      errors.push('La contraseña es obligatoria.');
    }

    if (errors.length) {
      errors.forEach(msg => {
        const li = document.createElement('li');
        li.innerText = msg;
        errorsUl.appendChild(li);
      });
      return;
    }

    const demoEmail = 'usuario@dominio.com';
    const demoPass  = 'demo123';

    if (email === demoEmail && password === demoPass) {
      localStorage.setItem('userEmail', email);
      window.location.href = 'dashboard.html';
    } else {
      const li = document.createElement('li');
      li.innerText = 'Credenciales inválidas.';
      errorsUl.appendChild(li);
    }
  });
