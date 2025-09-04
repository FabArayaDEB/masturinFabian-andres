# MasturinTimer - Sistema de Control de Asistencia

Sistema web de control de asistencia para empresas, desarrollado con Node.js, MySQL y frontend vanilla JavaScript.

## 📋 Requisitos Previos

- Node.js (versión 14 o superior)
- MySQL Server
- npm (incluido con Node.js)

## 🚀 Instalación y Configuración

### 1. Clonar el Repositorio
```bash
git clone https://github.com/FabArayaDEB/masturinFabian-andres.git
cd masturin
```

### 2. Configurar la Base de Datos

1. Crear una base de datos MySQL llamada `masturin`
2. Importar el esquema de la base de datos:
```bash
mysql -u tu_usuario -p masturin < BackEnd/db/masturin.sql
```

3. Configurar las credenciales de la base de datos en `BackEnd/db/db.js`:
```javascript
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'tu_usuario',
    password: 'tu_contraseña',
    database: 'masturin'
});
```

### 3. Instalar Dependencias del Backend
```bash
cd BackEnd
npm install
```

### 4. Instalar Dependencias del Frontend
```bash
cd ../FrontEnd
npm install
```

## 🏃‍♂️ Ejecutar la Aplicación

### Opción 1: Ejecución Manual (Recomendada)

#### Iniciar el Backend
```bash
cd BackEnd
node app.js
```
El servidor backend estará disponible en: `http://localhost:3000`

#### Iniciar el Frontend
En una nueva terminal:
```bash
cd FrontEnd
npx http-server -p 8080
```
La aplicación web estará disponible en: `http://localhost:8080`

### Opción 2: Usando Scripts npm (si están configurados)
```bash
# Backend
cd BackEnd
npm start

# Frontend
cd FrontEnd
npm start
```

## 👤 Crear Usuario Administrador

### Script Automático para Crear Administrador

Crea un archivo temporal `create_admin.js` en la raíz del proyecto:

```javascript
const mysql = require('mysql2');
const bcrypt = require('bcrypt');

// Configuración de la base de datos
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Cambia por tu usuario
    password: '', // Cambia por tu contraseña
    database: 'masturin'
});

async function createAdmin() {
    try {
        // Conectar a la base de datos
        connection.connect();
        console.log('Conectado a la base de datos');
        
        // Datos del administrador
        const adminData = {
            rut: 'admin123',
            nombre: 'Administrador',
            apellido: 'Sistema',
            correo: 'admin@masturin.com',
            contraseña: 'admin123',
            rol: 'admin'
        };
        
        // Encriptar contraseña
        const hashedPassword = await bcrypt.hash(adminData.contraseña, 10);
        
        // Insertar administrador
        const query = `
            INSERT INTO usuarios (rut, nombre, apellido, correo, contraseña, rol) 
            VALUES (?, ?, ?, ?, ?, ?)
            ON DUPLICATE KEY UPDATE 
            nombre = VALUES(nombre),
            apellido = VALUES(apellido),
            correo = VALUES(correo),
            contraseña = VALUES(contraseña),
            rol = VALUES(rol)
        `;
        
        connection.query(query, [
            adminData.rut,
            adminData.nombre,
            adminData.apellido,
            adminData.correo,
            hashedPassword,
            adminData.rol
        ], (error, results) => {
            if (error) {
                console.error('Error al crear administrador:', error);
            } else {
                console.log('✅ Administrador creado exitosamente');
                console.log('📧 Email: admin@masturin.com');
                console.log('🔑 Contraseña: admin123');
            }
            connection.end();
        });
        
    } catch (error) {
        console.error('Error:', error);
        connection.end();
    }
}

createAdmin();
```

### Ejecutar el Script
```bash
node create_admin.js
```

### Credenciales del Administrador
- **Email**: `admin@masturin.com`
- **Contraseña**: `admin123`

## 🌐 Acceso a la Aplicación

1. Asegúrate de que tanto el backend como el frontend estén ejecutándose
2. Abre tu navegador web
3. Navega a: `http://localhost:8080`
4. Inicia sesión con las credenciales del administrador

## 📱 Funcionalidades

- **Panel de Administración**: Gestión de usuarios y configuración del sistema
- **Control de Asistencia**: Registro de entrada y salida de trabajadores
- **Reportes**: Generación de reportes de asistencia
- **Gestión de Usuarios**: Crear, editar y eliminar trabajadores
- **Autenticación**: Sistema de login seguro con roles

## 🛠️ Estructura del Proyecto

```
masturin/
├── BackEnd/                 # Servidor Node.js
│   ├── app.js              # Archivo principal del servidor
│   ├── db/                 # Configuración de base de datos
│   ├── modules/            # Controladores, modelos y rutas
│   └── package.json        # Dependencias del backend
├── FrontEnd/               # Aplicación web
│   ├── index.html          # Página principal
│   ├── admin.html          # Panel de administración
│   ├── JS/                 # Scripts JavaScript
│   ├── css/                # Estilos CSS
│   └── package.json        # Dependencias del frontend
└── README.md               # Este archivo
```

## 🔧 Solución de Problemas

### Error de Conexión a la Base de Datos
- Verifica que MySQL esté ejecutándose
- Confirma las credenciales en `BackEnd/db/db.js`
- Asegúrate de que la base de datos `masturin` exista

### Puerto en Uso
- Si el puerto 3000 o 8080 están ocupados, cambia los puertos en los comandos de inicio
- Backend: modifica `app.js` para cambiar el puerto
- Frontend: usa `npx http-server -p NUEVO_PUERTO`

### Problemas de Autenticación
- Verifica que el administrador haya sido creado correctamente
- Revisa la consola del navegador para errores JavaScript
- Confirma que el backend esté respondiendo en `http://localhost:3000`

## 📞 Soporte

Para reportar problemas o solicitar nuevas funcionalidades, por favor crea un issue en el repositorio de GitHub.

---

**Desarrollado por**: Fabián Araya  
**Versión**: 1.0.0  
**Licencia**: MIT