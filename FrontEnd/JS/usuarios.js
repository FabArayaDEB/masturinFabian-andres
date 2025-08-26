document.getElementById('usuario-form').onsubmit = async function(e) {
    e.preventDefault();
    const rut = document.getElementById('rut').value.trim();
    const correo = document.getElementById('correo').value.trim();
    const contraseña = document.getElementById('contraseña').value.trim();
    const rol = document.getElementById('rol').value;
    if (!rut || !correo || !contraseña) return alert('Todos los campos son obligatorios');
    try {
        const res = await fetch('/api/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ rut, correo, contraseña, rol })
        });
        const data = await res.json();
        if (res.ok) {
            alert('Usuario creado');
            cargarUsuarios();
        } else {
            alert(data.error || 'Error al crear usuario');
        }
    } catch {
        alert('Error de conexión');
    }
};

async function cargarUsuarios() {
    const tableDiv = document.getElementById('usuarios-table');
    tableDiv.innerHTML = 'Cargando...';
    try {
        const res = await fetch('/api/users');
        const data = await res.json();
        if (res.ok && data.data) {
            tableDiv.innerHTML = renderUsuariosTable(data.data);
        } else {
            tableDiv.innerHTML = data.error || 'Sin usuarios.';
        }
    } catch {
        tableDiv.innerHTML = 'Error de conexión.';
    }
}

function renderUsuariosTable(rows) {
    if (!rows.length) return 'Sin usuarios.';
    let html = '<table><tr><th>RUT</th><th>Correo</th><th>Rol</th><th>Acciones</th></tr>';
    rows.forEach(u => {
        html += `<tr>
            <td>${u.rut}</td>
            <td>${u.correo}</td>
            <td>${u.rol}</td>
            <td><button onclick="eliminarUsuario('${u.rut}')">Eliminar</button></td>
        </tr>`;
    });
    html += '</table>';
    return html;
}

window.eliminarUsuario = async function(rut) {
    if (!confirm('¿Eliminar usuario?')) return;
    try {
        const res = await fetch(`/api/users/${rut}`, { method: 'DELETE' });
        const data = await res.json();
        if (res.ok) {
            alert('Usuario eliminado');
            cargarUsuarios();
        } else {
            alert(data.error || 'Error al eliminar');
        }
    } catch {
        alert('Error de conexión');
    }
};

document.getElementById('logout-btn').onclick = function() {
    localStorage.clear();
    window.location.href = 'index.html';
};

window.onload = cargarUsuarios;
