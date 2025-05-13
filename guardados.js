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
        <h3>${serie.name}</h3>
        <img src="${serie.image}" alt="${serie.name}" style="max-width:100%">
        <p>Géneros ${serie.genres}</p>        
        `;

        contenedor.appendChild(div);
    });
});