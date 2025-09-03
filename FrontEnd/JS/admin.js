document.addEventListener('DOMContentLoaded', () => {
  // Verificar autenticación
  const token = localStorage.getItem('token');
  if (!token) {
    alert('Acceso denegado. Debe iniciar sesión.');
    window.location.href = 'index.html';
    return;
  }

  try {
    const decoded = jwt_decode(token);
    
    // Verificar si el token ha expirado
    if (decoded.exp * 1000 <= Date.now()) {
      alert('Su sesión ha expirado. Por favor, inicie sesión nuevamente.');
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = 'index.html';
      return;
    }

    // Verificar si es administrador
    if (decoded.rol !== 'admin') {
      alert('Acceso denegado. Solo administradores pueden ingresar aquí.');
      window.location.href = 'marca.html';
      return;
    }

    // Mostrar información del usuario
    const info = document.getElementById('admin-info');
    if (info) info.textContent = `Sesión iniciada como: ${decoded.correo}`;
  } catch (error) {
    console.error('Error al decodificar token:', error);
    alert('Token inválido. Por favor, inicie sesión nuevamente.');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = 'index.html';
    return;
  }

  // Inicializar la interfaz
  inicializarInterfaz();
  cargarUsuarios();

  // Inicializar tema
  inicializarTema();
});

function inicializarTema() {
  const btn = document.getElementById('toggle-theme-btn');
  if (!btn) return;

  // Cargar preferencia guardada
  const modoGuardado = localStorage.getItem('themeMode');
  if (modoGuardado === 'light') {
    document.body.classList.add('light-mode');
    btn.innerHTML = '<i class="fas fa-sun"></i>';
  } else {
    document.body.classList.remove('light-mode');
    btn.innerHTML = '<i class="fas fa-moon"></i>';
  }

  btn.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    const esClaro = document.body.classList.contains('light-mode');
    btn.innerHTML = esClaro ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    localStorage.setItem('themeMode', esClaro ? 'light' : 'dark');
  });
}

function inicializarInterfaz() {
  // Añadir evento para cambiar pestañas activas
  const navButtons = document.querySelectorAll('.nav-btn');
  navButtons.forEach(button => {
    button.addEventListener('click', function() {
      navButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');
    });
  });
}

function mostrarPanel(tipo) {
  document.querySelectorAll('.panel').forEach(p => p.classList.add('hidden'));
  document.getElementById(`panel-${tipo}`)?.classList.remove('hidden');
  
  // Si es el panel de reportes, cargar los reportes al mostrarlo
  if (tipo === 'reportes') {
    filtrarReportes();
  }
}

function cerrarSesion() {
  // Limpiar todos los datos de sesión
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  localStorage.removeItem('userEmail');
  localStorage.removeItem('userRol');
  localStorage.removeItem('rememberMe');
  
  // Redirigir al login
  window.location.href = 'index.html';
}

document.getElementById('usuario-form')?.addEventListener('submit', async function (e) {
  e.preventDefault();

  const rut = document.getElementById('rut').value.trim();
  const correo = document.getElementById('correo').value.trim();
  const contraseña = document.getElementById('contraseña').value.trim();
  const rol = document.getElementById('rol').value;
  const fecha_inicio = document.getElementById('fecha_inicio').value;
  const fecha_fin = document.getElementById('fecha_fin').value;
  const cargo = document.getElementById('cargo').value.trim();
  const sueldo = document.getElementById('sueldo').value;
  const tipo_contrato = document.getElementById('tipo_contrato').value;

  if (!rut || !correo || !contraseña || !fecha_inicio || !cargo || !sueldo) {
    mostrarNotificacion('Completa todos los campos obligatorios', 'error');
    return;
  }

  const token = localStorage.getItem('token');
  if (!token) {
    mostrarNotificacion('Error: No hay token de autenticación', 'error');
    return;
  }

  const nuevoUsuario = {
    rut,
    correo,
    contraseña,
    cargo,
    sueldo: parseFloat(sueldo),
    tipo_contrato,
    fecha_inicio,
    fecha_fin: fecha_fin || null
  };

  try {
    const API_BASE_URL = window.appConfig ? window.appConfig.API_BASE_URL : "http://localhost:3000";
    const response = await fetch(`${API_BASE_URL}/api/trabajadores`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(nuevoUsuario)
    });

    const data = await response.json();

    if (response.ok) {
      mostrarNotificacion('Usuario creado exitosamente', 'success');
      cargarUsuarios();
      this.reset();
    } else {
      mostrarNotificacion(data.error || 'Error al crear usuario', 'error');
    }
  } catch (error) {
    console.error('Error al crear usuario:', error);
    mostrarNotificacion('Error de conexión con el servidor', 'error');
  }
});

