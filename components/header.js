class HeaderBar extends HTMLElement {
    constructor() {
      super();
      const shadow = this.attachShadow({ mode: 'open' });
      shadow.innerHTML = `
        <style>
          header {
            background-color: #282c34;
            color: white;
            padding: 1em;
            text-align: center;
          }
        </style>
        <header>
          <h1>Sistema de Producción</h1>
          <h2>Proyecto Avance</h2>
        </header>
      `;
    }
  }
  customElements.define('header-bar', HeaderBar);
  