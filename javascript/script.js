//============================================ PAGE ACCUEIL

let container = document.querySelector("#photographers");


function initFilters() {


    //selecting all required elements
    const filterItem = document.querySelectorAll(".tags");
    const filterImg = document.querySelectorAll(".photographers_card");

   
      filterItem.onclick = (selectedItem)=>{ //if user click on filterItem div
        if(selectedItem.target.classList.contains("tags")){ //if user selected item has .item class
          filterItem.querySelector(".active").classList.remove("active"); //remove the active class which is in first item
          selectedItem.target.classList.add("active"); //add that active class on user selected item
          let filterName = selectedItem.target.getAttribute("data-filter"); //getting data-name value of user selected item and store in a filtername variable
          filterImg.forEach((image) => {
            let filterImges = image.getAttribute("data-filter"); //getting image data-name value
            //if user selected item data-name value is equal to images data-name value
            //or user selected item data-name value is equal to "all"
            if(filterImges == filterName){
              image.classList.remove("hide"); //first remove the hide class from the image
              image.classList.add("show"); //add show class in image
            }else{
              image.classList.add("hide"); //add hide class in image
              image.classList.remove("show"); //remove show class from the image
            }
          });
        }
      }

    
     

}

function generatePhotographerTags(tags) {
    let acc = [];
    for (let tag of tags) {
        acc.push(`<li class="filter">#${tag}</li>`)
    }
    let html = acc.reduce((a, l) => a + l);
    return html
    
}

function generatePhotographer(user) {

    console.log(user.id);
    return `
    <article class="photographers_card" data-filter="${user.tags}">
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
    initFilters(response.photographers)
}
fetch("json/profil.json")
    .then((response) => response.json())
    .then((json) => show(json));