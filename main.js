import {Serie} from "./series.js"; 

document.addEventListener("DOMContentLoaded",()=>{
const contenedorSeries = document.getElementById("series");
const cantidadSeriesPorPagina = 6;
let paginaActual = 1;

function cargarPagina(pagina){
    contenedorSeries.innerHTML = ""; 
    const inicio = (pagina - 1) * cantidadSeriesPorPagina + 1;
    const fin = inicio + cantidadSeriesPorPagina - 1;
    const seriesPedidas = [];

    for (let i = inicio; i <= fin; i++){
    seriesPedidas.push(
        fetch(`https://api.tvmaze.com/shows/${i}`)
        .then(response=>{
            if (!response.ok){            
            alert(`No se pudo traer la serie id: ${i}: ${response.status}`);
            return null; 
            }
            return response.json();
        })
        .catch(error => {
           alert(`Error al traer la serie id: ${i}:`, error);
            return null; 
        }));
    }

    Promise.all(seriesPedidas)
    .then(seriesDatos=>{        
        seriesDatos.filter(dato => dato).forEach(dato => {
        const serie = new Serie(
            dato.id,
            dato.url,
            dato.name,
            dato.language,
            dato.genres,
            dato.image
        );
        const objetoSerie = serie.createHtmlElement();
        contenedorSeries.appendChild(objetoSerie);
        });
    })
    .catch(error =>{
        console.error("Error al cargar la página de series:", error);
        contenedorSeries.innerHTML = "<p>Error al cargar las series.</p>";
    });
}

function paginaSiguiente() {
    paginaActual++;
    cargarPagina(paginaActual);
}

function paginaAnterior(){
    if (paginaActual > 1){
    paginaActual--;
    cargarPagina(paginaActual);
    }
}


cargarPagina(paginaActual);


    const btnAnterior = document.getElementById("anterior");
    const btnSiguiente = document.getElementById("siguiente");
    if (btnAnterior) {
        btnAnterior.addEventListener('click', paginaAnterior);
    } else {
        aler("error en el boton anterior");
    }
    if (btnSiguiente) {
        btnSiguiente.addEventListener("click", paginaSiguiente);
    } else {
        alert("error con el boton siguiente");
    }
});






