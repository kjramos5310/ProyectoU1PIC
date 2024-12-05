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
        @media (max-width: 768px) {
          h1 {
            font-size: 1.8rem;
          }
          h2 {
            font-size: 1.2rem;
          }
        }

        @media (max-width: 480px) {
          header {
            padding: 10px;
          }
          h1, h2 {
            font-size: 1rem;
          }
        }
        </style>
        <header>
        <a href="/Proyecto/index.html">
          <h1>Sistema de Producción</h1>
          <h2>Proyecto Programacion Integrativa</h2>
        </a>
      </header>
      `;
    }
  }
  customElements.define('header-bar', HeaderBar);
  