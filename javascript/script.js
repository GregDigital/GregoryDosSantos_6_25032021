
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

  console.log(user.tags);
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




//=============================================== PHOTOGRAPHER PAGE




let content = document.querySelector("#photographer_page");






function generateMedia(usermedia) {
   
    return`
    <main ${usermedia.photographerId} >
   <section class="pp_galery">

   <article class="pp_galery_medias" id="pp_galery_medias">
     <article class="pp_media">
       <a href="#" title="">
         <video class="pp_media_video" role="button">
           ""
           <source src="Photos/videos/${usermedia.video}" />
         </video>
       </a>
       <div class="pp_media_infos">
         <h2 class="media_infos-title"></h2>
         <span class="media_infos-price">$</span>
         <span class="media_infos-like" id=""><span class="fas fa-heart" role="button"></span></span>
       </div>
     </article>

     <article class="pp_media">
       <a href="#" title="">
         <img src="Photos/images/${usermedia.image}" alt="" role="button" />
       </a>
       <div class="pp_media_infos">
         <h2 class="media_infos-title"></h2>
         <span class="media_infos-price">$</span>
         <span class="media_infos-like" id=""><span class="fas fa-heart" role="button"></span></span>
       </div>
     </article>
     </section>
     </main>

     `
    
    ;

     


  }


  function showMedia(response) {
    let acc = [];
    for (let medias of response.media) {
      acc.push(generateMedia(medias));
    }
    let html = acc.reduce((a, l) => a + l);
    content.innerHTML = html;

  }




  fetch("json/profil.json")
  .then((response) => response.json())
  .then((json) => show(json));

