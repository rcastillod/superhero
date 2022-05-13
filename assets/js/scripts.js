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
    
    limpiaErrores()

    if ( valida(searchVal) == false ) {
        searchError('El valor ingresado no es valido!')
    }

    // Ejecuto ajax
    getHero(searchVal)

}

// Valido que valor de input sea solo numérico
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
    searchWrapper.append(`<p class="search__error">${text}</p>`)
    $('#searchInput').val('')
    $('#searchInput').focus()
}

// Limpio errores
function limpiaErrores() {
    $('.search__error').remove()
}

// Obtengo Super Heroe
function getHero(hero) {
    $.ajax({
        type: 'GET',
        url: 'https://superheroapi.com/api/4905856019427443/'+hero,
        success: function(response) {
            console.log(response)
        },
        error: function(error) {
            console.log(error)
        }
    })
}