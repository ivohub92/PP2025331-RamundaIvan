document.addEventListener("DOMContentLoaded", ()=>{
    const contenedor = document.getElementById("seriesGuardadas");

    const seriesGuardadas = JSON.parse(localStorage.getItem("seriesGuardadas")) || [];

    if (seriesGuardadas.length === 0) {
        contenedor.innerHTML = "<p>No hay series guardadas.</p>";
        return;
    }

    console.log(seriesGuardadas);

    seriesGuardadas.forEach(serie=>{
        const div = document.createElement("div");
        div.className = "serie";

        div.innerHTML = `
        <h3>${serie.nombre}</h3>
        <img src="${serie.imagen}" alt="${serie.nombre}" style="max-width:100%">
        <p><strong>Géneros:</strong> ${serie.generos.join(", ")}</p>
        <div>${serie.resumen}</div>
        `;

        contenedor.appendChild(div);
    });
});