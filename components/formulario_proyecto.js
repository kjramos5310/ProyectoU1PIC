class ProjectForm extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.innerHTML = `
        <style>
          form {
            display: flex;
            flex-direction: column;
          }
          label {
            margin: 0.5em 0 0.2em;
          }
          input, button {
            margin: 0.5em 0;
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
  