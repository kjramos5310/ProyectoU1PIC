class MiInicio extends HTMLElement {
    constructor() {
        super();

        const shadow = this.attachShadow({ mode: 'open' }); // Crear Shadow DOM

        // Crear contenedor
        const container = document.createElement('div');
        container.classList.add('inicio-container');

        // Crear contenido de bienvenida
        const title = document.createElement('h1');
        title.textContent = 'Proyecto Unidad 1';
        container.appendChild(title);

        const subtitle = document.createElement('p');
        subtitle.textContent = 'Programacion Integrativa de Componentes';
        subtitle.textContent = 'K Jesus Ramos';
        container.appendChild(subtitle);

        // Agregar estilos
        const style = document.createElement('style');
        style.textContent = `
            .inicio-container {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                height: 100vh;
                text-align: center;
                background-color: #f4f4f4;
                color: #333;
                font-family: Arial, sans-serif;
            }

            h1 {
                font-size: 2.5rem;
                color: #0078D7; /* Color destacado */
            }

            p {
                font-size: 1.2rem;
                margin-top: 10px;
            }

            @media (max-width: 768px) {
                h1 {
                font-size: 2rem;
                }
                p {
                font-size: 1rem;
                }
            }

            @media (max-width: 480px) {
                h1 {
                font-size: 1.5rem;
                }
                p {
                font-size: 0.9rem;
                }
            }
        `;

        // Añadir elementos al Shadow DOM
        shadow.appendChild(style);
        shadow.appendChild(container);
    }
}

window.customElements.define('mi-inicio', MiInicio);
