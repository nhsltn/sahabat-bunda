import axios from "axios"; // Mengambil npm axios for better error handling and replace fetch

export default class Search {
    constructor(query) {
        this.query = query;
    }

    // Search data on API based on Query
    async getResults() {
        try {
            const res = await axios(`https://api.spoonacular.com/recipes/search?apiKey=5151ac7ee7ea4cc3b6d89a4e168f671f&query=${this.query}&number=100`);
            this.recipes = res.data.results;
            // console.log(this.recipes);
        } catch (error) {
            alert(error);
        }
    }
}