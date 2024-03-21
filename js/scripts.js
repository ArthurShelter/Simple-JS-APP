let pokemonRepository = (function () {
    let pokemonList = [
        {
            name: 'Bulbasaur',
            height: 0.7,
            types: ['grass', 'poison']
        },
        {
            name: 'Fearow',
            height: 1.2,
            types: ['flying', 'normal']
        },
        {
            name: 'Meowth',
            height: 0.4,
            types: ['normal']
        },
    ];

    function add(pokemon) {
        pokemonList.push(pokemon);
    }

    function getAll() {
        return pokemonList;
    }

    return {
        add: add,
        getAll: getAll
    };

})();

pokemonRepository.getAll().forEach(function(pokemon) {
    if (pokemon.height > 1.0) {
        document.write('<p>' + pokemon.name + ' (height: ' + pokemon.height + ')' + '</p>');
        document.write(`That's a big one!`);
    }
    else {
        document.write('<p>' + pokemon.name + ' (height: ' + pokemon.height + ')' + '</p>');
    }
});

function divide(dividend, divisor) {
if (divisor === 0)
{
    return 'You are trying to divide by 0.'
}
else {
    let result = dividend / divisor;
    return result;
}

}