async function cargarUsuarios() {
  const tableDiv = document.getElementById('usuarios-table');
  const token = localStorage.getItem('token');

  if (!token) {
    tableDiv.innerHTML = '<div class="no-data"><i class="fas fa-exclamation-triangle"></i><p>Error: No hay token de autenticación.</p></div>';
    return;
  }

  try {
    const API_BASE_URL = window.appConfig ? window.appConfig.API_BASE_URL : "http://localhost:3000";
    const response = await fetch(`${API_BASE_URL}/api/trabajadores`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error('Error al obtener usuarios');
    }

    const data = await response.json();
    const usuarios = data.data || [];

    if (!usuarios.length) {
      tableDiv.innerHTML = '<div class="no-data"><i class="fas fa-users"></i><p>No hay usuarios registrados.</p></div>';
      return;
    }

    let html = '<table><thead><tr><th>RUT</th><th>Correo</th><th>Rol</th><th>Cargo</th><th>Inicio</th><th>Fin</th><th>Acciones</th></tr></thead><tbody>';
    usuarios.forEach(u => {
      html += `<tr>
        <td>${u.rut}</td>
        <td>${u.correo}</td>
        <td><span class="badge ${u.rol === 'admin' ? 'badge-admin' : 'badge-user'}">${u.rol}</span></td>
        <td>${u.cargo || '-'}</td>
        <td>${u.fecha_inicio || '-'}</td>
        <td>${u.fecha_fin || '-'}</td>
        <td class="actions">
          <button onclick="editarUsuario('${u.rut}')" title="Editar"><i class="fas fa-edit"></i></button>
          <button onclick="eliminarUsuario('${u.rut}')" title="Eliminar"><i class="fas fa-trash"></i></button>
        </td>
      </tr>`;
    });
    html += '</tbody></table>';
    tableDiv.innerHTML = html;
  } catch (error) {
    console.error('Error al cargar usuarios:', error);
    tableDiv.innerHTML = '<div class="no-data"><i class="fas fa-exclamation-triangle"></i><p>Error al cargar usuarios del servidor.</p></div>';
  }
}

async function eliminarUsuario(rut) {
  if (!confirm('¿Estás seguro de eliminar este usuario?')) return;
  
  const token = localStorage.getItem('token');
  if (!token) {
    mostrarNotificacion('Error: No hay token de autenticación', 'error');
    return;
  }

  try {
    const API_BASE_URL = window.appConfig ? window.appConfig.API_BASE_URL : "http://localhost:3000";
    const response = await fetch(`${API_BASE_URL}/api/trabajadores/${rut}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    const data = await response.json();

    if (response.ok) {
      mostrarNotificacion('Usuario eliminado correctamente', 'success');
      cargarUsuarios();
    } else {
      mostrarNotificacion(data.error || 'Error al eliminar usuario', 'error');
    }
  } catch (error) {
    console.error('Error al eliminar usuario:', error);
    mostrarNotificacion('Error de conexión con el servidor', 'error');
  }
}

async function editarUsuario(rut) {
  const token = localStorage.getItem('token');
  if (!token) {
    mostrarNotificacion('Error: No hay token de autenticación', 'error');
    return;
  }

  try {
    const API_BASE_URL = window.appConfig ? window.appConfig.API_BASE_URL : "http://localhost:3000";
    const response = await fetch(`${API_BASE_URL}/api/trabajadores/${rut}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error('Error al obtener datos del usuario');
    }

    const data = await response.json();
    const usuario = data.data;

    if (!usuario) {
      mostrarNotificacion('Usuario no encontrado', 'error');
      return;
    }

    document.getElementById('rut').value = usuario.rut;
    document.getElementById('correo').value = usuario.correo;
    document.getElementById('contraseña').value = ''; // No mostrar contraseña por seguridad
    document.getElementById('rol').value = usuario.rol;
    document.getElementById('fecha_inicio').value = usuario.fecha_inicio || '';
    document.getElementById('fecha_fin').value = usuario.fecha_fin || '';
    document.getElementById('cargo').value = usuario.cargo || '';
    document.getElementById('sueldo').value = usuario.sueldo || '';
    document.getElementById('tipo_contrato').value = usuario.tipo_contrato || '';
    
    // Scroll al formulario
    document.getElementById('usuario-form').scrollIntoView({ behavior: 'smooth' });
    
    mostrarNotificacion('Modo edición activado para: ' + usuario.rut, 'info');
  } catch (error) {
    console.error('Error al cargar datos del usuario:', error);
    mostrarNotificacion('Error al cargar datos del usuario', 'error');
  }
}

