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
  const send = document.querySelector("#form_submit_btn");

  ppContact.addEventListener("click", contactModal);

  function contactModal() {
    formModal.style.display = "block";
  }
  closeContact.addEventListener("click", closeContactModal);
  function closeContactModal() {
    formModal.style.display = "none";
  }

  send.addEventListener("click", (e) => {
    e.preventDefault();
    formModal.style.display = "none";
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      //if esc key was not pressed in combination with ctrl or alt or shift
      const isNotCombinedKey = !(
        event.ctrlKey ||
        event.altKey ||
        event.shiftKey
      );
      if (isNotCombinedKey) {
        closeContactModal(event);
        console.log("Escape");
      }
    }
  });
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
          <a class="filter-tag" href="index.html?tag=${tag}" title="${tag}">#${tag}</a>
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

  sortMedias(response.media);
  //generateMedias();
  //showLightbox();
}
function generateMedia(usermedia) {
  if (usermedia.photographerId === idUrlNumb) {
    if (usermedia.video) {
      mesImages = usermedia.video.replaceAll("_", " ");
      newNomImage = mesImages.substr(0, mesImages.length - 4);

      return `
              
                
                  <article  data-title = "${newNomImage}" data-likes="${usermedia.likes}" data-date="${usermedia.date}"  data-id="${usermedia.id}" class="pp_media" tabindex="0">
                    <a data-title = "${newNomImage}" data-id="${usermedia.id}" onclick="generateLightbox(${usermedia.id})" class="pp_media_event" href="#" title="${newNomImage}" >
                      <video  class="pp_media_video" tabindex="0" role="button" >
                        ""
                        <source class="video" src="Photos/videos/${usermedia.video}" />
                      </video>
                    </a>
                    <div class="pp_media_infos">
                    <h2 class="media_infos-title">${newNomImage}</h2>
                      <span class="media_infos-price">${usermedia.price} €</span>
                      <span class="media_infos-like media_like_count" id="">${usermedia.likes}</span>
                      <span class="fas fa-heart like" role="button" tabindex="0"></span>
                    </div>
                  </article>
                
              `;
    } else if (usermedia.image) {
      mesImages = usermedia.image.replaceAll("_", " ");
      newNomImage = mesImages.substr(0, mesImages.length - 4);

      return `
              
                
                  <article  data-title = "${newNomImage}" data-likes="${usermedia.likes}" data-date="${usermedia.date}" data-id="${usermedia.id}" class="pp_media" tabindex="0">
                    <a onclick="generateLightbox(${usermedia.id})" data-title = "${newNomImage}" data-id="${usermedia.id}" class="pp_media_event" href="#" title="${newNomImage}" >
                      <img  class="img" src="Photos/images/${usermedia.image}" alt="${newNomImage}" role="button" />
                    </a>
                    <div class="pp_media_infos">
                    <h2 class="media_infos-title">${newNomImage}</h2>
                      <span class="media_infos-price">${usermedia.price} €</span>
                      <span class="media_infos-like media_like_count">${usermedia.likes}</span>
                      <span  class="fas fa-heart like" role="button" tabindex="0"></span>
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
      //sortPopularite();
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
  <span>  275 € / jour</span>`;
}

// ============================= TRIER =============================================

function sortMedias() {
  let theme = document.querySelectorAll(".sort-btn");
  let openSort = document.querySelector("#sort-list");
  let popularite = document.getElementById("sort-1");
  let date = document.getElementById("sort-2");
  let titre = document.getElementById("sort-3");

  theme.forEach((item) =>
    item.addEventListener("click", (e) => {
      openSort.style.display = "block";
    })
  );

  popularite.addEventListener("click", () => {
    let likesSort = document.querySelectorAll(".pp_media");

    let likeSort = Array.from(likesSort);
    let i = 0;
    likeSort
      .sort((a, b) =>
        parseInt(a.dataset.likes < parseInt(b.dataset.likes) ? 1 : -1)
      )
      .forEach((e) => {
        e.style.order = i;
        i++;
      });
    if (popularite) {
      document.querySelector(".sort-texte").innerText = "Popularité";
      openSort.style.display = "none";
    }
  });

  date.addEventListener("click", () => {
    let sortdate = document.querySelectorAll(".pp_media");
    let dateList = Array.from(sortdate);
    let i = 0;
    dateList
      .sort((a, b) => (a.dataset.date > b.dataset.date ? 1 : -1))
      .forEach((e) => {
        e.style.order = i;
        i++;
      });
    if (date) {
      document.querySelector(".sort-texte").innerText = "Date";
      openSort.style.display = "none";
    }
  });

  titre.addEventListener("click", () => {
    let sortTitre = document.querySelectorAll(".pp_media");
    let titreList = Array.from(sortTitre);
    let i = 0;
    titreList
      .sort((a, b) => (a.dataset.title > b.dataset.title ? 1 : -1))
      .forEach((e) => {
        e.style.order = i;
        i++;
      });
    if (titre) {
      document.querySelector(".sort-texte").innerText = "Titre";
      openSort.style.display = "none";
    }
  });
}

//========================= LIGHTBOX ================================================

function factory(raw_media) {
  switch (raw_media.type) {
    case "img":
      return new Image(raw_media.url, raw_media.id, raw_media.text);
    case "video":
      return new Video(raw_media.url, raw_media.id, raw_media.text);
  }
}

function generateLightbox(id) {
  console.log("generateLightbox", id);

  let galleryMedia = Array.from(document.querySelectorAll(".pp_media_event"))
    .map((article) => {
      let img = article.querySelector(".img[src$='.jpg']");
      let video = article.querySelector(".video[src$='.mp4']");

      article.addEventListener("click", () => {
        document.querySelector(".lightbox_modal").style.display = "block";
      });

      if (img !== null) {
        return {
          url: img.src,
          type: "img",
          text: article.dataset.title,
          id: article.dataset.id,
          order: parseInt(article.style.order),
        };
      }
      if (video !== null) {
        return {
          url: video.src,
          type: "video",
          id: article.dataset.id,
          text: article.dataset.title,
          order: parseInt(article.style.order),
        };
      }
    })
    .sort((a, b) => (a.order > b.order ? 1 : -1))
    .map(factory);

  let lightbox = new Lightbox(
    galleryMedia,
    ".lightbox_modal_container_media_img"
  );
  lightbox.goToId(id);
  lightbox.refresh();
  lightbox.text(id);

  document.querySelector(".lightbox-close").onclick = () => lightbox.close();
  document.querySelector(".lightbox-left").onclick = () =>
    lightbox.goPrevious();
  document.querySelector(".lightbox-right").onclick = () => lightbox.goNext();
}

class Media {
  getHTML() {
    throw "Not implemented";
  }
}

class Image extends Media {
  constructor(url, id, text) {
    super();
    this.url = url;
    this.id = id;
    this.text = text;
  }

  getHTML() {
    return `<img src="${this.url}"> 
    <h3 class="lightbox-media-title">${this.text}</h3>`;
  }
}

class Video extends Media {
  constructor(url, id, text) {
    super();
    this.url = url;
    this.id = id;
    this.text = text;
  }

  getHTML() {
    return `<video controls autoplay>
      <source src="${this.url}"
              type="video/mp4">
     
  </video>
  <h3 class="lightbox-media-title">${this.text}</h3>
  `;
  }
}

class Lightbox {
  constructor(slides, querySelector) {
    this.element = document.querySelector(".lightbox_modal");
    this.slideIndex = 0;
    this.slides = slides;
    this.onKeyUp = this.onKeyUp.bind(this);
    document.addEventListener("keyup", this.onKeyUp);
    this.selector = document.querySelector(querySelector);
  }

  close() {
    this.element.style.display = "none";
  }

  onKeyUp(event) {
    if (event.key === "Escape") {
      //if esc key was not pressed in combination with ctrl or alt or shift
      const isNotCombinedKey = !(
        event.ctrlKey ||
        event.altKey ||
        event.shiftKey
      );

      if (isNotCombinedKey) {
        this.close(event);
        console.log("Escape");
      }
    } else if (event.key === "ArrowLeft") {
      this.goPrevious(event);
    } else if (event.key === "ArrowRight") {
      this.goNext(event);
    }
  }

  goNext() {
    this.slideIndex += 1;
    if (this.slideIndex >= this.size()) this.slideIndex = 0;

    // Verif l'index n'est pas trop grand
    this.refresh();
  }

  goToId(id) {
    for (let i = 0; i < this.slides.length; i++) {
      if (this.slides[i].id == id) {
        this.slideIndex = i;
        return;
      }
    }
  }

  text(id) {
    for (let i = 0; i < this.slides.length; i++) {
      if (this.slides[i].id == id) {
        this.slideIndex = i;
        return;
      }
    }
  }

  goPrevious() {
    this.slideIndex -= 1;
    if (this.slideIndex < 0) this.slideIndex = this.size() - 1;
    this.refresh();
  }

  refresh() {
    console.log(this.slides);
    this.selector.innerHTML = this.slides[this.slideIndex].getHTML();

    // Affiche la bonne slide
  }

  size() {
    return this.slides.length;
  }
}

fetch("json/profil.json")
  .then((response) => response.json())
  .then((json) => showMedia(json));
