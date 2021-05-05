class Lightbox {
	constructor(slides, querySelector) {
  	this.slideIndex = 0;
    this.slides = slides;
    this.selector = document.querySelector(querySelector)
  }
  
  goNext() {
    this.slideIndex += 1;
    if (this.slideIndex >= this.size())
      	this.slideIndex = 0;

    // Verif l'index n'est pas trop grand
    this.refresh();
  }
  
  goPrevious() {
    	this.slideIndex -= 1;
      if (this.slideIndex < 0)
      	this.slideIndex = this.size() - 1;
      this.refresh();
  }
  
  refresh() {
  	this.selector.innerHTML = this.slides[this.slideIndex];
  	// Affiche la bonne slide
  }
  
  size() {
  	return this.slides.length;
  }
}

let lightbox = new Lightbox(["Slide 1", "Slide 2", "Slide 3"], "#lightbox");

lightbox.refresh();

document.querySelector(".previous").onclick = () => lightbox.goPrevious();
document.querySelector(".next").onclick = () => lightbox.goNext();

//setInterval(() => lightbox.goNext(), 1000)