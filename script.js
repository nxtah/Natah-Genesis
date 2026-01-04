// Card activation effect on scroll
document.addEventListener('DOMContentLoaded', () => {
	const cards = document.querySelectorAll('.problem__item');
	const title = document.querySelector('.problem__title');
	
	if (!cards.length || !title) return;
	
	// Set all cards to inactive initially
	cards.forEach(card => card.classList.add('inactive'));
	
	function updateActiveCard() {
		const titleRect = title.getBoundingClientRect();
		const titleCenter = titleRect.top + titleRect.height / 2;
		
		let closestCard = null;
		let closestDistance = Infinity;
		
		cards.forEach(card => {
			const cardRect = card.getBoundingClientRect();
			const cardCenter = cardRect.top + cardRect.height / 2;
			const distance = Math.abs(cardCenter - titleCenter);
			
			if (distance < closestDistance) {
				closestDistance = distance;
				closestCard = card;
			}
		});
		
		// Update active states
		cards.forEach(card => {
			if (card === closestCard && closestDistance < 300) {
				card.classList.remove('inactive');
				card.classList.add('active');
			} else {
				card.classList.remove('active');
				card.classList.add('inactive');
			}
		});
	}
	
	// Run on scroll
	window.addEventListener('scroll', updateActiveCard);
	
	// Initial check
	updateActiveCard();
});