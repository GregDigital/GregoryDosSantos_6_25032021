let content = document.querySelector("#pp_galery_medias");
let container = document.querySelector(".pp_header");
let idUrl = window.location.search.substr(4);
let idUrlNumb = parseInt(idUrl, 10);
let btnLike = document.querySelectorAll('.fas.fa-heart');



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



    function generateTags(tags) {
      let acc = [];
      for (let tag of tags) {
          acc.push(`<li>
          <a class="filter-tag" href="index.html?tag=portrait" title="portrait">#${tag}</a>
        </li>`)
      }
      let html = acc.reduce((a, l) => a + l);
      return html
  
  }




  //==============================================================

function button(){
    
        return`<button class="pp_contact">contactez-moi</button>`
      
   
}
 














//=================================================================

function generatePhotographer(user) {

    if (user.id === idUrlNumb) {
        return `
  
      <div class="pp_infos">
        <h1 class="pp_name" id="pp_title">${user.name}</h1>
        <span class="pp_city" id="pp_city">${user.city}, ${user.country}</span>
        <span class="pp_tagline" id="pp_tagline">${user.tagline}</span>
        <ul class="pp_tags" id="pp_tags">
       ${generateTags(user.tags)} 
        </ul>
      </div>
      ${button()} 
      <img src="Photos/Photographers/${user.portrait}" alt="" class="pp_portrait" />`
    } else {
        return ` `
    }
};



// ============ MEDIAS PHOTOGRAPHERS =========================        <button class="pp_contact"></button> https://jsfiddle.net/xqhm8c56/2/



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
          mesImages = usermedia.video.replaceAll('_', ' ');
      newNomImage = mesImages.substr(0, mesImages.length - 4);
      console.log(mesImages);
            return `
              
                
                  <article class="pp_media">
                    <a href="#" title="">
                      <video class="pp_media_video" role="button">
                        ""
                        <source src="Photos/videos/${usermedia.video}" />
                      </video>
                    </a>
                    <div class="pp_media_infos">
                    <h2 class="media_infos-title">${newNomImage}</h2>
                      <span class="media_infos-price">${usermedia.price} €</span>
                      <span class="media_infos-like" id="">${usermedia.likes} <span class="fas fa-heart" role="button"></span></span>
                    </div>
                  </article>
                
              `
        } else if (usermedia.image) {
            mesImages = usermedia.image.replaceAll('_', ' ');
            newNomImage = mesImages.substr(0, mesImages.length - 4);
            console.log(mesImages);
            return `
              
                
                  <article class="pp_media">
                    <a href="#" title="">
                      <img src="Photos/images/${usermedia.image}" alt="" role="button" />
                    </a>
                    <div class="pp_media_infos">
                    <h2 class="media_infos-title">${newNomImage}</h2>
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

// DOM Elements
const btnSort = document.querySelectorAll(".sort-btn");
const OpenSort = document.querySelector(".sort-list");


// LANCER MODAL ========================================================================

// launch modal event
btnSort.forEach((btn) => btn.addEventListener("click", launchModal));

function launchModal() {
  OpenSort.style.display= "block";

}


const theme = document.querySelectorAll('.test')

theme.forEach((item) =>
  item.addEventListener("click", (e) => {
    console.log('yes');
    
    switch (e.target.id) {
      case "sort-1": OpenSort.style.display= "none";
       
        break;
      case "sort-2":
        OpenSort.style.display= "none";
        break;
      case "sort-3":
        OpenSort.style.display= "none";
        break;
      default:
        null;
    }
  })
);
 

fetch("json/profil.json")
    .then((response) => response.json())
    .then((json) => showMedia(json));



