document.getElementById('btn-entrada').onclick = async function() {
    await registrarAsistencia('entrada');
};
document.getElementById('btn-salida').onclick = async function() {
    await registrarAsistencia('salida');
};
document.getElementById('logout-btn').onclick = function() {
    localStorage.clear();
    window.location.href = 'index.html';
};

async function registrarAsistencia(tipo) {
    const correo = localStorage.getItem('userEmail');
    const msgDiv = document.getElementById('asistencia-msg');
    msgDiv.innerText = '';
    if (!correo) {
        window.location.href = 'index.html';
        return;
    }
    try {
        const res = await fetch('/api/attendance/' + (tipo === 'entrada' ? 'checkin' : 'checkout'), {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ correo })
        });
        const data = await res.json();
        if (res.ok) {
            msgDiv.innerText = 'Registro exitoso: ' + tipo;
        } else {
            msgDiv.innerText = data.error || 'Error al registrar asistencia.';
        }
    } catch {
        msgDiv.innerText = 'Error de conexión.';
    }
}
