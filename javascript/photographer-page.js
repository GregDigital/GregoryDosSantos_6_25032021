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
  generateLightbox();
  sortMedias(response.media);
}
function generateMedia(usermedia) {
  if (usermedia.photographerId === idUrlNumb) {
    if (usermedia.video) {
      mesImages = usermedia.video.replaceAll("_", " ");
      newNomImage = mesImages.substr(0, mesImages.length - 4);

      return `
              
                
                  <article data-id="${usermedia.id}" class="pp_media">
                    <a href="Photos/videos/${usermedia.video}" title="">
                      <video class="pp_media_video" role="button">
                        ""
                        <source class="video" src="Photos/videos/${usermedia.video}" />
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
                    <a href="Photos/images/${usermedia.image}" title="">
                      <img class="img" src="Photos/images/${usermedia.image}" alt="" role="button" />
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
      sortPopularite();
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

function sortMedias() {
  let theme = document.querySelectorAll(".sort-btn");
  let openSort = document.querySelector("#sort-list");
  let popularite = document.getElementById("sort-1");
  let media = document.querySelectorAll(".pp_media");
  let date = document.getElementById("sort-2");
  let titre = document.getElementById("sort-3");

  theme.forEach((item) =>
    item.addEventListener("click", () => {
      openSort.style.display = "block";

      popularite.addEventListener("onclick", sortPopularite);

      function sortPopularite() {
        let spanLikes = document.querySelectorAll(".media_like_count");
        let arrayCountLikes = [];
        for (i = 0; i < spanLikes.length; i++) {
          let totalLike = spanLikes[i].innerHTML;
          let convertString = parseInt(totalLike);
          arrayCountLikes.push(convertString);
          let arraySort = arrayCountLikes.sort(function (b, a) {
            return b - a;
          });
          for (i = 0; i < media.length; i++) {
            let sortA = (i.innerHTML = arraySort);
            console.log(sortA);
          }
        }
      }
    })
  );
}

/*
function generateLightbox() {

const galleryMedia = document.querySelectorAll(".video, .img");
      previewModal = document.querySelector(".lightbox_modal");
      previewImg = document.querySelector("#current-media-lightbox")
      closeLightbox = document.querySelector('.lightbox-close')



  for (let i = 0; i < galleryMedia.length; i++) {
    let newIndex = i;
    galleryMedia[i].onclick = () =>{
      console.log( galleryMedia[i])
      function preview() {
        let selectedImg = galleryMedia[newIndex].src
        console.log(selectedImg)
        previewImg.setAttribute('src',selectedImg);


      }

       const prevBtn = document.querySelector(".lightbox-left");
       const nextBtn = document.querySelector(".lightbox-right");

       if (newIndex == 0) {
        prevBtn.style.display = "none" 
       }
       if (newIndex >= galleryMedia.length - 1) {
        nextBtn.style.display = "none"
       }

       prevBtn.onclick = () => {
         newIndex--;
         if (newIndex == 0) {
          preview();
           prevBtn.style.display = "none"
         }
          else {
            preview();
            nextBtn.style.display = "block"
          }
       }

       nextBtn.onclick = () => {
        newIndex++;
        if (newIndex >= galleryMedia.length - 1) {
         preview();
          nextBtn.style.display = "none"
        }
         else {
           preview();
           prevBtn.style.display = "block"
         }
      }

     
      preview()
      previewModal.classList.add("show")

      closeLightbox.onclick =() => {
        prevBtn.style.display = "block"
        nextBtn.style.display = "block"
        previewModal.classList.remove("show")

      }
     }


    }
    
  }

*/

function generateLightbox() {
  class Lightbox {
    static init() {
      const galleryMedia = Array.from(document.querySelectorAll(
        'a[href$=".jpg"], a[href$=".mp4"]'
      ));
      const gallery = galleryMedia.map(link => link.getAttribute('href'))
     
      galleryMedia.forEach((link) =>
        link.addEventListener("click", (e) => {
          e.preventDefault(e);
          new Lightbox(e.target.getAttribute("src"), gallery);
        }))
    }

    constructor(url, images) {
      this.element = this.buildDOM(url);
      this.images = images
      this.loadImage(url);
      document.body.appendChild(this.element);
    }

    loadImage(url) {
      this.url = null
      const image = new Image();
      image.src = url;
      
      const container = this.element.querySelector(
        ".lightbox_modal_container_media_img"
      );
    container.innerHTML = '' 
  image.onload = () => { 
    container.appendChild(image)
    this.url = url}
  

    }






    close(e) {
      e.preventDefault();
      this.element.classList.add("close");
      window.setTimeout(() => {
        this.element.parentElement.removeChild(this.element);
      }, 500);
    }

    prev(e) {

      e.preventDefault()
     
      let i = this.images.findIndex(image => image === this.url)
      if (i == 0) {
         i = this.images.lenght }
         this.loadImage(this.images[i - 1])
          }

    next(e){
e.preventDefault()
let i = this.images.findIndex(image => image=== this.url)
if (i === this.images.lenght - 1) {
   i = -1  }
   this.loadImage(this.images[i + 1])
    }




    buildDOM(url) {
      mesImages = url.toString().substring(14).replaceAll("_", " ");
      newNomImage = mesImages.substr(0, mesImages.length - 4);
      const dom = document.createElement("div");
      dom.classList.add("lightbox_modal");
      dom.innerHTML = `
                
      <div class="lightbox_modal_container">
  <div class="lightbox_modal_container_media">
  <div class="lightbox_modal_container_media_img">   </div>
  <button type="button" class="lightbox-close" id="lightbox-close" title="Close dialog"><span class="fas fa-times" aria-hidden="true"></span>
  </button>
      <button type="button" class="align lightbox-left" id="lightbox-previous" title="Previous image"><span class="fas fa-chevron-left" aria-hidden="true"></span></button>
      <button type="button" class="align lightbox-right" id="lightbox-next" title="Next image"><span class="fas fa-chevron-right" aria-hidden="true"></span></button>

      </div>
 
`;
dom.querySelector(".lightbox-close").addEventListener("click", this.close.bind(this));
dom.querySelector(".lightbox-left").addEventListener("click", this.prev.bind(this));
dom.querySelector(".lightbox-right").addEventListener("click", this.next.bind(this));
      return dom;
    }
    
  }

  Lightbox.init();
}



fetch("json/profil.json")
  .then((response) => response.json())
  .then((json) => showMedia(json));
