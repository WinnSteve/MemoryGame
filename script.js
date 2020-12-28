const gameContainer = document.getElementById('game');
let card1 = null; //first card
let card2 = null; // second card
let flippedCards = 0; //need a variable for flipped cards
let noClick = false; // need a click variable to halt the clicking when needed

const COLORS = [ 'red', 'blue', 'green', 'orange', 'purple', 'red', 'blue', 'green', 'orange', 'purple' ];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
	let counter = array.length;

	// While there are elements in the array
	while (counter > 0) {
		// Pick a random index
		let index = Math.floor(Math.random() * counter);

		// Decrease counter by 1
		counter--;

		// And swap the last element with it
		let temp = array[counter];
		array[counter] = array[index];
		array[index] = temp;
	}

	return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
	for (let color of colorArray) {
		// create a new div
		const newDiv = document.createElement('div');

		// give it a class attribute for the value we are looping over
		newDiv.classList.add(color);

		// call a function handleCardClick when a div is clicked on
		newDiv.addEventListener('click', handleCardClick);

		// append the div to the element with an id of game
		gameContainer.append(newDiv);
	}
}

// TODO: Implement this function!
// so far this works great, I want to find a way to create an animation of flipping
function handleCardClick(event) {
	if (noClick) return;

	if (event.target.classList.contains('flip')) return;

	let currentCard = event.target;

	currentCard.style.backgroundColor = currentCard.classList[0];

	if (!card1 || !card2) {
		currentCard.classList.add('flip');

		card1 = card1 || currentCard;
		card2 = currentCard === card1 ? null : currentCard;
	}

	if (card1 && card2) {
		noClick = true;

		let classCard1 = card1.className;
		let classCard2 = card2.className;

		if (classCard1 === classCard2) {
			flippedCards += 2;

			card1.removeEventListener('click', handleCardClick);
			card2.removeEventListener('click', handleCardClick);

			card1 = null;
			card2 = null;

			noClick = false;
		} else {
			setTimeout(function() {
				card1.style.backgroundColor = '';
				card2.style.backgroundColor = '';

				card1.classList.remove('flip');
				card2.classList.remove('flip');

				card1 = null;
				card2 = null;

				noClick = false;
			}, 1500);
		}
	}

	if (flippedCards === COLORS.length) alert('YOU WIN! GAME OVER!'); //saw this on the solution and had to add it!
}

// when the DOM loads
createDivsForColors(shuffledColors);
