import "./js/components/headerApp";
import "./js/components/searchRes";
import "./js/components/recipe";
import "./js/components/shoppingCart";
import "./js/components/appFooter";
import "./css/styles.css";
import "./css/responsive.css";
import Search from "./js/models/Search";
import Recipe from "./js/models/Recipe";
import List from "./js/models/List";
import Likes from "./js/models/Likes";
import * as searchView from "./js/views/searchView";
import * as recipeView from "./js/views/recipeView";
import * as listView from "./js/views/listView";
import * as likesView from "./js/views/likesView";
import {
    elements,
    renderLoader,
    clearLoader
} from "./js/views/base";


const state = {}; // Global State of the app. search, recipe, shoppinglist, likes


/* Search Controller */
const ctrlSearch = async () => {
    // Get Query from the view
    const query = searchView.getInput();

    if (query) {

        // New Search Object and add to state
        state.search = new Search(query);

        // Prepare UI for results
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchTitle);

        try {
            // Search for recipe
            await state.search.getResults();

            // Render results on UI
            clearLoader();
            searchView.renderResults(state.search.recipes);

        } catch (error) {
            console.log(error);

            alert("Something wrong with the search...");
        }
    }

};

// Action when search input is entered
elements.searchForm.addEventListener("submit", event => {
    event.preventDefault();
    document.getElementsByClassName('results')[0].style.display = "block";
    ctrlSearch();
    if (state.search) {
        document.getElementsByClassName("searchnav")[0].style.display = "list-item";
        document.getElementsByClassName("footsearch")[0].style.display = "inline-block";
    }
});

// Pagination Setting in Search Results
elements.searchResPages.addEventListener("click", event => {
    const btn = event.target.closest(".btn-page");
    if (btn) {
        const goToPage = parseInt(btn.dataset.page, 10);
        searchView.clearResults();
        searchView.renderResults(state.search.recipes, goToPage);
    }
});

// Focus on Input Field when start button is clicked
elements.searchBtn.addEventListener("click", () => {
    document.getElementById("searchfield").focus();
});


/* Recipe Controller */
const ctrlRecipe = async () => {
    const id = window.location.hash.replace("#", "");

    if (id) {
        // Prepare UI for changes
        recipeView.clearRecipe();
        renderLoader(elements.recipeHeader);

        // Highlighted selected recipe item
        if (state.search) searchView.highlightSelected(id);

        // Create new recipe object
        state.recipe = new Recipe(id);
        if (state.recipe) {
            document.getElementsByClassName('recipe')[0].style.display = "block";
            document.getElementsByClassName('recipenav')[0].style.display = "list-item";
            document.getElementsByClassName("footrecipe")[0].style.display = "inline-block";
        }

        try {
            // Get recipe data
            await state.recipe.getRecipe();
            state.recipe.parseIngredients();

            // Render recipe
            clearLoader();
            recipeView.renderRecipe(state.recipe, state.likes.isLiked(id));

        } catch (error) {
            alert("Error Processing Recipe")
        }
    }
};

["hashchange", "load"].forEach(event => window.addEventListener(event, ctrlRecipe));


/* List Controller */
const ctrlList = () => {
    // Create list if there is none yet
    if (!state.list) state.list = new List();
    if (state.list) {
        document.getElementsByClassName('shopnav')[0].style.display = "list-item";
        document.getElementsByClassName("footshop")[0].style.display = "inline-block";

    }

    // Add Each ingredients to list and UI
    state.recipe.ingredients.forEach(el => {
        const item = state.list.addItem(el.count, el.unit, el.ingredient, el.img, el.id.toString());
        listView.renderItem(item);
    });


};

