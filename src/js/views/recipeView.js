import {
    elements
} from "./base";
import {
    Fraction
} from "fractional";

// Create list of ingredients to be rendered
const createIngredients = ingredient => `
    <li class="recipe-item">
        <i class="far fa-check-circle"></i>
        <span class="recipe-count">${formatCount(parseFloat(ingredient.count.toFixed(2)))}</span>
        <span class="recipe-unit"> ${ingredient.unit} </span>
        <span class="recipe-ingredient"> ${ingredient.ingredient} </span>
    </li>
`;

// Clear Recipe before next recipe selected
export const clearRecipe = () => {
    elements.recipeResults.innerHTML = "";
}

// format count from decimals to per(/)
const formatCount = count => {
    if (count) {
        const [int, dec] = count.toString().split(".").map(el => parseInt(el, 10));

        if (!dec) return count;

        if (int === 0) {
            const fr = new Fraction(count);
            return `${fr.numerator}/${fr.denominator}`
        } else {
            const fr = new Fraction(count - int);
            return `${int} ${fr.numerator}/${fr.denominator}`
        }
    }
    return "?";
}

// Render Recipe selected from search result to UI
export const renderRecipe = (recipe, isLiked) => {
    const injectHTML = `
        <div class="recipe-header">
            <div class="recipe-title">
                <h4>${recipe.title}</h4>
                <h5>${recipe.author}</h5>
                <p>${recipe.dishTypes}</p>

                <div class="recipe-details">
                    <div class="recipe-info">
                        <i class="fas fa-hourglass-start recipe-icon"></i>
                        <span class="unit time-info">${recipe.time} Minutes</span>
                    </div>
                    <div class="recipe-info">
                        <i class="fas fa-user-friends recipe-icon"></i>
                        <span class="unit people-info">${recipe.servings} Servings</span>
                        <div class="recipe-serv-button">
                            <button class="btn-tiny btn-dec">
                                <i class="fas fa-minus-circle"></i>
                            </button>
                            <button class="btn-tiny btn-inc">
                                <i class="fas fa-plus-circle"></i>
                            </button>

                        </div>
                    </div>
                    <div class="recipe-info">
                        <i class="fas fa-carrot recipe-icon"></i>
                        <span class="unit ing-info">${recipe.ingredients.length} Ingredients</span>
                    </div>
                </div>
                <div class="love">
                    <button class="like-btn">
                        <i id="isliked" class="${isLiked ? 'fas' : 'far'} fa-heart"></i>
                    </button>
                </div>
            </div>
            <div class="recipe-image">
                <img src="${recipe.img}" alt="${recipe.title}">
            </div>
        </div>

        <hr class="recipe-divider">
        <div class="recipe-ingredients">

            <ul class="recipe-ingredients-list">

            ${recipe.ingredients.map(el => createIngredients(el)).join("")}

            </ul>

            <button class="btn-small shop-btn">
                <i class="fas fa-cart-plus"></i>
                <span>Add to shopping list</span>
            </button>
        </div>

        <hr class="recipe-divider">

        <div class="recipe-direction">
            <h4>How To Cook It</h4>
            <p>This recipe was carefully designed and tested by
                <span class="recipe-by">${recipe.author}</span>. <br> check out directions at their website.
            </p>
            <a target="_blank" class="direction-link jajal" href="${recipe.url}"><i
                    class="fas fa-directions"></i> How To Cook it</a>
        </div>
    `;
    elements.recipeResults.insertAdjacentHTML("beforeend", injectHTML);
};

// Render changes on ingredients on UI
export const UpdateServIng = recipe => {
    // Update Servings Info in UI
    document.querySelector(".people-info").textContent = `${recipe.servings} Servings`;

    // Update Ingredients Info in UI
    const countIng = Array.from(document.querySelectorAll(".recipe-count"));
    countIng.forEach((element, i) => {
        element.textContent = formatCount(parseFloat(recipe.ingredients[i].count.toFixed(2)));
    });
};

export const toggleRecipeMenu = (recipe) => {
    elements.likesMenu.style.display = recipe ? 'list-item' : 'none';
};