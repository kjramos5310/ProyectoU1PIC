class ProyList extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        // Contenedor principal
        this.container = document.createElement('div');

        // Estilo del componente
        this.estilo = document.createElement('style');
        this.estilo.textContent = `
            table {
                width: 100%;
                border-collapse: collapse;
                margin: 20px 0;
                font-size: 16px;
                text-align: left;
            }
            th, td {
                padding: 10px;
                border: 1px solid #ccc;
            }
            th {
                background-color: #f4f4f4;
            }
            .actions button {
                margin: 0 5px;
                padding: 5px 10px;
                border: none;
                border-radius: 5px;
                cursor: pointer;
            }
            .btn-update {
                background-color: #4caf50;
                color: white;
            }
            .btn-delete {
                background-color: #f44336;
                color: white;
            }
            .error-alert {
                color: red;
                font-weight: bold;
            }
            .empty-alert {
                color: gray;
                font-style: italic;
            }
        `;

        this.shadowRoot.appendChild(this.estilo);
        this.shadowRoot.appendChild(this.container);
    }

    connectedCallback() {
        const endPoint = this.getAttribute('api-endpoint');
        if (endPoint) {
            this.fetchData(endPoint);
        } else {
            console.error('El atributo "api-endpoint" no está definido.');
        }
    }

    async fetchData(url) {
        try {
            const response = await fetch(url);
            const data = await response.json();
            const machines = data || [];
            this.render(machines);
        } catch (error) {
            console.error('Error al conectar con la API', error);
            this.container.innerHTML = `<p class="error-alert">Error al cargar los datos</p>`;
        }
    }

    render(machines) {
        if (machines.length === 0) {
            this.container.innerHTML = `<p class="empty-alert">No hay máquinas disponibles</p>`;
            return;
        }

        // Generamos la tabla con encabezados
        let tableHTML = `
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>fecha Inicio</th>
                        <th>Fecha Final</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
        `;

        machines.forEach(machine => {
            tableHTML += `
                <tr>
                    <td>${machine.id_proyecto}</td>
                    <td>${machine.nombre}</td>
                    <td>${machine.fecha_inicio}</td>
                    <td>${machine.fecha_fin}</td>
                    <td class="actions">
                        <button class="btn-update" data-id="${machine.id_proyecto}">Actualizar</button>
                        <button class="btn-delete" data-id="${machine.id_proyecto}">Eliminar</button>
                    </td>
                </tr>
            `;
        });

        tableHTML += `
                </tbody>
            </table>
        `;

        this.container.innerHTML = tableHTML;

        // Asignar eventos a los botones
        this.container.querySelectorAll('.btn-update').forEach(button => {
            button.addEventListener('click', () => this.handleUpdate(button.dataset.id));
        });

        this.container.querySelectorAll('.btn-delete').forEach(button => {
            button.addEventListener('click', () => this.handleDelete(button.dataset.id));
        });
    }

    handleUpdate(id) {
        alert(`Actualizar la máquina con ID: ${id}`);
        // Aquí podrías redirigir a un formulario o manejar la actualización
    }

    async handleDelete(id) {
        const confirmDelete = confirm(`¿Estás seguro de eliminar la máquina con ID: ${id}?`);
        if (confirmDelete) {
            try {
                const response = await fetch(`http://localhost:8000/proyectos/${id}`, {
                    method: 'DELETE',
                });

                if (response.ok) {
                    alert('Máquina eliminada con éxito');
                    const endPoint = this.getAttribute('api-endpoint');
                    this.fetchData(endPoint); // Refrescar los datos
                } else {
                    alert('Error al eliminar la máquina');
                }
            } catch (error) {
                console.error('Error en la eliminación', error);
                alert('Error con la conexión de la API');
            }
        }
    }
}

// Definir el elemento personalizado
customElements.define('machine-listproy', ProyList);
