// paises.js: Manejo de la lista de países

// Función para mostrar los países
function mostrarPaises(paises, filtro = "") {
  const contenedorPaises = document.getElementById("contenedor-paises");
  contenedorPaises.innerHTML = ""; // Limpiar contenedor

  // Filtrar países por nombre en inglés o español
  const paisesFiltrados = paises.filter(pais => {
    const nombreIngles = pais.name.common.toLowerCase(); // Inglés
    const nombreEspanol = pais.translations.spa.common.toLowerCase(); // Español
    const filtroMinusculas = filtro.toLowerCase();

    // Verificar si el filtro coincide con el nombre en inglés o español
    return nombreIngles.includes(filtroMinusculas) || nombreEspanol.includes(filtroMinusculas);
  });

  paisesFiltrados.forEach(pais => {
    const tarjetaPais = document.createElement("div");
    tarjetaPais.className = "tarjeta-pais";

    tarjetaPais.innerHTML = 
    ` <img src="${pais.flags.svg}" alt="Bandera de ${pais.name.common}">
      <h2>${pais.name.common}</h2>
      <p>Capital: ${pais.capital ? pais.capital[0] : "Desconocida"}</p>
      <p>Población: ${pais.population.toLocaleString()}</p>
    `;

    tarjetaPais.addEventListener("click", () => {
      mostrarModal(pais);
    });

    contenedorPaises.appendChild(tarjetaPais);
  });
}

// Función para mostrar modal con detalles del país
function mostrarModal(pais) {
  const modal = document.getElementById("modal-pais");
  const modalBandera = document.getElementById("modal-bandera");
  const modalNombre = document.getElementById("modal-nombre");
  const modalCapital = document.getElementById("modal-capital");
  const modalPoblacion = document.getElementById("modal-poblacion");

  modalBandera.src = pais.flags.svg;
  modalNombre.textContent = `País: ${pais.name.common}`;
  modalCapital.textContent = `Capital: ${pais.capital ? pais.capital[0] : "Desconocida"}`;
  modalPoblacion.textContent = `Población: ${pais.population.toLocaleString()}`;

  modal.style.display = "block";

  const cerrarModal = document.querySelector(".cerrar-modal");
  cerrarModal.onclick = () => {
    modal.style.display = "none";
  };

  window.onclick = (event) => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  };
}

// Función principal que se ejecuta al cargar el DOM
document.addEventListener("DOMContentLoaded", async () => {
  const inputBuscar = document.getElementById("buscar");

  const paises = await obtenerPaises();
  mostrarPaises(paises);

  inputBuscar.addEventListener("input", evento => {
    const filtro = evento.target.value;
    mostrarPaises(paises, filtro);
  });
});