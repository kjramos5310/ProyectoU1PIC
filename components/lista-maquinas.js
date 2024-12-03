// class MachineList extends HTMLElement {
//   constructor() {
//       super();

//       this.table = document.createElement('table');
//       this.table.classList.add('machine-list'); // Clase CSS para la tabla

//       const headers = ['ID', 'Nombre', 'Capacidad'];
//       const headerRow = document.createElement('tr');

//       headers.forEach(headerText => {
//           const header = document.createElement('th');
//           header.textContent = headerText;
//           headerRow.appendChild(header);
//       });
//       this.table.appendChild(headerRow);

//       // Añadir tabla al componente personalizado
//       this.appendChild(this.table);
//   }

//   connectedCallback() {
//       const endPoint = this.getAttribute('api-endpoint');
//       if (endPoint) {
//           this.fetchData(endPoint);
//       } else {
//           console.error('El atributo "api-endpoint" no está definido.');
//       }
//   }

//   async fetchData(url) {
//       try {
//           const response = await fetch(url);
//           const data = await response.json();
//           this.render(data); // Adaptar al formato de la API
//       } catch (error) {
//           console.error('Error al conectar con la API', error);
//           this.table.innerHTML += `<tr><td colspan="3">Error al cargar los datos</td></tr>`;
//       }
//   }

//   render(data) {
//       // Limpiar filas existentes (excepto encabezados)
//       const rows = this.table.querySelectorAll('tr:not(:first-child)');
//       rows.forEach(row => row.remove());

//       // Iterar sobre los datos y añadirlos a la tabla
//       data.forEach(item => {
//           const row = document.createElement('tr');

//           // ID
//           const idCell = document.createElement('td');
//           idCell.textContent = item.id || 'N/A';
//           row.appendChild(idCell);

//           // Nombre
//           const nameCell = document.createElement('td');
//           nameCell.textContent = item.nombre || 'N/A';
//           row.appendChild(nameCell);

//           // Capacidad
//           const capacityCell = document.createElement('td');
//           capacityCell.textContent = item.capacidad || 'N/A';
//           row.appendChild(capacityCell);

//           this.table.appendChild(row);
//       });
//   }
// }

// // Registrar el elemento personalizado
// customElements.define('machine-list', MachineList);

class MachineList extends HTMLElement {
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
                        <th>Capacidad</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
        `;

        machines.forEach(machine => {
            tableHTML += `
                <tr>
                    <td>${machine.id_maquina}</td>
                    <td>${machine.nombre}</td>
                    <td>${machine.capacidad}</td>
                    <td class="actions">
                        <button class="btn-update" data-id="${machine.id_maquina}">Actualizar</button>
                        <button class="btn-delete" data-id="${machine.id_maquina}">Eliminar</button>
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
                const response = await fetch(`http://localhost:8000/maquinas/${id}`, {
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
customElements.define('machine-list', MachineList);