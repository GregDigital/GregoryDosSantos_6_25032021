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
      const container = this.element.querySelector(
        ".lightbox_modal_container_media_img"
      );
    container.innerHTML = ""
    image.onload = () => { 

    container.appendChild(image)
    
    this.url = url}
  
    image.src = url;
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
  <div class="lightbox_modal_container_media_img">  </div>
  <button type="button" class="lightbox-close" id="lightbox-close" title="Close dialog"><span class="fas fa-times" aria-hidden="true"></span>
  </button>
      <button type="button" class="align lightbox-left" id="lightbox-previous" title="Previous image"><span class="fas fa-chevron-left" aria-hidden="true"></span></button>
      <button type="button" class="align lightbox-right" id="lightbox-next" title="Next image"><span class="fas fa-chevron-right" aria-hidden="true"></span></button>
      <h3 class="lightbox-media-title">${newNomImage}</h3>
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