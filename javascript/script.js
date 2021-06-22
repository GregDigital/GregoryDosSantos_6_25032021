//============================================ PAGE ACCUEIL

let container = document.querySelector("#photographers");

function initFilters() {
  const containerTaggs = document.querySelector(".navTagg");

  containerTaggs.addEventListener("click", (e) => {
    let tagData = e.target.dataset.target;
    console.log(tagData);

    if (e.target.classList.toggle("active")) {
      const containerCards = document.querySelectorAll(".photographers_card");
      containerCards.forEach(function (item) {
        let dataFilters = item.dataset.filters;
        let arrayDataFilters = dataFilters.split(",");
        
        for (let index = 0; index < arrayDataFilters.length; index++) {
         
          let element = arrayDataFilters[index];
         console.log(element)
          if (tagData === element) {
            item.style.display = "block";
          } else {
            item.style.display = "none";
          }
        }
      });
    }
  });
}

function generatePhotographerTags(tags) {
  
  let acc = [];
  for (let tag of tags) {
    acc.push(`<li class="filter">#${tag}</li>`);
  }
  let html = acc.reduce((a, l) => a + l);
  return html;
}

function generatePhotographer(user) {
  console.log(user.id);
  return `
    <article class="photographers_card" data-filters="${user.tags}">
                <a class="test" href="photographer-page.html?id=${user.id}">
                    <img class="portrait" src="./Photos/Photographers/${
                      user.portrait
                    }" alt="Photo du photographe MimiKeel">
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
  initFilters(response.photographers);
 
}
fetch("json/profil.json")
  .then((response) => response.json())
  .then((json) => show(json));
