document.getElementById('btn-filtrar').onclick = async function() {
    const tipo = document.getElementById('tipo-reporte').value;
    const fecha = document.getElementById('fecha-reporte').value;
    const tableDiv = document.getElementById('reporte-table');
    tableDiv.innerHTML = 'Cargando...';
    try {
        const res = await fetch(`/api/attendance/reports?tipo=${tipo}&fecha=${fecha}`);
        const data = await res.json();
        if (res.ok && data.data) {
            tableDiv.innerHTML = renderTable(data.data);
        } else {
            tableDiv.innerHTML = data.error || 'Sin datos.';
        }
    } catch {
        tableDiv.innerHTML = 'Error de conexión.';
    }
};
document.getElementById('logout-btn').onclick = function() {
    localStorage.clear();
    window.location.href = 'index.html';
};

function renderTable(rows) {
    if (!rows.length) return 'Sin resultados.';
    let html = '<table><tr>';
    Object.keys(rows[0]).forEach(k => html += `<th>${k}</th>`);
    html += '</tr>';
    rows.forEach(row => {
        html += '<tr>';
        Object.values(row).forEach(v => html += `<td>${v}</td>`);
        html += '</tr>';
    });
    html += '</table>';
    return html;
}
