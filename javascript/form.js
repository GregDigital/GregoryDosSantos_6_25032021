const containerForm = document.querySelector(".form_modal");
let Url = window.location.search.substr(4);
let UrlNumb = parseInt(idUrl, 10);

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
      formModal.style.display = "none";}}



function generateForm(form) {

    if (form.photographerId === idUrlNumb) {
    return `
    
    <div class="form_modal_content">

    <form class="form_contact" action="" method="GET">

      <div class="form_title_photographer">
        <h1 id="form_title">
          <span>Contactez-moi</span>
          <span class="form_name" id="form_name">${form.name}</span>
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
</div>`
} else {return ``}

}



function showForm(repform) {
    let acc = [];
    for (let form of repform.media) {
        acc.push(generateForm(form));
    }
    let html = acc.reduce((a, l) => a + l);
    containerForm.innerHTML = html;


}
fetch("json/profil.json")
    .then((response) => response.json())
    .then((json) => showForm(json));