let pokemonRepository = (function () {
    let pokemonList = [];

    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';


    let modalContainer = document.querySelector('#modal-container');

    function showModal(pokemon) {
        // Clear all existing modal content
        modalContainer.innerHTML = '';

        let modal = document.createElement('div');
        modal.classList.add('modal');

        // Add the new modal content
        let closeButtonElement = document.createElement('button');
        closeButtonElement.classList.add('modal-close','btn','btn-primary');
        closeButtonElement.innerText = 'Close';
        closeButtonElement.addEventListener('click', hideModal);

        let titleElement = document.createElement('h1');
        titleElement.innerText = pokemon.name;

        let contentElement = document.createElement('p');
        contentElement.innerText = "Height: " + pokemon.height;
        // pokemon sprite image
        let imageElement = document.createElement("img");
        imageElement.src = pokemon.imageUrl;
        // imageElement.setAttribute("src", img);
        // imageElement.setAttribute("width", "304");
        // imageElement.setAttribute("height", "228");
        imageElement.setAttribute("alt", "Pokemon sprite");
        imageElement.setAttribute("title", "Pokemon sprite");

        modal.appendChild(closeButtonElement);
        modal.appendChild(titleElement);
        modal.appendChild(contentElement);
        modal.appendChild(imageElement);
        modalContainer.appendChild(modal);

        modalContainer.classList.add('is-visible');
    }

    function hideModal() {
        modalContainer.classList.remove('is-visible');
    }

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
            hideModal();
        }
    });

    modalContainer.addEventListener('click', (e) => {
        // Since this is also triggered when clicking INSIDE the modal container,
        // We only want to close if the user clicks directly on the overlay
        let target = e.target;
        if (target === modalContainer) {
            hideModal();
        }
    });

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
        listItem.classList.add('.list-group-item');

        let button = document.createElement('button');
        button.innerText = pokemon.name;
        button.classList.add('pocket-monster','btn','btn-primary');
        button.setAttribute('data-toggle', 'modal');
        button.setAttribute('data-target', 'exampleModal');
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

