let cardTitleSmall = document.querySelector(".card-news.card-news--small .card-title");
let text = cardTitleSmall.innerText;
const sizeMax = 50;

// Permet de reformater le texte en rajoutant des points
function reformatTextWithEllipsis(text) {
    if (!checkTextLength(text)) {
        text = text.substring(0, sizeMax) + "...";
        updateText(text);
    }
}

// Permet de MAJ dans le dom de text
function updateText(text) {
    cardTitleSmall.innerHTML = text;
}
// Permet de check la longueur du text (si < à sizeMax)
function checkTextLength(text) {
    return text.length <= sizeMax;
}

// Appel de la fonction pour reformater le texte
reformatTextWithEllipsis(text);