// Delete and Update in Shopping Cart Section
elements.shopping.addEventListener("click", event => {
    const id = event.target.closest(".shopping-item").dataset.itemid;

    // Handle the delete
    if (event.target.matches(".shopping-delete, .shopping-delete *")) {
        // Delete From the State
        state.list.deleteItem(id);
        // Delete From UI
        listView.deleteItem(id);
    } else if (event.target.matches(".shopping-count-value")) {
        const val = parseFloat(event.target.value, 10);
        state.list.updateCount(id, val);
    }
});


/* Like Controller */
const ctrlLike = () => {
    const recipeID = state.recipe.id
    if (!state.likes) state.likes = new Likes();

    // User has not liked current recipe
    if (!state.likes.isLiked(recipeID)) {
        // Add Like to the state
        const newLike = state.likes.addLike(
            recipeID,
            state.recipe.title,
            state.recipe.author,
            state.recipe.img
        );

        // Toggle the like button
        likesView.toggleLikeBtn(true);

        // Add Like to UI list
        likesView.renderLikes(newLike);


        // User has liked current recipe
    } else {
        // Remove the like from the state
        state.likes.deleteLike(recipeID);

        // Toggle the like button
        likesView.toggleLikeBtn(false);

        // Remove like to UI list
        likesView.deleteLike(recipeID);
    }
    likesView.toggleLikeMenu(state.likes.getNumLikes());
};

// Restore Like Recipe on page load
window.addEventListener("load", () => {
    state.likes = new Likes();

    // Restore item from localStorage
    state.likes.readStorage();

    // Toggle like nav
    likesView.toggleLikeMenu(state.likes.getNumLikes());


    // render item which we restore
    state.likes.likes.forEach(like => likesView.renderLikes(like));
});

// Button Event Listeners in Recipe Section
elements.recipeResults.addEventListener("click", event => {
    if (event.target.matches(".btn-dec, .btn-dec *")) {
        // Decrease Button Clicked
        if (state.recipe.servings > 1) {
            state.recipe.updateServings("dec");
            recipeView.UpdateServIng(state.recipe);
        }
    } else if (event.target.matches(".btn-inc, .btn-inc *")) {
        // Increase Button Clicked
        state.recipe.updateServings("inc");
        recipeView.UpdateServIng(state.recipe);
    } else if (event.target.matches(".shop-btn, .shop-btn *")) {
        // Add Ingredients to Shopping List
        document.getElementsByClassName('shopping-cart')[0].style.display = "flex";
        ctrlList();
    } else if (event.target.matches(".like-btn, .like-btn *")) {
        // Add Recipe to Like
        ctrlLike();
    }
});

// scroll to selected div without adding anything to url because it will messed up code
elements.navbar.addEventListener("click", event => {
    if (event.target.matches(".homenav, .homenav *")) {
        document.getElementById('home').scrollIntoView(true);
    } else if (event.target.matches(".searchnav, .searchnav *")) {
        document.getElementById('search').scrollIntoView(true);
    } else if (event.target.matches(".recipenav, .recipenav *")) {
        document.getElementById('recipe').scrollIntoView(true);
    } else if (event.target.matches(".shopnav, .shopnav *")) {
        document.getElementById('list').scrollIntoView(true);
    }
});
elements.footer.addEventListener("click", event => {
    if (event.target.matches(".foothome, .foothome *")) {
        document.getElementById('home').scrollIntoView(true);
    } else if (event.target.matches(".footsearch, .footsearch *")) {
        document.getElementById('search').scrollIntoView(true);
    } else if (event.target.matches(".footrecipe, .footrecipe *")) {
        document.getElementById('recipe').scrollIntoView(true);
    } else if (event.target.matches(".footshop, .footshop *")) {
        document.getElementById('list').scrollIntoView(true);
    }
});

// Sticky Navbar
const homeTop = elements.home.getBoundingClientRect().height;
const stickyNavigation = () => {
    if (window.scrollY >= homeTop) {
        elements.nav.classList.add("sticky-nav")
    } else {
        elements.nav.classList.remove("sticky-nav")
    }
}
window.addEventListener('scroll', stickyNavigation);