class ShoppingCart extends HTMLElement {
    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = `
        <h2 class="section-title">My Shopping List</h2>
        <hr class="section-divider">
        <div class="shopping-list">
        </div>
        `;
    }
}

customElements.define("shopping-cart", ShoppingCart);