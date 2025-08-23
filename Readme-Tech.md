
## Funcionalidades Principales

### Control de Asistencia
- Registro de entrada y salida de empleados
- Interfaz intuitiva con botones de marcado
- Almacenamiento automático de fecha y hora

### Reportes Administrativos
- **Reporte de Atrasos**: Empleados que llegan después de las 9:30 AM
- **Reporte de Salidas Anticipadas**: Empleados que salen antes de las 17:30 PM
- **Reporte de Inasistencias**: Empleados que no registraron entrada ni salida

### Gestión de Usuarios
- Crear nuevos usuarios en el sistema
- Modificar información de usuarios existentes
- Eliminar usuarios del sistema
- Control de privilegios administrativos

## Requisitos del Sistema

### Backend
- Node.js v14.0 o superior
- MySQL 8.0 o superior
- npm o yarn para gestión de paquetes

### Frontend
- Electron v13.0 o superior
- Navegadores modernos compatibles con HTML5/CSS3

## Instalación y Configuración

### 1. Clonar el Repositorio
```bash
git clone [URL_DEL_REPOSITORIO]
cd masturin
```

### 2. Configurar Backend
```bash
cd BackEnd
npm install
```

### 3. Configurar Base de Datos
- Instalar MySQL
- Crear base de datos para el proyecto
- Configurar credenciales en archivo de configuración

### 4. Configurar Frontend
```bash
cd ../FrontEnd
npm install
```

### 5. Ejecutar la Aplicación

#### Backend (Terminal 1)
```bash
cd BackEnd
npm start
```

#### Frontend (Terminal 2)
```bash
cd FrontEnd
npm run electron
```

## Variables de Entorno

Crear archivo `.env` en el directorio BackEnd:
```env
DB_HOST=localhost
DB_USER=tu_usuario
DB_PASSWORD=tu_contraseña
DB_NAME=masturin_db
PORT=3000
```

## API Endpoints

### Autenticación
- `POST /api/login` - Iniciar sesión
- `POST /api/logout` - Cerrar sesión

### Asistencia
- `POST /api/attendance/checkin` - Marcar entrada
- `POST /api/attendance/checkout` - Marcar salida
- `GET /api/attendance/reports` - Obtener reportes

### Usuarios
- `GET /api/users` - Listar usuarios
- `POST /api/users` - Crear usuario
- `PUT /api/users/:id` - Actualizar usuario
- `DELETE /api/users/:id` - Eliminar usuario

## Desarrollo

### Comandos Útiles
```bash
# Instalar dependencias
npm install

# Modo desarrollo backend
npm run dev

# Modo desarrollo frontend
npm run electron-dev

# Construir aplicación
npm run build

# Ejecutar tests
npm test
```

## Contribución
Este proyecto es parte de la evaluación de Integración de Competencias II.

## Información del Proyecto
- **Autor**: GG
- **Fecha de Creación**: 01-01-2024
- **Última Actualización**: 02-01-2024
- **Estado**: En desarrollo - Etapa I

## Licencia
[Por definir]