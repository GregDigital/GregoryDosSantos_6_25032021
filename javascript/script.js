//============================================ PAGE ACCUEIL

let container = document.querySelector("#photographers");

function generatePhotographerTags(tags) {
    let acc = [];
    for (let tag of tags) {
        acc.push(`<li class="filter">#${tag}</li>`)
    }
    let html = acc.reduce((a, l) => a + l);
    return html

}

function generatePhotographer(user) {

    console.log(user.id);
    return `
    <article class="photographers_card">
                <a class="test" href="photographer-page.html?id=${user.id}">
                    <img class="portrait" src="./Photos/Photographers/${user.portrait}" alt="Photo du photographe MimiKeel">
                    <h2 class="name">${user.name}</h2>
                </a>
                <p class="infos_photographer">
                    <span class="city">${user.city}, ${user.country}</span>
                    <span class="tagline">${user.tagline}</span>
                    <span class="price">${user.price} €</span>
                </p>
                <ul class="infos_photographer_tags">
                ${generatePhotographerTags(user.tags)}
                </ul>
            </article>`;

}

function show(response) {
    let acc = [];
    for (let photographer of response.photographers) {
        acc.push(generatePhotographer(photographer));
    }
    let html = acc.reduce((a, l) => a + l);
    container.innerHTML = html;
}
fetch("json/profil.json")
    .then((response) => response.json())
    .then((json) => show(json));