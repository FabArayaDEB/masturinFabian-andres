CREATE TABLE IF NOT EXISTS usuarios(
                rut VARCHAR(50) PRIMARY KEY,
                correo VARCHAR(50) NOT NULL UNIQUE,
                contraseña VARCHAR(255) NOT NULL,
                rol VARCHAR(10) NOT NULL 
        )
        
CREATE TABLE asistencias (
                id INT PRIMARY KEY AUTO_INCREMENT,
                rut VARCHAR(50) NOT NULL,
                fecha DATE NOT NULL,
                hora_entrada TIME,
                hora_salida TIME,
                FOREIGN KEY (rut) REFERENCES usuarios(rut)
                UNIQUE(rut, fecha)
);

CREATE TABLE reportes(
                id INT PRIMARY KEY AUTO_INCREMENT,
                rut VARCHAR(50) NOT NULL,
                tipo ENUM('asistencia', 'atrasos', 'salidas anticipadas')  NOT NULL,
                fecha_inicio DATE NOT NULL,
                fecha_fin DATE NOT NULL,
                fecha_emision TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                pdf VARCHAR(255),
      
                FOREIGN KEY (rut) REFERENCES usuarios(rut)
);

CREATE TABLE contratos(
                id INT PRIMARY KEY AUTO_INCREMENT,
                rut VARCHAR(50) NOT NULL,
                fecha_inicio DATE NOT NULL,
                fecha_fin DATE,
                cargo VARCHAR(50) NOT NULL,
                sueldo DECIMAL(10,2) NOT NULL,
                tipo_contrato ENUM('plazo fijo', 'indefinido', 'honorarios', 'práctica') NOT NULL,
                hora_entrada TIME,
                hora_salida TIME,
                estado ENUM('activo', 'finalizado') DEFAULT 'activo',
                FOREIGN KEY (rut) REFERENCES usuarios(rut),

                UNIQUE KEY unico_activo (rut, estado)
);