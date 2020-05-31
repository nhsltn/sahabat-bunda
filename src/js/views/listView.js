import {
    elements
} from './base';

// Render Ingredients to Shopping Cart Section
export const renderItem = item => {
    const injectHTML = `
    <li class="shopping-item" data-itemid=${item.id}>
        <p class="shopping-description">${item.ingredient}</p>
        <div class="img-ing">
            <img src="https://spoonacular.com/cdn/ingredients_100x100/${item.img}" alt="">
        </div>
        <div class="shopping-count">
            <input type="number" value="${item.count}" step="${item.count}" class="shopping-count-value">
            <p>${item.unit}</p>
        </div>
        <button class="shopping-delete btn-tiny">
            <i class="fas fa-trash-alt"></i>
        </button>
    </li>
    `;
    elements.shopping.insertAdjacentHTML('beforeend', injectHTML);
};

// Delete ingredients from UI
export const deleteItem = id => {
    const item = document.querySelector(`[data-itemid="${id}"]`);
    item.parentElement.removeChild(item);
};