function filtrarReportes() {
  const tipo = document.getElementById('tipo-reporte').value;
  const desde = document.getElementById('fecha-inicio-reporte').value;
  const hasta = document.getElementById('fecha-fin-reporte').value;

  const reportes = JSON.parse(localStorage.getItem('reportesGenerados')) || [];

  const filtrados = reportes.filter(r => {
    const fecha = r.fecha;
    const tipoCoincide = tipo === 'todos' || r.tipo === tipo;
    const fechaCoincide =
      (!desde || fecha >= desde) &&
      (!hasta || fecha <= hasta);
    return tipoCoincide && fechaCoincide;
  });

  mostrarTablaReportes(filtrados);
}

function mostrarTablaReportes(lista) {
  const contenedor = document.getElementById('tabla-reportes');

  if (!lista.length) {
    contenedor.innerHTML = '<div class="no-data"><i class="fas fa-chart-bar"></i><p>No hay reportes en este rango.</p></div>';
    return;
  }

  let html = '<table><thead><tr><th>RUT</th><th>Tipo</th><th>Fecha</th><th>Hora</th></tr></thead><tbody>';
  lista.forEach(r => {
    html += `<tr>
      <td>${r.rut}</td>
      <td><span class="badge ${getBadgeClassForReport(r.tipo)}">${r.tipo}</span></td>
      <td>${r.fecha}</td>
      <td>${r.hora || '-'}</td>
    </tr>`;
  });
  html += '</tbody></table>';
  contenedor.innerHTML = html;
}

// Función auxiliar para determinar la clase del badge según el tipo de reporte
function getBadgeClassForReport(tipo) {
  switch(tipo) {
    case 'atraso': return 'badge-warning';
    case 'salida anticipada': return 'badge-warning';
    case 'inasistencia': return 'badge-error';
    default: return 'badge-info';
  }
}

// Función para mostrar notificaciones
function mostrarNotificacion(mensaje, tipo = 'info') {
  // Crear elemento de notificación
  const notificacion = document.createElement('div');
  notificacion.className = `notificacion ${tipo}`;
  notificacion.innerHTML = `
    <i class="fas ${tipo === 'success' ? 'fa-check-circle' : tipo === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
    <span>${mensaje}</span>
  `;
  
  // Añadir al cuerpo del documento
  document.body.appendChild(notificacion);
  
  // Mostrar con animación
  setTimeout(() => {
    notificacion.classList.add('mostrar');
  }, 10);
  
  // Ocultar después de 3 segundos
  setTimeout(() => {
    notificacion.classList.remove('mostrar');
    setTimeout(() => {
      document.body.removeChild(notificacion);
    }, 300);
  }, 3000);
}

// Añadir estilos para notificaciones
const estilosNotificacion = document.createElement('style');
estilosNotificacion.textContent = `
  .notificacion {
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 1rem 1.5rem;
    border-radius: 6px;
    color: white;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    z-index: 1000;
    transform: translateX(100%);
    opacity: 0;
    transition: all 0.3s ease;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
  
  .notificacion.mostrar {
    transform: translateX(0);
    opacity: 1;
  }
  
  .notificacion.success {
    background-color: var(--success);
  }
  
  .notificacion.error {
    background-color: var(--accent);
  }
  
  .notificacion.info {
    background-color: var(--primary);
  }
  
  .badge {
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    font-size: 0.8rem;
    font-weight: 500;
  }
  
  .badge-admin {
    background-color: var(--primary);
  }
  
  .badge-user {
    background-color: var(--gray);
  }
  
  .badge-warning {
    background-color: var(--warning);
  }
  
  .badge-error {
    background-color: var(--accent);
  }
  
  .badge-info {
    background-color: var(--primary);
  }
  
  .no-data {
    text-align: center;
    padding: 2rem;
    color: var(--gray);
  }
  
  .no-data i {
    font-size: 3rem;
    margin-bottom: 1rem;
    display: block;
  }
  
  .actions {
    display: flex;
    gap: 0.5rem;
  }
  
  .actions button {
    color: var(--light-text);
  }
  
  .actions button:first-child {
    color: var(--primary);
  }
  
  .actions button:last-child {
    color: var(--accent);
  }
`;
document.head.appendChild(estilosNotificacion);