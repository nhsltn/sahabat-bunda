import {
    elements
} from "./base";

// Get input value to used on search
export const getInput = () => elements.searchInput.value;

// Clear input after input value recorded
export const clearInput = () => {
    elements.searchInput.value = "";
}

// Clear results after next search called
export const clearResults = () => {
    elements.searchResList.innerHTML = "";
    elements.searchResPages.innerHTML = "";
}

// Selected Recipe became highlighted
export const highlightSelected = id => {
    const resultsArray = Array.from(document.querySelectorAll(".results-link"));
    resultsArray.forEach(el => {
        el.classList.remove("results-link-active")
    })

    document.querySelector(`.results-link[href*="${id}"]`).classList.add("results-link-active")
};

// Limit Title on card
export const limitTitle = (title, limit = 26) => {
    const newTitle = [];
    if (title.length > limit) {
        title.split(" ").reduce((acc, cur) => {
            if (acc + cur.length <= limit) {
                newTitle.push(cur);
            }
            return acc + cur.length
        }, 0);

        // return the result
        return `${newTitle.join(" ")}...`;
    }
    return title;

};

// Render Search Results to UI
const renderRecipe = recipe => {
    const injectHTML = `
    <li class="card">
        <a class="results-link card-style" href="#${recipe.id}">
            <img src="https://spoonacular.com/recipeImages/${recipe.id}-480x360.jpg " alt="${recipe.title}" class="card-img-top">
            <div class="results-data card-body">
            <h4 class="results-name card-title">${limitTitle(recipe.title)}</h4>
            </div>
        </a>
    </li>
    `;
    elements.searchResList.insertAdjacentHTML("beforeend", injectHTML);
}

// Create Button Paggination to be rendered
const createButton = (page, type) => `
    <button class="btn-page results-btn-${type}" data-page=${type === "prev" ? page -1 : page + 1}>
        <span>Page ${type === "prev" ? page -1 : page + 1}</span>
        <i class="fas fa-chevron-${type === "prev" ? "left" : "right"}"></i>
    </button>
`;

// Render pagination to UI
const renderButtons = (page, numOfRes, resPerPage) => {
    const pages = Math.ceil(numOfRes / resPerPage);

    let button;
    if (page === 1 && pages > 1) {
        // Button go to the next page
        button = createButton(page, "next");
    } else if (page < pages) {
        // Both Button Displayed
        button = `
            ${createButton(page, "prev")}
            ${createButton(page, "next")}
        `;
    } else if (page === pages && pages > 1) {
        // Button go to the Previous page
        button = createButton(page, "prev");
    } else if (numOfRes < 10) {
        button = "";
    }
    elements.searchResPages.insertAdjacentHTML("afterbegin", button);

};

// Create funtion to limit render results 10 perpage
export const renderResults = (recipes, page = 1, resPerPage = 10) => {
    // render results of current page
    const start = (page - 1) * resPerPage;
    const end = page * resPerPage;

    recipes.slice(start, end).forEach(renderRecipe);
    // render pagination
    renderButtons(page, recipes.length, resPerPage)

}