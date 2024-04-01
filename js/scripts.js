let pokemonRepository = (function () {
    let pokemonList = [
        // {
        //     name: 'Bulbasaur',
        //     height: 0.7,
        //     types: ['grass', 'poison']
        // },
        // {
        //     name: 'Fearow',
        //     height: 1.2,
        //     types: ['flying', 'normal']
        // },
        // {
        //     name: 'Meowth',
        //     height: 0.4,
        //     types: ['normal']
        // },
    ];

    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    function add(pokemon) {
        pokemonList.push(pokemon);
    }

    function addListItem(pokemon) {
        let pokemonVariable = document.querySelector('.pokemon-list');
        let listItem = document.createElement('li');

        let button = document.createElement('button');
        button.innerText = pokemon.name;
        button.classList.add('pocket-monster');
        listItem.appendChild(button);
        pokemonVariable.appendChild(listItem);

        button.addEventListener('click', function () {
            showDetails(pokemon);
        });
    }

    function showDetails(pokemon) {
        loadDetails(pokemon).then(function () {
            console.log(pokemon);
        });
    }

    function getAll() {
        return pokemonList;
    }

    function loadList() {
        return fetch(apiUrl).then(function (response) {
            return response.json();
        }).then(function (json) {
            json.results.forEach(function (item) {
                let pokemon = {
                    name: item.name,
                    detailsUrl: item.url
                };
                add(pokemon);
            });
        }).catch(function (e) {
            console.error(e);
        })
    }

    function loadDetails(item) {
        let url = item.detailsUrl;
        return fetch(url).then(function (response) {
            return response.json();
        }).then(function (details) {
            item.imageUrl = details.sprites.front_default;
            item.height = details.height;
            item.types = details.types;


        }).catch(function (e) {
            console.error(e);
        });
    }


    return {
        add: add,
        addListItem: addListItem,
        showDetails: showDetails,
        getAll: getAll,
        loadList: loadList,
        loadDetails: loadDetails
    };

})();

pokemonRepository.loadList().then(function () {
    //now the data is loaded...
    pokemonRepository.getAll().forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});

pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
});
