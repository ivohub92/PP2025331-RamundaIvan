 
class Serie{
    id;
    url;
    name;
    language; 
    genres;
    image

    constructor(id, url, name, language, genres, image){
        this.id= id;
        this.url=url;
        this.name=name;
        this.language=language;
        this.genres=genres;
        this.image=image;
    }

    

    toJsonString(){
        return JSON.stringify(this);

    }
    
    createFromJsonString(json) {
        try {
            const data = JSON.parse(json);
            return new Serie(data.id, data.url, data.name, data.language, data.genres, data.image); 
        } catch (error) {
            console.error("Error al analizar la cadena JSON:", error);
            return null;
        }
    }

    createHtmlElement() {
        const showSerie = document.createElement('showSerie');
        showSerie.classList.add('contenedor-show');
        const genresText = this.genres ? this.genres.join(', ') : 'Desconocido';
        const imageUrl = this.image && this.image.medium ? this.image.medium : 'placeholder.jpg';
        const nombre = this.name;
        const serieUrl = this.url; 
        console.log(serieUrl);
        console.log(nombre);

    
        const imageLink = document.createElement('a');
        imageLink.href = serieUrl;  
        imageLink.target = '_blank'; 
        imageLink.style.display = 'block';

        const imagen = document.createElement('img');
        imagen.src = imageUrl;
        imagen.alt = nombre;
        imagen.style.cursor = 'pointer'; 
        imageLink.appendChild(imagen);

        const nombreHeader = document.createElement('h3');
        nombreHeader.textContent = nombre;

        const idioma = document.createElement('p');
        idioma.textContent = `Idioma: ${this.language}`;

        const genero = document.createElement('p');
        genero.textContent = `Géneros: ${genresText}`;

        
        const btnGuardar = document.createElement('button');
        btnGuardar.textContent = 'Guardar';
        btnGuardar.addEventListener('click', () => this.guardarSerie(this));        
        showSerie.appendChild(imageLink);
        showSerie.appendChild(nombreHeader);
        showSerie.appendChild(idioma);
        showSerie.appendChild(genero);
        showSerie.appendChild(btnGuardar);

    return showSerie;
    }

    guardarSerie(serie) {
        let seriesGuardadas = JSON.parse(localStorage.getItem('seriesGuardadas')) || [];
        seriesGuardadas = seriesGuardadas.filter(s => s && s.id != null);//hice esto porque la primera vez que inicio, al tener valores null se rompia todo

        const encontrada = seriesGuardadas.find(s => s.id === serie.id);
        if (!encontrada) {
            seriesGuardadas.push(serie);
            localStorage.setItem("seriesGuardadas", JSON.stringify(seriesGuardadas));
            alert(`Serie "${serie.name}" guardada.`);
        } else {
            alert(`La serie "${serie.name}" ya está guardada.`);
        }
    }


    
}

export { Serie }; 