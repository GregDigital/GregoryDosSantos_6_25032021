


let content = document.querySelector("#photographer_page");






function generateMedia(usermedia) {
    
    return;

 

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
  .then((json) => showMedia(json));
