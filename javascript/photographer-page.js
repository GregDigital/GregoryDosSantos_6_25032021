let content = document.querySelector("#pp_galery_medias");
let container = document.querySelector(".pp_header");
let idUrl = window.location.search.substr(4);
let idUrlNumb = parseInt(idUrl, 10);
let btnLike = document.querySelectorAll(".fas.fa-heart");

// ============ HEADER PHOTOGRAPHER INFOS =========================

function initEvents() {
  const ppContact = document.querySelector(".pp_contact");
  const formModal = document.querySelector(".form_modal");
  const closeContact = document.querySelector(".form_close");

  ppContact.addEventListener("click", contactModal);

  function contactModal() {
    console.log("yes");
    formModal.style.display = "block";
  }
  closeContact.addEventListener("click", closeContactModal);
  function closeContactModal() {
    formModal.style.display = "none";
  }
}

function show(response) {
  let acc = [];
  for (let photographer of response.photographers) {
    acc.push(generatePhotographer(photographer));
  }
  let html = acc.reduce((a, l) => a + l);
  container.innerHTML = html;
  initEvents();
}
fetch("json/profil.json")
  .then((response) => response.json())
  .then((json) => show(json));

function generateTags(tags) {
  let acc = [];
  for (let tag of tags) {
    acc.push(`<li>
          <a class="filter-tag" href="index.html?tag=portrait" title="portrait">#${tag}</a>
        </li>`);
  }
  let html = acc.reduce((a, l) => a + l);
  return html;
}

//==============================================================

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
      <button class="pp_contact">contactez-moi</button>

      <img src="Photos/Photographers/${
        user.portrait
      }" alt="" class="pp_portrait" />`;
  } else {
    return ` `;
  }
}

// ============ MEDIAS PHOTOGRAPHERS =========================

function showMedia(response) {
  let acc = [];
  for (let medias of response.media) {
    acc.push(generateMedia(medias));
  }
  let html = acc.reduce((a, l) => a + l);
  content.innerHTML = html;
  bindLikeButton(response.media);
  totalLikes(response.media.likes)

}
function generateMedia(usermedia) {
  if (usermedia.photographerId === idUrlNumb) {
    if (usermedia.video) {
      mesImages = usermedia.video.replaceAll("_", " ");
      newNomImage = mesImages.substr(0, mesImages.length - 4);

      return `
              
                
                  <article data-id="${usermedia.id}" class="pp_media">
                    <a href="#" title="">
                      <video class="pp_media_video" role="button">
                        ""
                        <source src="Photos/videos/${usermedia.video}" />
                      </video>
                    </a>
                    <div class="pp_media_infos">
                    <h2 class="media_infos-title">${newNomImage}</h2>
                      <span class="media_infos-price">${usermedia.price} €</span>
                      <span class="media_infos-like media_like_count" id="">${usermedia.likes}</span>
                      <span class="fas fa-heart like" role="button"></span>
                    </div>
                  </article>
                
              `;
    } else if (usermedia.image) {
      mesImages = usermedia.image.replaceAll("_", " ");
      newNomImage = mesImages.substr(0, mesImages.length - 4);

      return `
              
                
                  <article data-id="${usermedia.id}" class="pp_media">
                    <a href="#" title="">
                      <img src="Photos/images/${usermedia.image}" alt="" role="button" />
                    </a>
                    <div class="pp_media_infos">
                    <h2 class="media_infos-title">${newNomImage}</h2>
                      <span class="media_infos-price">${usermedia.price} €</span>
                      <span class="media_infos-like media_like_count">${usermedia.likes}</span>
                      <span  class="fas fa-heart like" role="button"></span>
                    </div>
                  </article>

                  
               
              `;
    }
  } else {
    return ` `;
  }
}

// ========================= LIKES ==========================================
function bindLikeButton(medias) {
  let selectHeart = document.querySelectorAll(".like");
 
  selectHeart.forEach((heart) => {
    let liked = false;
    heart.addEventListener("click", (e) => {
     let parent = e.srcElement.parentNode.parentNode;
     console.log(parent.dataset)
     
     let media = medias.filter(element => element.id == parent.dataset.id)[0]
     console.log(media)
     if (liked == true) {
       media.likes-=1
       liked = false
     } 
     else {
       media.likes+=1
       liked = true
     }
     parent.querySelector(".media_like_count").innerHTML = media.likes
    
    });
   
  });
 
}

function totalLikes() {

  let spanLikes = document.querySelectorAll(".media_like_count");
  let arrayCountLikes = [];
  for (i = 0; i < spanLikes.length; i++) {
   let totalLike = spanLikes[i].innerHTML;
   let convertString = parseInt(totalLike);
   arrayCountLikes.push(convertString)

 }
 let total = arrayCountLikes.reduce((acc, cur) => acc + cur);
  console.log(total)

}













// ============================= TRIER =============================================

let theme = document.querySelectorAll(".sort-btn");
let openSort = document.querySelector("#sort-list")


theme.forEach((item) =>
  item.addEventListener("click", (e) => {
    openSort.style.display ="block";
    switch (e.target.id) {
      case "sort-1":
       openSort.style.display = "none";
        break;
      case "sort-2":
        openSort.style.display = "none";
        break;
      case "sort-3":
        openSort.style.display = "none";
        break;
      default:
        null;
    }
  })
);

fetch("json/profil.json")
  .then((response) => response.json())
  .then((json) => showMedia(json));
