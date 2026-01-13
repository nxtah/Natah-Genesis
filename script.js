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

// Project modal data
const projectData = [
  {
    name: "Toko Fashion AI",
    video: "https://res.cloudinary.com/dimw2tqof/video/upload/v1767679542/web_1_b5u6fr.mp4",
    desc: "Website fashion dengan AI chatbot, katalog interaktif, dan sistem order otomatis.",
    features: ["AI Chatbot 24/7", "Katalog Produk Dinamis", "Order Otomatis", "Integrasi Pembayaran"]
  },
  {
    name: "Restoran Online",
    video: "https://res.cloudinary.com/dimw2tqof/video/upload/v1767679533/web_2_ierz3k.mp4",
    desc: "Restoran digital dengan menu interaktif, pemesanan online, dan notifikasi WhatsApp.",
    features: ["Menu Interaktif", "Order Online", "Notifikasi WhatsApp", "Review Pelanggan"]
  },
  {
    name: "Jasa Digital",
    video: "https://res.cloudinary.com/dimw2tqof/video/upload/v1767679538/web_3_isfevy.mp4",
    desc: "Landing page jasa digital, booking otomatis, dan testimoni real-time.",
    features: ["Booking Otomatis", "Testimoni Real-Time", "Integrasi Kalender", "Formulir Custom"]
  },
  {
    name: "UMKM Lokal",
    video: "https://res.cloudinary.com/dimw2tqof/video/upload/v1767679536/web_4_qdpsyt.mp4",
    desc: "Website UMKM dengan katalog produk, fitur chat, dan promosi otomatis.",
    features: ["Katalog Produk", "Chat Langsung", "Promosi Otomatis", "Statistik Penjualan"]
  },
  {
    name: "Startup AI",
    video: "https://res.cloudinary.com/dimw2tqof/video/upload/v1767679539/web_5_uup2mx.mp4",
    desc: "Startup AI dengan demo produk, fitur onboarding, dan dokumentasi interaktif.",
    features: ["Demo Produk AI", "Onboarding Otomatis", "Dokumentasi Interaktif", "Integrasi API"]
  }
];

// Modal logic
const modal = document.getElementById('project-modal');
const modalVideo = document.getElementById('project-modal-video');
const modalClose = document.querySelector('.project-modal__close');
const modalOverlay = document.querySelector('.project-modal__overlay');

function openProjectModal(idx) {
  const data = projectData[idx];
  if (!data) return;
  modalVideo.src = data.video;
  modalVideo.setAttribute('autoplay', '');
  modalVideo.setAttribute('loop', '');
  modalVideo.setAttribute('muted', '');
  modalVideo.setAttribute('playsinline', '');
  modalVideo.removeAttribute('controls');
  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden';
}
function closeProjectModal() {
  modal.style.display = 'none';
  modalVideo.src = '';
  document.body.style.overflow = '';
}
modalClose.addEventListener('click', closeProjectModal);
modalOverlay.addEventListener('click', closeProjectModal);

// Add click event to project videos
const projectItems = document.querySelectorAll('.project__item');
projectItems.forEach((item, idx) => {
  item.addEventListener('click', () => openProjectModal(idx));
});

