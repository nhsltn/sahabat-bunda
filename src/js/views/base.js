export const elements = {
    home: document.getElementById("home"),
    nav: document.getElementById("navbar"),
    navbar: document.querySelector(".navbar-collapse"),
    searchForm: document.querySelector(".search"),
    searchInput: document.querySelector(".search-field"),
    searchBtn: document.querySelector(".start-btn"),
    searchRes: document.querySelector(".results"),
    searchTitle: document.querySelector(".search-results"),
    searchResList: document.querySelector(".results-list"),
    searchResPages: document.querySelector(".results-pages"),
    recipeHeader: document.querySelector(".recipetop"),
    recipeResults: document.querySelector(".recipe-result"),
    shopping: document.querySelector(".shopping-list"),
    likesMenu: document.querySelector('.dropdown'),
    likesList: document.querySelector(".likes-list"),
    footer: document.querySelector(".footer-section")
}

export const elementStrings = {
    loader: "loader",
}

export const renderLoader = parent => {
    const loader = `
        <div class="${elementStrings.loader} ">
            <i class="fas fa-redo-alt fa-5x"></i>
        </div>
    `;
    parent.insertAdjacentHTML("beforeend", loader);
}

export const clearLoader = () => {
    const loader = document.querySelector(`.${elementStrings.loader}`);
    if (loader) loader.parentElement.removeChild(loader);
}