const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database : 'masturin'
});

db.connect((err) => {
    if(err){
        console.error('Error de conexion:', err);
        return;
    }
    console.log('Conectado a la base de datos MySql');
    initDB();
});

const initDB = () => {
    db.query(`CREATE TABLE IF NOT EXISTS usuarios (
        rut VARCHAR(50) PRIMARY KEY,
        correo VARCHAR(50) NOT NULL UNIQUE,
        contraseña VARCHAR(255) NOT NULL,
        rol VARCHAR(10) NOT NULL
    );`, (err) => {
        if (err) console.error('Error creando tabla usuarios:', err);
    });

    db.query(`CREATE TABLE IF NOT EXISTS asistencias (
        id INT PRIMARY KEY AUTO_INCREMENT,
        rut VARCHAR(50) NOT NULL,
        fecha DATE NOT NULL,
        hora_entrada TIMESTAMP,
        hora_salida TIMESTAMP,
        FOREIGN KEY (rut) REFERENCES usuarios(rut),
        UNIQUE(rut, fecha)
    );`, (err) => {
        if (err) console.error('Error creando tabla asistencias:', err);
    });

    db.query(`CREATE TABLE IF NOT EXISTS contratos (
        id INT PRIMARY KEY AUTO_INCREMENT,
        rut VARCHAR(50) NOT NULL,
        fecha_inicio DATE NOT NULL,
        fecha_fin DATE,
        cargo VARCHAR(50) NOT NULL,
        sueldo DECIMAL(10,2) NOT NULL,
        tipo_contrato ENUM('plazo fijo', 'indefinido', 'honorarios', 'práctica') NOT NULL,
        estado ENUM('activo', 'finalizado') DEFAULT 'activo',
        FOREIGN KEY (rut) REFERENCES usuarios(rut),
        UNIQUE KEY unico_activo (rut, estado)
    );`, (err) => {
        if (err) console.error('Error creando tabla contratos:', err);
    });
};
module.exports = db;