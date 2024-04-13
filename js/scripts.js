let pokemonRepository = (function () {
    let pokemonList = [];

    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    let modalContainer = document.querySelector('.modal-body');

    function showModal(pokemon) {
        // Clear all existing modal content
        modalContainer.innerHTML = '';

        let modal = document.createElement('div');

        let modalTitle = document.querySelector('.modal-title');
        modalTitle.innerText =
            pokemon.name[0].toUpperCase() + pokemon.name.slice(1);


        // pokemon sprite image
        let imageElement = document.createElement('img');
        // imageElement.classList.add('modal-img');
        imageElement.src = pokemon.imageUrl;
        imageElement.setAttribute('alt', 'Pokemon sprite');

        let heightElement = document.createElement('p');
        heightElement.innerHTML = 'Height: ' + pokemon.height;

        modal.appendChild(heightElement);
        modal.appendChild(imageElement);
        modalContainer.appendChild(modal);

    }

    function showDetails(pokemon) {
        loadDetails(pokemon).then(function () {
            showModal(pokemon);
        });
    }

    function add(pokemon) {
        pokemonList.push(pokemon);
    }

    function addListItem(pokemon) {
        let pokemonVariable = document.querySelector('.pokemon-list');
        let listItem = document.createElement('li');
        listItem.classList.add('list-group-item');

        let button = document.createElement('button');
        button.innerText = pokemon.name;
        button.classList.add('pocket-monster', 'btn', 'btn-primary');

        button.setAttribute('data-toggle', 'modal');
        button.setAttribute('data-target', '#exampleModal');

        listItem.appendChild(button);
        pokemonVariable.appendChild(listItem);

        button.addEventListener('click', function () {
            showDetails(pokemon);
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
        return fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (details) {
            item.imageUrl = details.sprites.front_default;
            item.height = details.height;
            item.types = details.types;
        })
        .catch(function (e) {
            console.error(e);
        });
    }


    return {
        // add: add,
        addListItem: addListItem,
        // showDetails: showDetails,
        getAll: getAll,
        loadList: loadList
        // loadDetails: loadDetails
    };

})();

pokemonRepository.loadList().then(function () {
    //now the data is loaded...
    pokemonRepository.getAll().forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});


$(document).ready(function () {
    // Change the text color of the heading to red
    $("h1").css("color", "red");
});
