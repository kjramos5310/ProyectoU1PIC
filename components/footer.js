class FooterBar extends HTMLElement {
    constructor() {
      super();
      const shadow = this.attachShadow({ mode: 'open' });
      shadow.innerHTML = `
        <style>
          footer {
            background-color: #282c34;
            color: white;
            padding: 1em;
            text-align: center;
            position: fixed;
            bottom: 0;
            width: 100%;
          }

          @media (max-width: 768px) {
            footer {
              font-size: 0.9rem;
              padding: 0.8em;
            }
          }

          @media (max-width: 480px) {
            footer {
              font-size: 0.8rem;
              padding: 0.5em;
            }
          }
        </style>
        <footer>
          <p>© 2024 Sistema de Producción</p>
        </footer>
      `;
    }
  }
  customElements.define('footer-bar', FooterBar);
  