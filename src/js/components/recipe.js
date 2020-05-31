class Recipe extends HTMLElement {
    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = `
        <div class="recipetop">
            <h2>Recipe Details</h2>
            <hr class="section-divider">
        </div>
        <div class="recipe-result">
        </div>
        `;
    }
}

customElements.define("recipe-res", Recipe);