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
      }" alt="" class="pp_portrait" />

      <div class="form_modal">


      <div class="form_modal_content">

        <form class="form_contact" action="" method="GET">

          <div class="form_title_photographer">
            <h1 id="form_title">
              <span>Contactez-moi</span>
              <span class="form_name" id="form_name">${user.name}</span>
            </h1>
            <button type="button" class="form_close" id="form_close" title="Close form"><span class="fas fa-times"
                aria-hidden="true"></span>
            </button>
          </div>

          <label for="firstname">Prénom :</label>
          <input type="text" id="firstname" name="user_firstname">



          <label for="lastname">Nom :</label>
          <input type="text" id="last" name="user_lastname">



          <label for="mail">e-mail :</label>
          <input type="email" id="mail" name="user_mail">


          <label for="subject">Message :</label>
          <textarea cols="20" rows="5" id="subject" name="user_message"></textarea>

          <input type="submit" value="Envoyer" class="form_submit_btn" title="Send" id="form_submit_btn">

        </form>


      </div>

    </div> `;
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
  generateTotalLikes();
  sortMedias ()
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
      //console.log(parent.dataset);

      let media = medias.filter(
        (element) => element.id == parent.dataset.id
      )[0];

      // console.log(media);
      if (liked == true) {
        media.likes -= 1;
        liked = false;
      } else {
        media.likes += 1;
        liked = true;
      }

      parent.querySelector(".media_like_count").innerHTML = media.likes;
      generateTotalLikes();
    });
  });
}

function generateTotalLikes() {
  let spanLikes = document.querySelectorAll(".media_like_count");
  let arrayCountLikes = [];
  for (i = 0; i < spanLikes.length; i++) {
    let totalLike = spanLikes[i].innerHTML;
    let convertString = parseInt(totalLike);
    arrayCountLikes.push(convertString);
  }

  let total = arrayCountLikes.reduce((acc, cur) => acc + cur);
  document.querySelector(
    ".pp_infos_data"
  ).innerHTML = `<span id="total-likes">${total}  <i class="fas fa-heart" aria-label="likes"></i></span>
  <span> € / jour</span>`;
}

// ============================= TRIER =============================================

function sortMedias () {
let theme = document.querySelectorAll(".sort-btn");
let openSort = document.querySelector("#sort-list");
let popularite = document.querySelector("#sort-1");
theme.forEach((item) =>
  item.addEventListener("click", (e) => {
    openSort.style.display = "block";
    popularite == false;
   if (popularite == true) {
     console.log("coucou")
   }
   else{
    console.log("hello")
   }
  })
);
}



fetch("json/profil.json")
  .then((response) => response.json())
  .then((json) => showMedia(json));
