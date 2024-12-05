class NavBar extends HTMLElement {
  constructor() {
      super();

      const menu = document.createElement('ul'); // Crear lista
      const menuOptions = [
          { text: "Formulario Proyecto", path: "components/formulario_proyecto.html" },
          { text: "Lista Asignacion", path: "components/ListaAsignaciones.html" },
          { text: "Lista Maquinas", path: "components/lista-maquinas.html" },
          { text: "Lista Proyectos", path: "components/listaproyectos.html" }
      ];

      // Determinar si estamos dentro de la carpeta 'components'
      const isInComponentsFolder = window.location.pathname.includes('/components/');

      menuOptions.forEach(option => {
          const item = document.createElement('li');
          const link = document.createElement('a');

          // Generar la ruta correcta dependiendo de si estamos en la carpeta 'components'
          if (isInComponentsFolder) {
              // Si estamos en 'components', mantenemos la ruta relativa correcta
              link.href = `./${option.path.split('/').pop()}`; // Sólo toma el archivo (ej. formulario_proyecto.html)
          } else {
              // Si estamos fuera de 'components', necesitamos navegar hacia la carpeta 'components'
              link.href = `./${option.path}`;
          }

          link.textContent = option.text;

          link.style.textDecoration = "none"; // Quitar subrayado
          link.style.color = "inherit"; // Usar el color del contenedor

          item.appendChild(link); // Añadir el enlace al elemento de lista
          menu.appendChild(item); // Añadir el elemento al menú
      });

      menu.classList.add('custom-menu'); // Añadir clase para estilos
      this.appendChild(menu); // Añadir el menú al componente
  }
}

window.customElements.define('nav-bar', NavBar);
