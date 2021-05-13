function generateLightbox() {

  class Lightbox {
  
  
    static init () {
      const galleryMedia = document.querySelectorAll('a[href$=".jpg"], a[href$=".mp4"]')
      galleryMedia.forEach(link => link.addEventListener('click', e => {
        e.preventDefault(e)
        console.log(e.target.getAttribute('href'))
      }))
  
    }
  
     constructor (url) {
        const element = this.buildDOM(url)
        document.body.appendChild(element)
        const show = this.buildDOM(url)
        document
       
     }
  
     buildDOM (url) {
       const dom = document.createElement('div')
       dom.classList.add('lightbox_modal')
       dom.innerHTML = `
       <div class="lightbox_modal_content">
       <div class="lightbox_modal_content-media">
         <div class="content_media_img">
           <img src="Photos/images/${url}"  id="current-media-lightbox">
           <h3 class="lightbox-media-title">Art Triangle Man</h3>
         </div>
         <button type="button" class="lightbox-close" id="lightbox-close" title="Close dialog"><span
             class="fas fa-times" aria-hidden="true"></span>
         </button>
         <button type="button" class="align lightbox-left" id="lightbox-previous" title="Previous image"><span
             class="fas fa-chevron-left" aria-hidden="true"></span>
         </button>
         <button type="button" class="align lightbox-right" id="lightbox-next" title="Next image"><span
             class="fas fa-chevron-right" aria-hidden="true"></span>
         </button>
       </div>
     </div>`
     return dom
     }
  
  }
  
  
  Lightbox.init()
  
  }
  