const { app, BrowserWindow, Menu, ipcMain } = require('electron');
const path = require('path');
const { spawn } = require('child_process');

let mainWindow;
let backendProcess;

// Función para crear la ventana principal
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
      webSecurity: true
    },
    icon: path.join(__dirname, 'FrontEnd/images/logo-masturintimer.png'),
    title: 'MasturinTimer - Sistema de Registro de Horarios',
    show: false
  });

  // Cargar la aplicación
  mainWindow.loadFile('FrontEnd/index.html');

  // Mostrar ventana cuando esté lista
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  // Manejar el cierre de la ventana
  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  // Configurar menú
  createMenu();
}

// Función para crear el menú de la aplicación
function createMenu() {
  const template = [
    {
      label: 'Archivo',
      submenu: [
        {
          label: 'Recargar',
          accelerator: 'CmdOrCtrl+R',
          click: () => {
            if (mainWindow) {
              mainWindow.reload();
            }
          }
        },
        {
          label: 'Herramientas de Desarrollador',
          accelerator: 'F12',
          click: () => {
            if (mainWindow) {
              mainWindow.webContents.toggleDevTools();
            }
          }
        },
        { type: 'separator' },
        {
          label: 'Salir',
          accelerator: process.platform === 'darwin' ? 'Cmd+Q' : 'Ctrl+Q',
          click: () => {
            app.quit();
          }
        }
      ]
    },
    {
      label: 'Ver',
      submenu: [
        {
          label: 'Pantalla Completa',
          accelerator: 'F11',
          click: () => {
            if (mainWindow) {
              mainWindow.setFullScreen(!mainWindow.isFullScreen());
            }
          }
        },
        {
          label: 'Minimizar',
          accelerator: 'CmdOrCtrl+M',
          click: () => {
            if (mainWindow) {
              mainWindow.minimize();
            }
          }
        }
      ]
    },
    {
      label: 'Ayuda',
      submenu: [
        {
          label: 'Acerca de MasturinTimer',
          click: () => {
            const { dialog } = require('electron');
            dialog.showMessageBox(mainWindow, {
              type: 'info',
              title: 'Acerca de MasturinTimer',
              message: 'MasturinTimer v1.0.0',
              detail: 'Sistema de registro de horarios desarrollado por Masturin LTDA'
            });
          }
        }
      ]
    }
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}

// Función para iniciar el servidor backend
function startBackend() {
  const backendPath = path.join(__dirname, 'BackEnd');
  
  backendProcess = spawn('node', ['app.js'], {
    cwd: backendPath,
    stdio: 'inherit'
  });

  backendProcess.on('error', (err) => {
    console.error('Error al iniciar el backend:', err);
  });

  backendProcess.on('close', (code) => {
    console.log(`Proceso backend terminado con código ${code}`);
  });
}

// Función para detener el servidor backend
function stopBackend() {
  if (backendProcess) {
    backendProcess.kill();
    backendProcess = null;
  }
}

// Eventos de la aplicación
app.whenReady().then(() => {
  // Iniciar el backend
  startBackend();
  
  // Esperar un momento para que el backend se inicie
  setTimeout(() => {
    createWindow();
  }, 2000);

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  stopBackend();
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('before-quit', () => {
  stopBackend();
});

// Manejar errores no capturados
process.on('uncaughtException', (error) => {
  console.error('Error no capturado:', error);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Promesa rechazada no manejada:', reason);
});