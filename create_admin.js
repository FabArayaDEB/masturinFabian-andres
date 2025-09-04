const mysql = require('mysql2');
const bcrypt = require('bcrypt');

// Configuración de la base de datos
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Cambia por tu usuario de MySQL
    password: '', // Cambia por tu contraseña de MySQL
    database: 'masturin'
});

async function createAdmin() {
    try {
        // Conectar a la base de datos
        connection.connect();
        console.log('🔗 Conectado a la base de datos MySQL');
        
        // Datos del administrador
        const adminData = {
            rut: 'admin123',
            nombre: 'Administrador',
            apellido: 'Sistema',
            correo: 'admin@masturin.com',
            contraseña: 'admin123',
            rol: 'admin'
        };
        
        console.log('🔐 Encriptando contraseña...');
        // Encriptar contraseña
        const hashedPassword = await bcrypt.hash(adminData.contraseña, 10);
        
        console.log('👤 Creando usuario administrador...');
        // Insertar administrador (o actualizar si ya existe)
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
                console.error('❌ Error al crear administrador:', error.message);
                if (error.code === 'ER_NO_SUCH_TABLE') {
                    console.log('💡 Asegúrate de que la base de datos "masturin" exista y tenga las tablas correctas.');
                    console.log('💡 Ejecuta: mysql -u tu_usuario -p masturin < BackEnd/db/masturin.sql');
                }
            } else {
                console.log('\n✅ ¡Administrador creado exitosamente!');
                console.log('═══════════════════════════════════════');
                console.log('📧 Email: admin@masturin.com');
                console.log('🔑 Contraseña: admin123');
                console.log('👑 Rol: Administrador');
                console.log('═══════════════════════════════════════');
                console.log('\n🌐 Ahora puedes iniciar sesión en: http://localhost:8080');
            }
            connection.end();
        });
        
    } catch (error) {
        console.error('❌ Error general:', error.message);
        if (error.code === 'ECONNREFUSED') {
            console.log('💡 No se pudo conectar a MySQL. Verifica que:');
            console.log('   - MySQL esté ejecutándose');
            console.log('   - Las credenciales sean correctas');
            console.log('   - La base de datos "masturin" exista');
        }
        connection.end();
    }
}

console.log('🚀 Iniciando creación de administrador para MasturinTimer...');
console.log('⚠️  Asegúrate de haber configurado las credenciales de MySQL en este archivo\n');

createAdmin();