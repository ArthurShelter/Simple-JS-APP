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
    document.write('<p>' + pokemonList[i].name + ' (height: ' + pokemonList[i].height + ')' + '</p>');
}