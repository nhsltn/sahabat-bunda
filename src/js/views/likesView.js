import {
    elements
} from "./base";
import {
    limitTitle
} from "./searchView"

// Like Button Toggle
export const toggleLikeBtn = isLiked => {
    if (isLiked) {
        document.getElementById("isliked").classList.toggle('far');
        document.getElementById("isliked").classList.toggle('fas');
    } else {
        document.getElementById("isliked").classList.toggle('fas');
        document.getElementById("isliked").classList.toggle('far');
    }
};

// Like Menu Toggle
export const toggleLikeMenu = numLikes => {
    elements.likesMenu.style.display = numLikes > 0 ? 'list-item' : 'none';
};

// Render Like List to UI
export const renderLikes = likes => {
    const injectHTML = `
    <li>
        <a class="likes-link" href="#${likes.id}">
            <figure class="likes-fig">
                <img src="https://spoonacular.com/recipeImages/${likes.id}-90x90.jpg"
                class="img-likes" alt="${likes.title}">
            </figure>
            <div class="likes-data">
                <h4 class="likes-name">${limitTitle(likes.title, 15)}</h4>
                <p class="likes-author">${limitTitle(likes.author, 15)}</p>
            </div>
        </a>
    </li>
    `;
    elements.likesList.insertAdjacentHTML("beforeend", injectHTML)
};

// Remove like if love button clicked
export const deleteLike = id => {
    const el = document.querySelector(`.likes-link[href*="${id}"]`).parentElement;
    if (el) el.parentElement.removeChild(el);
}