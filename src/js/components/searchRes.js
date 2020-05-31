class SearchRes extends HTMLElement {
    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = `
        <h3 class="search-results">Search Results</h3>
        <ul class="results-list">
        </ul>
        <div class="results-pages">
        </div>
        `;
    }
}

customElements.define("search-res", SearchRes);