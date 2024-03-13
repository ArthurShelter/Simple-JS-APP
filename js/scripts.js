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

for (let i = 0; i < pokemonList.length; i++) {
    if (pokemonList[i].height > 1.0) {
        document.write('<p>' + pokemonList[i].name + ' (height: ' + pokemonList[i].height + ')' + '</p>');
        document.write(`That's a big one!`);
    }
    else {
        document.write('<p>' + pokemonList[i].name + ' (height: ' + pokemonList[i].height + ')' + '</p>');
    }
}