const BASE = 'https://www.thecocktaildb.com/api/json/v1/1/';

const getData = async (url) => {
  const apiCall = await fetch(`${BASE}${url}`,{
    method: "GET",
  })
  return await apiCall.json();
};

export const getCocktailById = async (cocktailId) => {
  const drink = await getData(`lookup.php?i=${cocktailId}`);
  return drink.drinks[0];
};

export const getNonAlcoholic = async () => {
  const drinks = await getData('filter.php?a=Non_Alcoholic');
  return drinks.drinks;
};

export const getCocktailsListByIngredient = async (ingredient) => {
  var idList = [];

  const drinks = await getData(`filter.php?i=${ingredient}`);
  drinks.drinks.forEach(cocktails => {
    idList.push(cocktails.idDrink);
  });

  return idList;
};

export const getRandomCocktail = async () => {
  var list = [];

  const drinks = await getData('random.php');
  list.push(drinks.drinks[0])

  return list;
};

export const getIngredientsList = async () => {
  var list = [];

  const ingredients = await getData('list.php?i=list');
  ingredients.drinks.forEach(ingredient => {
    list.push(ingredient.strIngredient1)
  });

  return list;
};

export const getCocktailsByName = async (name) => {
  var list = [];

  const drinks = await getData(`search.php?s=${name}`);
  if (drinks.drinks != null) {
    drinks.drinks.forEach(cocktails => {
      list.push(cocktails);
    });
  } else {
    list = {
      error: true,
      message: `Pas de résultats pour "${name}".`
    };
  }

  return list;
}

export default getRandomCocktail;