// Horizontal auto-scroll mapping: map vertical scroll to horizontal scroll for benefit scroller
(() => {
  const viewport = document.querySelector('.benefit__scroller-viewport');
  const scroller = document.querySelector('.benefit__scroller');
  if (!viewport || !scroller) return;

  let maxScroll = 0;
  let start = 0;
  let end = 0;
  let ticking = false;

  function recalc() {
    // determine visible scroller height from first card (so scroller doesn't expand)
    const firstCard = scroller.querySelector('.benefit__card');
    const cardHeight = firstCard ? firstCard.getBoundingClientRect().height : Math.min(620, window.innerHeight * 0.6);

    // set scroller visible height explicitly (so it sits as a sticky bar)
    scroller.style.height = Math.round(cardHeight) + 'px';

    // total horizontal scrollable distance
    maxScroll = Math.max(scroller.scrollWidth - scroller.clientWidth, 0);

    // set viewport height so vertical scroll distance maps to full horizontal scroll
    // viewportHeight = window.innerHeight + maxScroll
    const vpHeight = window.innerHeight + maxScroll;
    viewport.style.height = Math.round(vpHeight) + 'px';

    // recompute start/end positions used for mapping
    start = viewport.getBoundingClientRect().top + window.pageYOffset;
    end = start + vpHeight - window.innerHeight; // when pageYOffset==end -> progress=1
  }

  function onScroll() {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(() => {
      const y = window.pageYOffset;
      const progress = end > start ? Math.min(Math.max((y - start) / (end - start), 0), 1) : 0;
      scroller.scrollLeft = Math.round(maxScroll * progress);
      // highlight cards 4 and 6 when they become centered in the scroller
      try {
        const cards = scroller.querySelectorAll('.benefit__card');
        if (cards && cards.length) {
          const scrollerRect = scroller.getBoundingClientRect();
          const scrollerCenterX = scrollerRect.left + scroller.clientWidth / 2;
          // card indices: 3 -> 4th, 5 -> 6th
          [3,5].forEach(idx => {
            const card = cards[idx];
            if (!card) return;
            const r = card.getBoundingClientRect();
            const cardCenterX = r.left + r.width / 2;
              const distance = Math.abs(cardCenterX - scrollerCenterX);
              // stricter threshold: within ~35% of card width -> considered centered
              const threshold = Math.max(48, r.width * 0.35);
              if (distance <= threshold) {
              card.classList.add('scrolled-highlight');
            } else {
              card.classList.remove('scrolled-highlight');
            }
          });
        }
      } catch (e) {
        // ignore
      }
      ticking = false;
    });
  }

  window.addEventListener('resize', () => { recalc(); onScroll(); });
  window.addEventListener('orientationchange', () => { recalc(); onScroll(); });
  window.addEventListener('scroll', onScroll, { passive: true });

  // initial setup after fonts/images load that can affect measurements
  window.addEventListener('load', () => { recalc(); onScroll(); });
  // also run now
  recalc(); onScroll();
  // make sure hover leaves don't leave persistent highlight
  try {
    const allCards = scroller.querySelectorAll('.benefit__card');
    allCards.forEach(card => {
      card.addEventListener('mouseleave', () => card.classList.remove('scrolled-highlight'));
      // on touchend also remove (mobile)
      card.addEventListener('touchend', () => card.classList.remove('scrolled-highlight'));
    });
  } catch (e) {}
})();

// Footer background transition on scroll
document.addEventListener('DOMContentLoaded', () => {
  const footer = document.querySelector('.footer');
  const navbar = document.querySelector('.navbar');
  const solidBtn = navbar.querySelector('.nav__btn--solid');
  const ghostBtn = navbar.querySelector('.nav__btn--ghost');
  const logo = navbar.querySelector('.nav__logo');
  const footerText = footer.querySelector('.footer__text');
  if (!footer || !navbar || !solidBtn || !ghostBtn || !logo || !footerText) return;

  function checkScroll() {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 10) {
      footer.style.background = '#D2FF52';
      navbar.style.background = '#D2FF52';
      solidBtn.style.background = 'var(--sea-blue)';
      solidBtn.style.color = '#ffffff';
      solidBtn.style.borderColor = 'var(--sea-blue)';
      ghostBtn.style.background = 'transparent';
      ghostBtn.style.color = 'var(--sea-blue)';
      ghostBtn.style.borderColor = 'var(--sea-blue)';
      logo.style.color = 'var(--sea-blue)';
      footerText.style.color = 'var(--sea-blue)';
    } else {
      footer.style.background = 'var(--sea-blue)';
      navbar.style.background = 'var(--nav-bg)';
      solidBtn.style.background = '';
      solidBtn.style.color = '';
      solidBtn.style.borderColor = '';
      ghostBtn.style.background = '';
      ghostBtn.style.color = '';
      ghostBtn.style.borderColor = '';
      logo.style.color = '';
      footerText.style.color = 'var(--text-color)';
    }
  }

  window.addEventListener('scroll', checkScroll);
  // Initial check
  checkScroll();
});