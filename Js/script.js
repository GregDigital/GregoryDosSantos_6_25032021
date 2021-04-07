let container = document.querySelector("#photographers");

function generatePhotographer(user) {
  console.log(user)
    return `
    <article class="photographers_card">
                <a href="">
                    <img class="portrait" src="./Photos/Photographers/${user.portrait}" alt="Photo du photographe MimiKeel">
                    <h2 class="name">${user.name}</h2> 
                </a>
                <p class="infos_photographer">
                    <span class="city">${user.city}</span>
                    <span class="tagline">${user.tagline}</span>
                    <span class="price">${user.price}</span>
                </p>
                <ul class="infos_photographer_tags">
                    <li class=""><a href="index.html" class="filter" title="portrait">#Portrait</a></li>
                    <li class=""><a href="index.html" class="filter" title="events">#Events</a></li>
                    <li class=""><a href="index.html" class="filter" title="travel">#Travel</a></li>
                    <li class=""><a href="index.html" class="filter" title="animals">#Animals</a></li>
                    
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
