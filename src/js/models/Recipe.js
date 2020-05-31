import axios from "axios";

export default class Recipe {
    constructor(id) {
        this.id = id;
    };

    // Get Recipe from API
    async getRecipe() {
        try {
            const res = await axios(`https://api.spoonacular.com/recipes/${this.id}/information?apiKey=5151ac7ee7ea4cc3b6d89a4e168f671f&includeNutrition=false.`);
            this.title = res.data.title;
            this.author = res.data.sourceName;
            this.img = res.data.image;
            this.url = res.data.sourceUrl;
            this.ingredients = res.data.extendedIngredients;
            this.time = res.data.readyInMinutes;
            this.servings = res.data.servings;
            this.dishTypes = res.data.dishTypes.join(", ");


        } catch (error) {
            console.log(error);
            alert('Something went wrong :(');
        }

    }

    // Parse Ingredients from extended ingredients from API
    parseIngredients() {
        const newIngredients = this.ingredients.map(el => {
            let ingredients = {
                count: el.measures.us.amount,
                unit: el.measures.us.unitShort,
                ingredient: el.name,
                img: el.image,
                id: el.id

            }
            return ingredients;
        });
        this.ingredients = newIngredients;
    }

    // Update Servings ingredient if add or minus button clicked
    updateServings(type) {
        // Servings
        const newServings = type === "dec" ? this.servings - 1 : this.servings + 1;

        // Ingredients
        this.ingredients.forEach(ing => {
            ing.count *= (newServings / this.servings);
        });

        this.servings = newServings
    }
}