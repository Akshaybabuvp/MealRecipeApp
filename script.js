const inputButton = document.getElementById('input-button');
const mealList = document.getElementById('meal');
const mealDetails = document.querySelector('.meal-details');
const getmealList = () => {
  let inputBox = document.getElementById('input-box').value.trim();
  console.log(inputBox);
  if (inputBox === '') {
    alert('You can Search the meal🍴');
    return;
  }
  fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${inputBox}`)
    .then((res) => res.json())
    .then((data) => {
      let html = '';

      if (data.meals) {
        data.meals.forEach((meal) => {
          html += `
        
           <div class="meal-result" data-id = "${meal.idMeal}">
              <div class="meal-img">
                <img src="${meal.strMealThumb}" alt="" />
              </div>
              <div class="meal-name">
                <h2>${meal.strMeal}</h2>
                <a href="#" class="recipe-btn">Recipe</a>
              </div>
            </div>                
        `;
        });
      } else {
        html = alert('Does not match the meal');
        return;
      }
      mealList.innerHTML = html;
    })
    .catch((err) => {
      console.log('Error', err);
    });
  document.getElementById('input-box').value = '';
};

const getRecipe = (e) => {
  e.preventDefault();
  let mealistItem = e.target.parentElement.parentElement;
  if (e.target.className === 'recipe-btn') {
    fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealistItem.dataset.id}`
    )
      .then((res) => res.json())
      .then((data) => createRecipe(data.meals));
  }
};

const createRecipe = (meal) => {
  meal = meal[0];
  let html = ` 
          <i class="fa-solid fa-circle-xmark"></i>
          <h2 class="category-name">${meal.strMeal}</h2>
          <p>${meal.strCategory}</p>
           <div class="instructions">
            <h3>recipe:</h3>
            <p class="recipe-insruct">
             ${meal.strInstructions}
            </p>
            <div class="recipe-image">
              <img src="${meal.strMealThumb}" alt="" />
            </div>
            <a href="${meal.strYoutube}"target="_blank" class="recipe-link">Watch video</a>
          </div>
  `;
  mealDetails.innerHTML = html;
  mealDetails.classList.add('meal-details-show');
};

// Listeners
inputButton.addEventListener('click', getmealList);
mealList.addEventListener('click', getRecipe);
mealDetails.addEventListener('click', (e) => {
  e.preventDefault();
  if (e.target.tagName === 'I') {
    mealDetails.classList.remove('meal-details-show');
  }
});

// Event listener for Enter key press
document.getElementById('input-box').addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    getmealList(); // Call the function
    e.preventDefault();
  }
});
