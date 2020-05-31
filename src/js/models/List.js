export default class List {
    constructor() {
        this.items = [];
    }

    // Add ingredients from recipe to shopping cart
    addItem(count, unit, ingredient, img, id) {
        const item = {
            count,
            unit,
            ingredient,
            img,
            id
        };
        this.items.push(item);
        return item;
    }

    // Delete selected ingredients from shopping list
    deleteItem(id) {
        const index = this.items.findIndex(el => el.id === id);
        this.items.splice(index, 1);
    }

    // Update count from input
    updateCount(id, newCount) {
        this.items.find(el => el.id === id).count = newCount;
    }
}