document.addEventListener('DOMContentLoaded', () => {
  // Elementos principales
  const clockEl     = document.getElementById('clock');
  const dateEl      = document.getElementById('date');
  const contadorEl  = document.getElementById('contador');
  const totalEl     = document.getElementById('total');
  const registroEl  = document.getElementById('registro');

  // Botones
  const btnEntrada         = document.getElementById('btn-entrada');
  const btnSalidaColacion  = document.getElementById('btn-salida-colacion');
  const btnEntradaColacion = document.getElementById('btn-entrada-colacion');
  const btnSalidaFinal     = document.getElementById('btn-salida-final');
  const btnExportar        = document.getElementById('btn-exportar');
  const btnLogout          = document.getElementById('btn-logout');
  const toggleMenuBtn      = document.getElementById('toggle-menu');
  const closeMenuBtn       = document.getElementById('close-menu');
  const calendarInput      = document.getElementById('calendar');
  const marcasDiaEl        = document.getElementById('marcas-dia');

  // Modal de confirmación
  const modalConfirm       = document.getElementById('modal-confirmacion');
  const btnConfirmar       = document.getElementById('btn-confirmar');
  const btnCancelar        = document.getElementById('btn-cancelar');
  let accionPendiente      = null;

  // Modal de configuración
  const configBtn          = document.getElementById('btn-config');
  const configModal        = document.getElementById('modal-config');
  const cerrarConfig       = document.getElementById('cerrar-config');
  const tabBtns            = document.querySelectorAll('.tab-btn');
  const tabContents        = document.querySelectorAll('.tab-content');

  // Estado
  let contadorInterval;
  let contadorSegundos = 0;
  let totalSegundos    = 0;
  let estado           = 'inactivo';
  let historialPorFecha = JSON.parse(localStorage.getItem('historialPorFecha')) || {};

  // Reloj en tiempo real
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
      totalSegundos++;
      contadorEl.textContent = formatSegundos(contadorSegundos);
      totalEl.textContent = formatSegundos(totalSegundos);
    }, 1000);
  }

  function detenerContador() {
    clearInterval(contadorInterval);
  }

  function registrarMarca(tipo, extra = '') {
    const hora = clockEl.textContent;
    const fechaCompleta = dateEl.textContent;
    const fechaISO = new Date().toLocaleDateString('sv-SE');

    const texto = `${tipo}: ${fechaCompleta} - ${hora}${extra ? ` (${extra})` : ''}`;

    if (!historialPorFecha[fechaISO]) historialPorFecha[fechaISO] = [];
    historialPorFecha[fechaISO].push(texto);
    localStorage.setItem('historialPorFecha', JSON.stringify(historialPorFecha));
    registroEl.innerHTML = '';
  }

  function mostrarMarcasPorFecha(fechaStr) {
    marcasDiaEl.innerHTML = `<strong>Marcas del ${fechaStr}:</strong>`;
    const marcas = historialPorFecha[fechaStr];
    if (marcas?.length) {
      const ul = document.createElement('ul');
      marcas.forEach(txt => {
        const li = document.createElement('li');
        li.className = 'marca-item';
        li.textContent = txt;
        ul.appendChild(li);
      });
      marcasDiaEl.appendChild(ul);
    } else {
      marcasDiaEl.innerHTML += `<ul><li>No hay marcas registradas.</li></ul>`;
    }
  }

  function exportarCSV() {
    let csv = 'Marca,Fecha y Hora\n';
    for (const fecha in historialPorFecha) {
      historialPorFecha[fecha].forEach(linea => {
        csv += `"${linea}"\n`;
      });
    }
    const blob = new Blob([csv], { type: 'text/csv' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href     = url;
    a.download = 'registro_marcas.csv';
    a.click();
    URL.revokeObjectURL(url);
  }

  // Modal de confirmación
  function mostrarModal(accion) {
    accionPendiente = accion;
    modalConfirm.classList.add('active');
  }

  function cerrarModal() {
    modalConfirm.classList.remove('active');
    accionPendiente = null;
  }

  btnCancelar.addEventListener('click', cerrarModal);
  btnConfirmar.addEventListener('click', () => {
    if (accionPendiente) accionPendiente();
    cerrarModal();
  });

  // Acciones con confirmación
  btnEntrada.addEventListener('click', () => {
    mostrarModal(() => {
      contadorSegundos = 0;
      totalSegundos = 0;
      iniciarContador();
      estado = 'trabajando';
      registrarMarca('🟢 Entrada / Inicio de turno');
    });
  });

  btnSalidaColacion.addEventListener('click', () => {
    mostrarModal(() => {
      detenerContador();
      contadorSegundos = 0;
      contadorEl.textContent = '00:00:00';
      estado = 'en colacion';
      registrarMarca('🍽️ Salida a colación');
    });
  });

  btnEntradaColacion.addEventListener('click', () => {
    mostrarModal(() => {
      contadorSegundos = 0;
      iniciarContador();
      estado = 'trabajando';
      registrarMarca('🔙 Entrada / Reingreso de colación');
    });
  });

  btnSalidaFinal.addEventListener('click', () => {
    mostrarModal(() => {
      detenerContador();
      const tiempo = formatSegundos(totalSegundos);
      registrarMarca('🔴 Salida / Fin de turno', `Total trabajado: ${tiempo}`);
      estado = 'inactivo';
      contadorSegundos = 0;
      contadorEl.textContent = '00:00:00';
      setTimeout(() => {
        totalSegundos = 0;
        totalEl.textContent = '00:00:00';
      }, 120000);
    });
  });

  btnExportar.addEventListener('click', exportarCSV);

  // Calendario
  toggleMenuBtn.addEventListener('click', () => {
    document.getElementById('side-menu').classList.toggle('active');
  });

  closeMenuBtn.addEventListener('click', () => {
    document.getElementById('side-menu').classList.remove('active');
  });

  flatpickr(calendarInput, {
    dateFormat: "Y-m-d",
    onChange: function(selectedDates, dateStr) {
      mostrarMarcasPorFecha(dateStr);
    }
  });

  // Modal de configuración
  configBtn.addEventListener('click', () => {
    configModal.classList.add('active');
  });

  cerrarConfig.addEventListener('click', () => {
    configModal.classList.remove('active');
  });

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.getAttribute('data-tab');
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      tabContents.forEach(content => {
        content.classList.remove('active');
        if (content.id === 'tab-' + target) {
          content.classList.add('active');
          if (target === 'creditos') {
            content.innerHTML = '<p>Creado por el hermoso equipo de Masturin LTDA</p>';
          }
        }
      });
    });
  });

    // Cambio de tema
  document.getElementById('modo-claro').addEventListener('click', () => {
    document.documentElement.style.setProperty('--bg', '#f5f5f5');
    document.documentElement.style.setProperty('--card', '#ffffff');
    document.documentElement.style.setProperty('--text', '#222');
    document.documentElement.style.setProperty('--muted', '#666');
  });

  document.getElementById('modo-oscuro').addEventListener('click', () => {
    document.documentElement.style.setProperty('--bg', '#1e1f26');
    document.documentElement.style.setProperty('--card', '#2c2f36');
    document.documentElement.style.setProperty('--text', '#e0e0e0');
    document.documentElement.style.setProperty('--muted', '#888');
  });

  // Saludo dinámico
  function obtenerSaludo() {
    const hora = new Date().getHours();
    if (hora >= 5 && hora < 12) return '¡Buenos días!';
    if (hora >= 12 && hora < 18) return '¡Buenas tardes!';
    return '¡Buenas noches!';
  }

  const frases = [
    'Tu tiempo vale oro. ¡Haz que cada segundo cuente!',
    'Trabajar con pasión es construir con propósito.',
    'Gracias por tu compromiso. Hoy será un gran día.',
    'La constancia supera al talento cuando el talento no trabaja.',
    'Cada jornada es una oportunidad para crecer.',
    'Lo que haces hoy construye tu mañana.',
    'La actitud marca la diferencia. ¡Vamos con todo!',
    'El esfuerzo de hoy será el orgullo de mañana.'
  ];

  function mostrarBienvenida() {
    const saludoEl = document.getElementById('saludo');
    const fraseEl = document.getElementById('frase-motivadora');

    saludoEl.textContent = obtenerSaludo();
    const fraseAleatoria = frases[Math.floor(Math.random() * frases.length)];
    fraseEl.textContent = fraseAleatoria;
  }

  // Animación de bienvenida
  const overlay = document.getElementById('bienvenida-overlay');
  if (overlay) {
    setTimeout(() => {
      overlay.style.opacity = '0';
      overlay.style.visibility = 'hidden';
    }, 2000);
  }

  // Cierre de sesión con despedida
  btnLogout.addEventListener('click', () => {
    const nombreUsuario = localStorage.getItem('userEmail') || 'usuario';
    const confirmar = window.confirm(`¿Estás seguro que quieres salir, ${nombreUsuario}?`);
    if (confirmar) {
      const despedida = document.getElementById('despedida-overlay');
      if (despedida) {
        despedida.classList.add('active');
        setTimeout(() => {
          localStorage.clear();
          window.location.href = 'index.html';
        }, 2500);
      } else {
        localStorage.clear();
        window.location.href = 'index.html';
      }
    }
  });

  // Inicialización
  setInterval(updateClock, 1000);
  updateClock();
  contadorEl.textContent = '00:00:00';
  totalEl.textContent = '00:00:00';
  mostrarBienvenida();
});
