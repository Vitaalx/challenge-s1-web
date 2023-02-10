let allHeading = document.querySelectorAll("h1, h2, h3, h4, h5, h6");
const attributeName = "text-overflow";
allHeading.forEach(el => {
    if (el.hasAttributes() && el.getAttribute(attributeName)) {
        let text = el.innerText;
        let sizeMax = el.getAttribute(attributeName);
        reformatTextWithEllipsis(text, el, sizeMax);
    }
})


// Permet de reformater le texte en rajoutant des points
function reformatTextWithEllipsis(text, element, sizeMax) {
    if (!checkTextLength(text, sizeMax)) {
        text = text.substring(0, sizeMax) + "...";
        updateText(text, element);
    }
}

// Permet de MAJ dans le dom de text
function updateText(text, element) {
    element.innerHTML = text;
}
// Permet de check la longueur du text (si < à sizeMax)
function checkTextLength(text, sizeMax) {
    return text.length <= sizeMax;
}

