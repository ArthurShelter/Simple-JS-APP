let pokemonRepository=function(){let e=[],t=document.querySelector(".modal-body");function n(){return e}return{addListItem:function e(n){let o=document.querySelector(".pokemon-list"),i=document.createElement("li");i.classList.add("list-group-item");let r=document.createElement("button");r.innerText=n.name,r.classList.add("pocket-monster","btn","btn-primary"),r.setAttribute("data-toggle","modal"),r.setAttribute("data-target","#exampleModal"),i.appendChild(r),o.appendChild(i),r.addEventListener("click",function(){!function e(n){var o;(o=n,fetch(o.detailsUrl).then(function(e){return e.json()}).then(function(e){o.imageUrl=e.sprites.front_default,o.height=e.height,o.types=e.types}).catch(function(e){console.error(e)})).then(function(){var e;let o,i,r;e=n,t.innerHTML="",o=document.createElement("div"),document.querySelector(".modal-title").innerText=e.name[0].toUpperCase()+e.name.slice(1),(i=document.createElement("img")).src=e.imageUrl,i.setAttribute("alt","Pokemon sprite"),(r=document.createElement("p")).innerHTML="Height: "+e.height,o.appendChild(r),o.appendChild(i),t.appendChild(o)})}(n)})},getAll:n,loadList:function t(){return fetch("https://pokeapi.co/api/v2/pokemon/?limit=150").then(function(e){return e.json()}).then(function(t){t.results.forEach(function(t){var n;n={name:t.name,detailsUrl:t.url},e.push(n)})}).catch(function(e){console.error(e)})}}}();pokemonRepository.loadList().then(function(){pokemonRepository.getAll().forEach(function(e){pokemonRepository.addListItem(e)})}),$(document).ready(function(){$("h1").css("color","red")});