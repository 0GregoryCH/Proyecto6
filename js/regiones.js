// regiones.js: Manejo de filtro por región

// Función para mostrar países por región
function mostrarPorRegion(paises, region) {
  const contenedorRegiones = document.getElementById("contenedor-regiones");
  contenedorRegiones.innerHTML = "";
  const paisesFiltrados = region === "todos"
    ? paises
    : paises.filter(pais => pais.region === region);

  paisesFiltrados.forEach(pais => {
    const tarjetaRegion = document.createElement("div");
    tarjetaRegion.className = "tarjeta-region";

    tarjetaRegion.innerHTML = 
    ` <img src="${pais.flags.svg}" alt="Bandera de ${pais.name.common}">
      <h2>${pais.name.common}</h2>
      <p>Capital: ${pais.capital ? pais.capital[0] : "Desconocida"}</p>
      <p>Población: ${pais.population.toLocaleString()}</p>
    `;

    tarjetaRegion.addEventListener("click", () => {
      mostrarModal(pais);
    });

    contenedorRegiones.appendChild(tarjetaRegion);
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
  const seleccionarRegion = document.getElementById("seleccionar-region");

  const paises = await obtenerPaises();
  mostrarPorRegion(paises, "todos");

  seleccionarRegion.addEventListener("change", evento => {
    const regionSeleccionada = evento.target.value;
    mostrarPorRegion(paises, regionSeleccionada);
  });
});