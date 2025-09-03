# MasturinTimer - Aplicación de Escritorio

## 📋 Descripción
MasturinTimer es un sistema de registro de horarios desarrollado como aplicación de escritorio usando Electron. Permite a los usuarios marcar su asistencia, gestionar horarios y generar reportes.

## 🚀 Ejecución de la Aplicación

### Opción 1: Ejecutar el archivo .exe (Recomendado)
1. Navega a la carpeta `dist/`
2. Ejecuta `MasturinTimer Setup 1.0.0.exe` para instalar la aplicación
3. Una vez instalada, podrás ejecutar MasturinTimer desde el menú de inicio o escritorio

### Opción 2: Ejecutar desde código fuente
```bash
# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm start

# Construir ejecutable
npm run build-win
```

## 📁 Estructura del Proyecto
```
masturin/
├── main.js                    # Punto de entrada de Electron
├── package.json               # Configuración del proyecto
├── FrontEnd/                  # Interfaz de usuario
│   ├── index.html            # Página de login
│   ├── admin.html            # Panel de administración
│   ├── marca.html            # Página de marcado de asistencia
│   ├── JS/                   # Scripts JavaScript
│   └── css/                  # Estilos CSS
├── BackEnd/                   # Servidor Node.js
│   ├── app.js                # Servidor principal
│   ├── db/                   # Configuración de base de datos
│   └── modules/              # Controladores y modelos
└── dist/                      # Archivos de distribución
    ├── MasturinTimer Setup 1.0.0.exe  # Instalador
    └── win-unpacked/         # Aplicación sin empaquetar
```

## ⚙️ Configuración

### Base de Datos
La aplicación requiere una base de datos MySQL. Asegúrate de:
1. Tener MySQL instalado y ejecutándose
2. Configurar las credenciales en `BackEnd/db/db.js`
3. Importar el esquema desde `BackEnd/db/masturin.sql`

### Scripts Disponibles
- `npm start` - Ejecuta la aplicación en modo desarrollo
- `npm run build` - Construye la aplicación para distribución
- `npm run build-win` - Construye específicamente para Windows
- `npm run dev` - Ejecuta en modo desarrollo con herramientas adicionales

## 🔧 Características

### Para Usuarios
- ✅ Marcado de entrada y salida
- 🍽️ Control de horarios de colación
- 📊 Visualización de tiempo trabajado
- 📅 Calendario para revisar marcas anteriores
- 📤 Exportación de registros a CSV
- 🌙 Modo claro/oscuro

### Para Administradores
- 👥 Gestión de usuarios
- 📈 Generación de reportes
- 🔐 Control de acceso por roles

## 🛠️ Tecnologías Utilizadas
- **Electron** - Framework para aplicaciones de escritorio
- **Node.js** - Servidor backend
- **MySQL** - Base de datos
- **HTML/CSS/JavaScript** - Frontend
- **JWT** - Autenticación

## 📝 Notas Importantes

1. **Primer Uso**: Al ejecutar por primera vez, la aplicación iniciará automáticamente el servidor backend en el puerto 3000.

2. **Requisitos del Sistema**:
   - Windows 10 o superior
   - MySQL Server
   - Conexión a internet (solo para la instalación inicial)

3. **Resolución de Problemas**:
   - Si la aplicación no inicia, verifica que MySQL esté ejecutándose
   - Revisa la configuración de la base de datos en `BackEnd/db/db.js`
   - Asegúrate de que el puerto 3000 esté disponible

## 👨‍💻 Desarrollo

Para contribuir al desarrollo:

1. Clona el repositorio
2. Instala las dependencias: `npm install`
3. Configura la base de datos
4. Ejecuta en modo desarrollo: `npm start`

## 📞 Soporte

Para soporte técnico o reportar problemas, contacta al equipo de desarrollo de Masturin LTDA.

---

**Versión**: 1.0.0  
**Desarrollado por**: Masturin LTDA  
**Licencia**: MIT