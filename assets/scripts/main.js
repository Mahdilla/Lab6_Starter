// main.js

// Run the init() function when the page has loaded
window.addEventListener("DOMContentLoaded", init);

// Starts the program, all function calls trace back here
function init() {
	let recipes = getRecipesFromStorage();
	addRecipesToDocument(recipes);
	initFormHandler();
}

function getRecipesFromStorage() {
	return JSON.parse(localStorage.getItem('recipes')) || [];
}

function addRecipesToDocument(recipes) {
	const main = document.querySelector('main');
	recipes.forEach(recipe => {
		const recipeCard = document.createElement('recipe-card');
		recipeCard.data = recipe;
		main.appendChild(recipeCard);
	});
}

function saveRecipesToStorage(recipes) {
	// B1. Save the stringified recipes array to localStorage
	localStorage.setItem('recipes', JSON.stringify(recipes));
}

function initFormHandler() {
	// B2. Get a reference to the <form> element
	const form = document.querySelector('form');

	// B3. Add a submit event listener to the form
	form.addEventListener('submit', (event) => {
		event.preventDefault(); // prevent default form submission behavior

		// B4. Create a FormData object from the form
		const formData = new FormData(form);

		// B5. Create an object from the FormData entries
		let recipeObject = {};
		for (const [key, value] of formData.entries()) {
			recipeObject[key] = value;
		}

		// B6. Create a new <recipe-card> element
		const recipeCard = document.createElement('recipe-card');

		// B7. Set the .data property of <recipe-card>
		recipeCard.data = recipeObject;

		// B8. Append the <recipe-card> to <main>
		const main = document.querySelector('main');
		main.appendChild(recipeCard);

		// B9. Update localStorage with new recipe
		let recipes = getRecipesFromStorage();
		recipes.push(recipeObject);
		saveRecipesToStorage(recipes);

		// Optional: Reset form after submission
		form.reset();
	});

	// B10. Get a reference to the "Clear Local Storage" button
	const clearButton = document.querySelector('button[type="button"]');

	// B11. Add a click event listener to the button
	clearButton.addEventListener('click', () => {
		// B12. Clear local storage
		localStorage.clear();

		// B13. Delete contents of <main>
		const main = document.querySelector('main');
		main.innerHTML = '';
	});
}
