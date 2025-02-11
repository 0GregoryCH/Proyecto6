// general.js: Lógica utilizada para todas las páginas

const urlAPI = "https://restcountries.com/v3.1/all";

async function obtenerPaises() {
  try {
    // Verifica si los datos ya están en localStorage
    const datosLocales = localStorage.getItem("paises");
    if (datosLocales) {
      console.log("Cargando datos del localStorage...");
      return JSON.parse(datosLocales);
    }

    console.log("Realizando petición a la API...");
    const respuesta = await fetch(urlAPI);
    const datos = await respuesta.json();

    // Guardar en localStorage
    localStorage.setItem("paises", JSON.stringify(datos));
    return datos;
  } catch(error){
    console.error("Error al obtener los datos:", error);
  }
}

// Inicializar
document.addEventListener("DOMContentLoaded", async () => {
  const paises = await obtenerPaises();
  console.log("Países cargados:", paises.length);
});