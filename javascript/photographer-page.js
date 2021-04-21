let content = document.querySelector("#pp_galery_medias");
let container = document.querySelector(".pp_header");
let idUrl = window.location.search.substr(4);
let idUrlNumb = parseInt(idUrl, 10);


// ============ HEADER PHOTOGRAPHER INFOS =========================


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


function generatePhotographer(user) {

    if (user.id === idUrlNumb) {
        return `
  
      <div class="pp_infos">
        <h1 class="pp_name" id="pp_title">${user.name}</h1>
        <span class="pp_city" id="pp_city">${user.city}, ${user.country}</span>
        <span class="pp_tagline" id="pp_tagline">${user.tagline}</span>
        <ul class="pp_tags" id="pp_tags">
          <li>
            <a class="filter-tag" href="index.html?tag=portrait" title="portrait">portrait</a>
          </li>
          <li>
            <a class="filter-tag" href="index.html?tag=events" title="events">events</a>
          </li>
          <li>
            <a class="filter-tag" href="index.html?tag=travel" title="travel">travel</a>
          </li>
          <li>
            <a class="filter-tag" href="index.html?tag=animals" title="animals">animals</a>
          </li>
        </ul>
      </div>
      <button class="pp_contact">Contactez-moi</button>
      <img src="Photos/Photographers/${user.portrait}" alt="" class="pp_portrait" />`
    } else {
        return ` `
    }
};



// ============ MEDIAS PHOTOGRAPHERS =========================

function showMedia(response) {
    let acc = [];
    for (let medias of response.media) {
        acc.push(generateMedia(medias));
    }
    let html = acc.reduce((a, l) => a + l);
    content.innerHTML = html;

}


function generateMedia(usermedia) {
    if (usermedia.photographerId === idUrlNumb) {
        if (usermedia.video) {
            return `
              
                
                  <article class="pp_media">
                    <a href="#" title="">
                      <video class="pp_media_video" role="button">
                        ""
                        <source src="Photos/videos/${usermedia.video}" />
                      </video>
                    </a>
                    <div class="pp_media_infos">
                      <h2 class="media_infos-title">${usermedia.tags}</h2>
                      <span class="media_infos-price">${usermedia.price} €</span>
                      <span class="media_infos-like" id="">${usermedia.likes} <span class="fas fa-heart" role="button"></span></span>
                    </div>
                  </article>
                
              `
        } else if (usermedia.image) {
            return `
              
                
                  <article class="pp_media">
                    <a href="#" title="">
                      <img src="Photos/images/${usermedia.image}" alt="" role="button" />
                    </a>
                    <div class="pp_media_infos">
                      <h2 class="media_infos-title">${usermedia.tags}</h2>
                      <span class="media_infos-price">${usermedia.price} €</span>
                      <span class="media_infos-like" id="">${usermedia.likes} <span  class="fas fa-heart" role="button"></span></span>
                    </div>
                  </article>
               
              `
        }
    } else {
        return ` `
    }
};



fetch("json/profil.json")
    .then((response) => response.json())
    .then((json) => showMedia(json));