// import express from 'express';
// import bodyParser from 'body-parser';
// import mysql from 'mysql2';
// import cors from 'cors';
import express from 'express';
// cambiar texto json a texto plano
import bodyParser from 'body-parser';
import mysql from 'mysql2';
import cors from 'cors';
// para consumir api


const app = express();
const port = 8000;

app.use(cors());
app.use(bodyParser.json());

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    port: 3306,
    database: 'bd_api_proyecto'
});

db.connect((error) => {
    if (error) {
        console.log("Error al conectar a MySQL: " + error);
    } else {
        console.log("MySQL Conectada");
    }
});

app.get("/", (req, res) => {
    res.send("Bienvenidos a la API de Máquinas y Proyectos");
});

app.get("/maquinas", (req, res) => {
    const query = "SELECT * FROM maquinas";
    db.query(query, (error, result) => {
        if (error) {
            res.status(500).send("Error al obtener las máquinas");
            return;
        }
        res.status(200).json(result);
    });
});

app.post("/maquinas", (req, res) => {
    const { nombre, capacidad } = req.body;
    const query = `INSERT INTO maquinas (nombre, capacidad) VALUES (?, ?)`;

    db.query(query, [nombre, capacidad], (error, result) => {
        if (error) {
            res.status(500).send("Error al insertar la máquina");
            return;
        }
        res.status(201).send("Máquina insertada correctamente");
    });
});

app.delete("/maquinas/:id", (req, res) => {
    const { id } = req.params;
    const query = `DELETE FROM maquinas WHERE id_maquina = ?`;

    db.query(query, [id], (error, result) => {
        if (error) {
            res.status(500).send("Error al eliminar la máquina");
            return;
        }
        if (result.affectedRows === 0) {
            res.status(404).send("No existe la máquina que desea eliminar");
            return;
        }
        res.status(200).send("Máquina eliminada correctamente");
    });
});

app.put("/maquinas/:id", (req, res) => {
    const { id } = req.params;
    const { nombre, capacidad } = req.body;
    const query = `UPDATE maquinas SET nombre = ?, capacidad = ? WHERE id_maquina = ?`;

    db.query(query, [nombre, capacidad, id], (error, result) => {
        if (error) {
            res.status(500).send("Error al actualizar la máquina");
            return;
        }
        if (result.affectedRows === 0) {
            res.status(404).send("No existe la máquina que desea actualizar");
            return;
        }
        res.status(200).send("Máquina actualizada correctamente");
    });
});

app.get("/proyectos", (req, res) => {
    const query = "SELECT * FROM proyectos";
    db.query(query, (error, result) => {
        if (error) {
            res.status(500).send("Error al obtener los proyectos");
            return;
        }
        res.status(200).json(result);
    });
});

app.post("/proyectos", (req, res) => {
    const { nombre, fecha_inicio, fecha_fin } = req.body;
    const query = `INSERT INTO proyectos (nombre, fecha_inicio, fecha_fin) VALUES (?, ?, ?)`;

    db.query(query, [nombre, fecha_inicio, fecha_fin], (error, result) => {
        if (error) {
            res.status(500).send("Error al insertar el proyecto");
            return;
        }
        res.status(201).send("Proyecto insertado correctamente");
    });
});

app.delete("/proyectos/:id", (req, res) => {
    const { id } = req.params;
    const query = `DELETE FROM proyectos WHERE id_proyecto = ?`;

    db.query(query, [id], (error, result) => {
        if (error) {
            res.status(500).send("Error al eliminar el proyecto");
            return;
        }
        if (result.affectedRows === 0) {
            res.status(404).send("No existe el proyecto que desea eliminar");
            return;
        }
        res.status(200).send("Proyecto eliminado correctamente");
    });
});

app.put("/proyectos/:id", (req, res) => {
    const { id } = req.params;
    const { nombre, fecha_inicio, fecha_fin } = req.body;
    const query = `UPDATE proyectos SET nombre = ?, fecha_inicio = ?, fecha_fin = ? WHERE id_proyecto = ?`;

    db.query(query, [nombre, fecha_inicio, fecha_fin, id], (error, result) => {
        if (error) {
            res.status(500).send("Error al actualizar el proyecto");
            return;
        }
        if (result.affectedRows === 0) {
            res.status(404).send("No existe el proyecto que desea actualizar");
            return;
        }
        res.status(200).send("Proyecto actualizado correctamente");
    });
});

// Obtener todas las asignaciones
// app.get("/asignaciones", (req, res) => {
//     const query = `SELECT * FROM AsignacionesMaquinas`;

//     db.query(query, (error, result) => {
//         if (error) {
//             res.status(500).send("Error al obtener las asignaciones");
//             return;
//         }
//         res.status(200).json(result);
//     });
// });
app.get('/asignaciones', (req, res) => {
    const query = `
        SELECT 
            AsignacionesMaquinas.id_maquina, 
            Maquinas.nombre AS nombre_maquina,
            AsignacionesMaquinas.id_proyecto, 
            Proyectos.nombre AS nombre_proyecto
        FROM AsignacionesMaquinas
        INNER JOIN Maquinas ON AsignacionesMaquinas.id_maquina = Maquinas.id_maquina
        INNER JOIN Proyectos ON AsignacionesMaquinas.id_proyecto = Proyectos.id_proyecto
    `;
    
    db.query(query, (error, result) => {
        if (error) {
            res.status(500).send("Error al obtener las asignaciones");
            return;
        }
        res.status(200).json(result);
    });
});


// Insertar una nueva asignación
app.post("/asignaciones", (req, res) => {
    const { id_maquina, id_proyecto } = req.body;

    // Validar que los datos existan
    if (!id_maquina || !id_proyecto) {
        res.status(400).send("Faltan datos para la asignación");
        return;
    }

    const query = `INSERT INTO AsignacionesMaquinas (id_maquina, id_proyecto) VALUES (?, ?)`;

    db.query(query, [id_maquina, id_proyecto], (error, result) => {
        if (error) {
            res.status(500).send("Error al insertar la asignación");
            return;
        }
        res.status(201).send("Asignación creada correctamente");
    });
});

// Eliminar una asignación específica
app.delete("/asignaciones/:id_maquina/:id_proyecto", (req, res) => {
    const { id_maquina, id_proyecto } = req.params;

    const query = `DELETE FROM AsignacionesMaquinas WHERE id_maquina = ? AND id_proyecto = ?`;

    db.query(query, [id_maquina, id_proyecto], (error, result) => {
        if (error) {
            res.status(500).send("Error al eliminar la asignación");
            return;
        }
        if (result.affectedRows === 0) {
            res.status(404).send("No existe la asignación que desea eliminar");
            return;
        }
        res.status(200).send("Asignación eliminada correctamente");
    });
});

// Obtener asignaciones específicas por máquina o proyecto
app.get("/asignaciones/:filter/:id", (req, res) => {
    const { filter, id } = req.params;

    let query;
    if (filter === "maquina") {
        query = `SELECT * FROM AsignacionesMaquinas WHERE id_maquina = ?`;
    } else if (filter === "proyecto") {
        query = `SELECT * FROM AsignacionesMaquinas WHERE id_proyecto = ?`;
    } else {
        res.status(400).send("Filtro inválido (use 'maquina' o 'proyecto')");
        return;
    }

    db.query(query, [id], (error, result) => {
        if (error) {
            res.status(500).send("Error al obtener las asignaciones");
            return;
        }
        res.status(200).json(result);
    });
});

