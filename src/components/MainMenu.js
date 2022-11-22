import { getIngredientsList } from "../services/cocktails.js";

const MainMenu = {
  template: `
  <div class="menu">
    <section>
      <aside>
        <h4>🎲Cocktail au hasard!</h4>
        <button @click="$emit('getRandomCocktail')"  >🎲🎲</button>
        <button @click="$emit('getNonAlcoholicCocktail')" >Uniquement sans alcool</button>
      </aside>

      <form @submit.prevent="$emit('getCocktailsByIngredient', this.selectedIngredient)">
        <h4>🍹Trouver un cocktail à base de :</h4>
        <select name="ingredient" v-model="selectedIngredient" >
          <option v-for="ingredient in ingredientsList" :value=ingredient :key=ingredient >{{ ingredient }}</option>
        </select>
        <button >Rechercher</button>
      </form>

      <form @submit.prevent="$emit('getCocktailsByName', this.cocktailName)">
        <h4>🔎Rechercher un cocktail</h4>
        <input type="text" placeholder="Entrez un cocktail" v-model="cocktailName" >
        <button  >Rechercher</button>
      </form>
    </section>
  </div>`,
  methods: {
    async setIngredientsList() {
      this.ingredientsList = await getIngredientsList();
      this.ingredientsList = this.ingredientsList.sort();
    },
  },
  mounted() {
    this.setIngredientsList();
  },
  data() {
    return {
      ingredientsList: [],
      selectedIngredient: "",
      cocktailName: "",
    };
  }
};



export default MainMenu;
