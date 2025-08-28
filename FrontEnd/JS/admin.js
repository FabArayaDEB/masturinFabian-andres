document.addEventListener('DOMContentLoaded', () => {
  // Validar sesión y rol
  const email = localStorage.getItem('userEmail');
  const rol = localStorage.getItem('userRol');

  if (!email || rol !== 'admin') {
    alert('Acceso denegado. Solo administradores pueden ingresar aquí.');
    window.location.href = 'index.html';
    return;
  }

  // Mostrar correo del admin (opcional)
  const infoDiv = document.getElementById('admin-info');
  if (infoDiv) {
    infoDiv.textContent = `Sesión iniciada como: ${email}`;
  }

  // Cierre de sesión
  const logoutBtn = document.getElementById('logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      localStorage.clear();
      window.location.href = 'index.html';
    });
  }
});

// Alternar entre paneles
function mostrarPanel(tipo) {
  const panels = ['usuarios', 'reportes'];
  panels.forEach(p => {
    const panel = document.getElementById(`panel-${p}`);
    if (panel) panel.classList.add('hidden');
  });

  const activePanel = document.getElementById(`panel-${tipo}`);
  if (activePanel) activePanel.classList.remove('hidden');
}
