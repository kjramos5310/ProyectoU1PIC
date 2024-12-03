class NavBar extends HTMLElement {
    constructor() {
      super();
      const shadow = this.attachShadow({ mode: 'open' });
      shadow.innerHTML = `
        <style>
          nav {
            background-color: #555;
            display: flex;
            justify-content: space-around;
            padding: 1em;
          }
          a {
            color: white;
            text-decoration: none;
          }
          a:hover {
            text-decoration: underline;
          }
        </style>
        <nav>
          <a href="#" data-view="home">Inicio</a>
          <a href="#" data-view="machines">Máquinas</a>
          <a href="#" data-view="projects">Proyectos</a>
          <a href="#" data-view="assignments">Asignaciones</a>
          <a href="#" data-view="about">Acerca de</a>
        </nav>
      `;
  
      shadow.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          const view = link.dataset.view;
          this.dispatchEvent(new CustomEvent('navigate', { detail: { view } }));
        });
      });
    }
  }
  customElements.define('nav-bar', NavBar);
  