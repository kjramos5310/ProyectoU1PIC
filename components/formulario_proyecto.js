class ProjectForm extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.innerHTML = `
            <style>
        body {
          font-family: 'Arial', sans-serif;
        }
        form {
          background-color: #f4f4f4;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          max-width: 400px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
        }

        label {
          font-size: 1.2em;
          color: #333;
          margin-bottom: 0.3em;
        }

        input {
          padding: 0.8em;
          margin-bottom: 1.5em;
          border: 1px solid #ccc;
          border-radius: 4px;
          font-size: 1em;
          width: 100%;
          box-sizing: border-box;
        }

        input:focus {
          border-color: #4CAF50;
          outline: none;
        }

        button {
          padding: 0.8em;
          background-color: #4CAF50;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 1.2em;
          transition: background-color 0.3s;
        }

        button:hover {
          background-color: #45a049;
        }

        button:active {
          background-color: #388e3c;
        }

        /* Mobile responsiveness */
        @media (max-width: 600px) {
          form {
            padding: 15px;
            max-width: 90%;
          }
          button {
            font-size: 1em;
            padding: 0.7em;
          }
        }
      </style>
      <form>
        <label for="nombre">Nombre del Proyecto:</label>
        <input type="text" id="nombre" name="nombre" required />
        
        <label for="fecha_inicio">Fecha de Inicio:</label>
        <input type="date" id="fecha_inicio" name="fecha_inicio" required />
        
        <label for="fecha_fin">Fecha de Fin:</label>
        <input type="date" id="fecha_fin" name="fecha_fin" required />
        
        <button type="submit">Registrar Proyecto</button>
      </form>
      `;
  
      this.shadowRoot.querySelector('form').addEventListener('submit', this.handleSubmit);
    }
  
    handleSubmit = async (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      const data = Object.fromEntries(formData.entries());
      // await fetch('/api/projects', {
        await fetch('http://localhost:8000/proyectos/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      alert('Proyecto registrado con éxito');
    };
  }
  customElements.define('project-form', ProjectForm);
  