function isTouching(a, b) { // sirve para cuando dos elements on the DOM are touching
	const aRect = a.getBoundingClientRect(); //https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect
	const bRect = b.getBoundingClientRect();

	return !(
		aRect.top + aRect.height < bRect.top ||
		aRect.top > bRect.top + bRect.height ||
		aRect.left + aRect.width < bRect.left ||
		aRect.left > bRect.left + bRect.width
	);
}

const avatar = document.querySelector('#player');
const coin = document.querySelector('#coin');

window.addEventListener('keyup', function(e) {                //window. so it will work everywhere we use keydown keyup because on most browser arrow keys are not considered "keypresses"
 	if (e.key === 'ArrowDown' || e.key === 'Down') {               //'Down' is for internet explorer
		moveVertical(avatar, 50);
} 
    else if (e.key === 'ArrowUp' || e.key === 'Up') {
		moveVertical(avatar, -50);
	}

	else if (e.key === 'ArrowRight' || e.key === 'Right') {
		moveHorizontal(avatar, 50);
		avatar.style.transform = 'scale(1,1)'; //girar la img
	}

	else if (e.key === 'ArrowLeft' || e.key === 'Left') {
		moveHorizontal(avatar, -50);
		avatar.style.transform = 'scale(-1,1)';
	}

	if (isTouching( avatar, coin)) moveCoin();
});

const moveVertical = (element, amount) => {
	const currTop = extractPos(element.style.top);
	element.style.top = `${currTop + amount}px`;                    //adding 50 to move and the px that we removed at the extractPos funct
}
const moveHorizontal = (element, amount) => {
	const currLeft = extractPos(element.style.left);
	element.style.left = `${currLeft + amount}px`; 
};

const extractPos = (pos) => {
	if (!pos) return 100;                                   //there is not inline top set (even if we set up in css) = NaN. (!pos) empty string still "falsey". If there is no pos, return 0 and we can work with that, or return 100 and we match the css to avoid issues otherwise we have NaN
	return parseInt(pos.slice(0, -2));                    //getting rid of the px. With parseInt we take the string (ej 200px) remove px and turn it into number to update css style
};

const moveCoin = () => {
  const x = Math.floor(Math.random() * window.innerWidth);
  const y = Math.floor(Math.random() * window.innerHeight);
  coin.style.top = `${y}px`;
  coin.style.left = `${x}px`;
 };

 moveCoin();