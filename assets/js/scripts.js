// jQuery
$(function(){

    // Evento click al botón 'Buscar'
    $('#searchButton').click(function(){
        
        // Obtengo valor del input
        searchHero()

    })

})

// Obtengo valor de input
function searchHero() {
    let searchVal = $('#searchInput').val()
    
    limpiaErrores() // Limpio mensajes de error
    limpiaCard() // Limpio el card cuando se crea una nueva búsqueda

    // Valido si el valor ingresado corresponde a lo solicitado (solo números)
    if ( valida(searchVal) == false ) {
        searchError('El valor ingresado no es valido!')
    }

    // Ejecuto ajax
    getHero(searchVal)
    $('#searchInput').val('')
}

// Valido que valor del input sea solo numérico
function valida(val) {
    let pattern = /^\d{1,3}$/ // Valido que el valor ingresado sea solo numérico y con máximo de 3 dígitos
    if ( pattern.test(val) ) {
        return true
    }
    return false
}

// Despliego mensaje de error
function searchError(text) {
    let searchWrapper = $('#search')
    searchWrapper.append(`<p class="error">${text}</p>`)
    $('#searchInput').val('')
    $('#searchInput').focus()
}

// Limpio errores
function limpiaErrores() {
    $('.error').remove()
}

// Limpio card
function limpiaCard() {
    $('.hero-card').remove()
}

// Obtengo Super Heroe
function getHero(id) {
    $.ajax({
        type: 'GET',
        url: 'https://www.superheroapi.com/api.php/4905856019427443/'+id,
        success: function(response) {
            $('#heroWrapper').append(generateCard(response))
            generateGraphic(response)
        },
        error: function(error) {
            // Crear función para mostrar error de la peticion ajax
            searchError('Oops! ha ocurrido un error, por favor inténtalo nuevamente')
        }
    })
}

// Genero card de super hero
function generateCard(hero) {
    let card = `
        <div class="hero-card">
            <div class="hero-card__image">
                <img src="${hero.image.url}" alt="${hero.name}">
                <div class="shadow" style="background-image:url(${hero.image.url})"></div>
            </div>
            <div class="hero-card__content">
                <h3 class="hero-card__title">${hero.name}</h3>
                <div class="hero-card__info">
                    <div class="info-item"><span>Nombre real: </span>${hero.biography['full-name']}</div>
                    <div class="info-item"><span>Lugar de nacimiento: </span>${hero.biography['place-of-birth']}</div>
                    <div class="info-item"><span>Raza: </span>${hero.appearance['race']}</div>
                    <div class="info-item"><span>Publicado por: </span>${hero.biography['publisher']}</div>
                </div>
                <div class="hero-card__desc">
                    <p>${hero.connections['group-affiliation']}</p>
                    <p>${hero.connections.relatives}</p>
                </div>
            </div>
        </div>
    `
    return card
}

// Genero gráfico de estadísticas
function generateGraphic(stats) {
    CanvasJS.addColorSet("heroColors",
            [
                "#F9A52E",
                "#F54241",
                "#39B6C3",                
                "#2A8A8D",
                "#F65B28",
                "#8CAFC2",                
            ]);
    var options = {
        colorSet: "heroColors",
        backgroundColor: null,
        title: {
            text: `Estadísticas de poder ${stats.name}`,
            fontColor: "white",
            fontFamily: "Kanit",
            fontSize: 24,
            fontWeight: "bold",
            horizontalAlign: "center",
        },
        animationEnabled: true,
        data: [{
            type: "pie",
            showInLegend: false,
            startAngle: 40,
            toolTipContent: "<b>{label}</b>: {y}%",
            legendText: "{label}",
            indexLabelFontSize: 14,
            indexLabelFontColor: "white",
            indexLabelFontFamily: "Kanit",
            indexLabel: "{label} - {y}%",
            dataPoints: statistics(stats.powerstats)
        }]
    };
    $("#heroStatistics").CanvasJSChart(options);
}

// Recorro Estadisticas
function statistics(list) {
    let statsArr = []
    for ( prop in list ) {
        let statsObj = {
            y: list[prop],
            label: prop
        }
        statsArr.push(statsObj)
    }
    return statsArr
}