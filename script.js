const searchForm = document.querySelector('#search-form');
const searchInput = document.querySelector('#search-input');
const mealList = document.querySelector('#meal-list');

searchForm.addEventListener('submit', searchMeal);

async function searchMeal(e) {
  e.preventDefault();
  const searchTerm = searchInput.value;

  // Clear previous search results
  mealList.innerHTML = '';

  try {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`);
    const data = await response.json();

    if (data.meals === null) {
      // If no meals are found, display a message to the user
      const message = document.createElement('p');
      message.innerText = `No meals found for "${searchTerm}"`;
      mealList.appendChild(message);
    } else {
      // Loop through the meals and display each one
      data.meals.forEach(meal => {
        const mealCard = createMealCard(meal);
        mealList.appendChild(mealCard);
      });
    }
  } catch (err) {
    console.log(err);
  }
}

function createMealCard(meal) {
  const mealCard = document.createElement('div');
  mealCard.classList.add('col-md-6', 'col-lg-4', 'meal-card');
  mealCard.innerHTML = `
    <div class="card">
      <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
      <div class="card-body">
        <h5 class="card-title">${meal.strMeal}</h5>
        <p class="card-text">${meal.strInstructions.slice(0, 100)}...</p>
        <a href="${meal.strSource}" target="_blank">View Recipe</a>
      </div>
    </div>
  `;
  return mealCard;
}
