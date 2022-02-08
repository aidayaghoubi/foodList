const randomAPI = 'https://www.themealdb.com/api/json/v1/1/random.php';
const BASE_API = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
const SeaFoodAPI = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood';
const categoryOffer = document.querySelectorAll('.best-rated');
const seggestedItem = document.querySelectorAll('.seg-item');
const search = document.getElementById('serach-input');
const searchForm = document.getElementById('serach-box');
const userSearch = document.getElementById('serached-item');

//search food 

async function searchFood(name) {
    const res = await fetch(BASE_API + name);
    const response = await res.json();
    return response;
}



searchForm.addEventListener('submit', e => {

    e.preventDefault();
    userSearch.innerHTML = '';
    if (search.value) {
        const foodname = search.value;
        search.value = '';
        searchFood(foodname).then(response => {
            console.log(response);
            const { strMeal, strMealThumb, strInstructions, strCategory } = response.meals[0];
            userSearch.innerHTML = `
          <div class="card">
          <div>
              <img src='${strMealThumb}' ; class="food-image">
          </div>
          <div class="text-wrapper">
              <h2 class="foodName">${strMeal}</h2>
              <p class="categori">
               ${strCategory}
               </p>
               <p class="instruc">${strInstructions}</p>

          </div>
      </div>
          `
        })
    }
});




//random offerfood
for (let i = 0; i <= seggestedItem.length; i++) {

    async function randomfood() {
        const res = await fetch(randomAPI);
        const response = await res.json();
        return response;
    }
    randomfood().then(response => {
        console.log(response)
        const { strMeal, strMealThumb } = response.meals[0];
        seggestedItem[i].innerHTML = `
        <img src="${strMealThumb}" alt=""
        class="seg-pic-item">
    <p class="food-title">${strMeal}</p>
        `
    });

}



//random seefood
async function seafood() {
    const res = await fetch(SeaFoodAPI);
    const response = await res.json();
    return response;
}

for (let i = 0; i < 3; i++) {
    seafood().then(response => {
        const rnd=Math.floor(Math.random(0,1)*25)
        const { strMealThumb, strMeal } = response.meals[rnd];
        categoryOffer[i].innerHTML = `
        <img src='${strMealThumb}' alt="">
                    <div class="offer-food-title">
                        <p>${strMeal}</p>
                    </div> 

        `;

    });
}
