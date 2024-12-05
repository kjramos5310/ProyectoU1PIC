class AsignacionesList extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        // Contenedor principal
        this.container = document.createElement('div');

        // Estilo del componente
        this.styles = document.createElement('style');
        this.styles.textContent = `
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

        this.shadowRoot.appendChild(this.styles);
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
            const asignaciones = data || [];
            this.render(asignaciones);
        } catch (error) {
            console.error('Error al conectar con la API', error);
            this.container.innerHTML = `<p class="error-alert">Error al cargar los datos</p>`;
        }
    }

    // render(asignaciones) {
    //     if (asignaciones.length === 0) {
    //         this.container.innerHTML = `<p class="empty-alert">No hay asignaciones disponibles</p>`;
    //         return;
    //     }

    //     // Generamos la tabla con encabezados
    //     let tableHTML = `
    //         <table>
    //             <thead>
    //                 <tr>
    //                     <th>ID Máquina</th>
    //                     <th>ID Proyecto</th>
    //                     <th>Acciones</th>
    //                 </tr>
    //             </thead>
    //             <tbody>
    //     `;

    //     asignaciones.forEach(asignacion => {
    //         tableHTML += `
    //             <tr>
    //                 <td>${asignacion.id_maquina}</td>
    //                 <td>${asignacion.id_proyecto}</td>
    //                 <td class="actions">
    //                     <button class="btn-delete" data-id-maquina="${asignacion.id_maquina}" data-id-proyecto="${asignacion.id_proyecto}">Eliminar</button>
    //                 </td>
    //             </tr>
    //         `;
    //     });

    //     tableHTML += `
    //             </tbody>
    //         </table>
    //     `;

    //     this.container.innerHTML = tableHTML;

    //     // Asignar eventos a los botones
    //     this.container.querySelectorAll('.btn-delete').forEach(button => {
    //         button.addEventListener('click', () =>
    //             this.handleDelete(button.dataset.idMaquina, button.dataset.idProyecto)
    //         );
    //     });
    // }
    render(asignaciones) {
        if (asignaciones.length === 0) {
            this.container.innerHTML = `<p class="empty-alert">No hay asignaciones disponibles</p>`;
            return;
        }
    
        // Generamos la tabla con encabezados
        let tableHTML = `
            <table>
                <thead>
                    <tr>
                        <th>ID Máquina</th>
                        <th>Nombre Máquina</th>
                        <th>ID Proyecto</th>
                        <th>Nombre Proyecto</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
        `;
    
        asignaciones.forEach(asignacion => {
            tableHTML += `
                <tr>
                    <td>${asignacion.id_maquina}</td>
                    <td>${asignacion.nombre_maquina}</td>
                    <td>${asignacion.id_proyecto}</td>
                    <td>${asignacion.nombre_proyecto}</td>
                    <td class="actions">
                        <button class="btn-delete" data-id-maquina="${asignacion.id_maquina}" data-id-proyecto="${asignacion.id_proyecto}">Eliminar</button>
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
        this.container.querySelectorAll('.btn-delete').forEach(button => {
            button.addEventListener('click', () =>
                this.handleDelete(button.dataset.idMaquina, button.dataset.idProyecto)
            );
        });
    }
    

    async handleDelete(idMaquina, idProyecto) {
        const confirmDelete = confirm(
            `¿Estás seguro de eliminar la asignación Máquina ID: ${idMaquina} y Proyecto ID: ${idProyecto}?`
        );
        if (confirmDelete) {
            try {
                const response = await fetch(`http://localhost:8000/asignaciones/${idMaquina}/${idProyecto}`, {
                    method: 'DELETE',
                });

                if (response.ok) {
                    alert('Asignación eliminada con éxito');
                    const endPoint = this.getAttribute('api-endpoint');
                    this.fetchData(endPoint); // Refrescar los datos
                } else {
                    alert('Error al eliminar la asignación');
                }
            } catch (error) {
                console.error('Error en la eliminación', error);
                alert('Error con la conexión de la API');
            }
        }
    }
}

// Definir el elemento personalizado
customElements.define('asignaciones-list', AsignacionesList);
