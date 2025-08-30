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
                hora_salida_colacion TIME, /*hora en que el usuario comienza su colacion*/
                hora_entrada_colacion TIME, /*hora en que el usuario termina su hora de almuerzo*/
                FOREIGN KEY (rut) REFERENCES usuarios(rut)
                UNIQUE(rut, fecha)
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
                hora_salida_colacion TIME, /*hora en que el usuario comienza su colacion*/
                hora_entrada_colacion TIME, /*hora en que el usuario termina su hora de almuerzo*/
                estado ENUM('activo', 'finalizado') DEFAULT 'activo',
                FOREIGN KEY (rut) REFERENCES usuarios(rut),

                UNIQUE KEY unico_activo (rut, estado)
);