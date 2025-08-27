document.addEventListener('DOMContentLoaded', () => {
  const clockEl = document.getElementById('clock');
  const dateEl = document.getElementById('date');
  const contadorEl = document.getElementById('contador');
  const registroEl = document.getElementById('registro');

  const btnEntrada         = document.getElementById('entrada');
  const btnSalidaColacion  = document.getElementById('salida-colacion');
  const btnEntradaColacion = document.getElementById('entrada-colacion');
  const btnSalidaTurno     = document.getElementById('salida-turno');

  let contadorInterval;
  let colacionInterval;
  let contadorSegundos = 0;
  let estado = 'inactivo';

  function updateClock() {
    const now = new Date();
    const h = String(now.getHours()).padStart(2, '0');
    const m = String(now.getMinutes()).padStart(2, '0');
    const s = String(now.getSeconds()).padStart(2, '0');
    clockEl.textContent = `${h}:${m}:${s}`;

    const opts = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    let txt = now.toLocaleDateString('es-ES', opts);
    txt = txt.charAt(0).toUpperCase() + txt.slice(1);
    dateEl.textContent = txt;
  }

  function formatSegundos(segundos) {
    const h = String(Math.floor(segundos / 3600)).padStart(2, '0');
    const m = String(Math.floor((segundos % 3600) / 60)).padStart(2, '0');
    const s = String(segundos % 60).padStart(2, '0');
    return `${h}:${m}:${s}`;
  }

  function iniciarContador() {
    clearInterval(contadorInterval);
    contadorInterval = setInterval(() => {
      contadorSegundos++;
      contadorEl.textContent = formatSegundos(contadorSegundos);
    }, 1000);
  }

  function detenerContador() {
    clearInterval(contadorInterval);
  }

  function iniciarColacion() {
    clearInterval(contadorInterval);
    let segundos = 0;
    contadorEl.textContent = '00:00:00';
    colacionInterval = setInterval(() => {
      segundos++;
      contadorEl.textContent = formatSegundos(segundos);
      if (segundos >= 3600) {
        clearInterval(colacionInterval);
        registrarMarca('⏰ Fin automático de colación');
        estado = 'esperando entrada colación';
      }
    }, 1000);
  }

  function registrarMarca(tipo, extra = '') {
    const hora = clockEl.textContent;
    const fecha = dateEl.textContent;
    const item = document.createElement('li');
    let texto = `${tipo}: ${fecha} - ${hora}`;
    if (extra) texto += ` (${extra})`;
    item.textContent = texto;
    registroEl.appendChild(item);
  }

  btnEntrada.addEventListener('click', () => {
    if (estado === 'inactivo' || estado === 'esperando entrada colación') {
      if (confirm('¿Seguro quieres marcar tu Entrada?')) {
        contadorSegundos = 0;
        iniciarContador();
        estado = 'trabajando';
        registrarMarca('🟢 Entrada');
      }
    }
  });

  btnSalidaColacion.addEventListener('click', () => {
    if (estado === 'trabajando') {
      if (confirm('¿Seguro quieres marcar tu Salida a colación?')) {
        detenerContador();
        const tiempo = formatSegundos(contadorSegundos);
        registrarMarca('🍽️ Salida a colación', `Tiempo trabajado: ${tiempo}`);
        iniciarColacion();
        estado = 'en colación';
      }
    }
  });

  btnEntradaColacion.addEventListener('click', () => {
    if (estado === 'en colación') {
      if (confirm('¿Seguro quieres marcar tu Entrada de colación?')) {
        clearInterval(colacionInterval);
        registrarMarca('🔙 Entrada de colación');
        iniciarContador();
        estado = 'trabajando';
      }
    }
  });

  btnSalidaTurno.addEventListener('click', () => {
    if (estado === 'trabajando') {
      if (confirm('¿Seguro quieres marcar tu Salida del turno?')) {
        detenerContador();
        const tiempo = formatSegundos(contadorSegundos);
        registrarMarca('🔴 Salida del turno', `Tiempo total trabajado: ${tiempo}`);
        estado = 'inactivo';
      }
    }
  });

  setInterval(updateClock, 1000);
  updateClock();
  contadorEl.textContent = '00:00:00';
});
