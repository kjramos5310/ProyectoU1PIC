
-- Tabla para Máquinas
CREATE TABLE Maquinas (
    id_maquina INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    capacidad DECIMAL(10, 2) NOT NULL
);

-- Tabla para Proyectos
CREATE TABLE Proyectos (
    id_proyecto INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    fecha_inicio DATE NOT NULL,
    fecha_fin DATE NOT NULL
);

-- Tabla intermedia para la relación
CREATE TABLE AsignacionesMaquinas (
    id_maquina INT NOT NULL,
    id_proyecto INT NOT NULL,
    PRIMARY KEY (id_maquina, id_proyecto),
    FOREIGN KEY (id_maquina) REFERENCES Maquinas(id_maquina) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (id_proyecto) REFERENCES Proyectos(id_proyecto) ON DELETE CASCADE ON UPDATE CASCADE
);

-- Insertar registros en la tabla Maquinas
INSERT INTO Maquinas (nombre, capacidad) VALUES
('Máquina 1', 150.00),
('Máquina 2', 200.50),
('Máquina 3', 175.75),
('Máquina 4', 220.00),
('Máquina 5', 250.25),
('Máquina 6', 180.00),
('Máquina 7', 300.00),
('Máquina 8', 120.00),
('Máquina 9', 350.50),
('Máquina 10', 400.00);

-- Insertar registros en la tabla Proyectos
INSERT INTO Proyectos (nombre, fecha_inicio, fecha_fin) VALUES
('Proyecto Alpha', '2024-01-01', '2024-06-30'),
('Proyecto Beta', '2024-07-01', '2024-12-31'),
('Proyecto Gamma', '2024-03-15', '2024-09-15'),
('Proyecto Delta', '2024-05-01', '2024-10-31'),
('Proyecto Epsilon', '2024-06-01', '2024-11-30'),
('Proyecto Zeta', '2024-04-01', '2024-08-31'),
('Proyecto Eta', '2024-07-15', '2024-12-15'),
('Proyecto Theta', '2024-02-01', '2024-07-31'),
('Proyecto Iota', '2024-09-01', '2024-12-31'),
('Proyecto Kappa', '2024-08-01', '2025-01-31');

-- Insertar registros en la tabla AsignacionesMaquinas
INSERT INTO AsignacionesMaquinas (id_maquina, id_proyecto) VALUES
(1, 1),
(2, 1),
(3, 2),
(4, 2),
(5, 3),
(6, 4),
(7, 5),
(8, 6),
(9, 7),
(10, 8),
(1, 9),
(2, 10),
(3, 3),
(4, 4),
(5, 5),
(6, 6),
(7, 7),
(8, 8),
(9, 9),
(10, 10);
