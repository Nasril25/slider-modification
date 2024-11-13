import people from './data.js';

const container = document.querySelector('.slide-container');
const nextBtn = document.querySelector('.next-btn');
const prevBtn = document.querySelector('.prev-btn');
const dotsContainer = document.querySelector('.dots-container');
const modal = document.getElementById('profile-modal');
const closeModal = document.querySelector('.close-btn');

// Initialize the slides dynamically
const initializeSlider = () => {
  container.innerHTML = people
    .map((person, index) => {
      const { img, name, job, text, dob, address, education } = person;
      return `
        <div class="slide" data-index="${index}">
          <img src="${img}" alt="${name}" class="img" />
          <h4>${name}</h4>
          <p class="title">${job}</p>
          <p class="text">${text}</p>
          <div class="quote-icon">
            <i class="fas fa-quote-right"></i>
          </div>
        </div>
      `;
    })
    .join('');
  
  // Add indicator dots
  dotsContainer.innerHTML = people
    .map((_, index) => `<div class="dot" data-index="${index}"></div>`)
    .join('');

  // Add 'active' class to the first slide and dot
  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.dot');
  slides[0].classList.add('active');
  dots[0].classList.add('active');
};

// Show detailed profile in modal
const showProfileDetail = (index) => {
  const { img, name, job, text, address, dob, education } = people[index];
  document.getElementById('modal-img').src = img;
  document.getElementById('modal-name').innerText = name;
  document.getElementById('modal-job').innerText = job;
  document.getElementById('modal-text').innerText = text;
  document.getElementById('modal-address').innerText = address;
  document.getElementById('modal-dob').innerText = dob;
  document.getElementById('modal-education').innerText = education;

  modal.style.display = 'block'; // Show modal
};

// Hide the modal when close button is clicked
closeModal.addEventListener('click', () => {
  modal.style.display = 'none';
});

// Manage the slide transitions
let currentIndex = 0;

const moveToSlide = (index) => {
  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.dot');
  slides[currentIndex].classList.remove('active');
  dots[currentIndex].classList.remove('active');

  currentIndex = (index + slides.length) % slides.length;

  slides[currentIndex].classList.add('active');
  dots[currentIndex].classList.add('active');
};

// Button event listeners
nextBtn.addEventListener('click', () => {
  moveToSlide(currentIndex + 1);
});

prevBtn.addEventListener('click', () => {
  moveToSlide(currentIndex - 1);
});

// Click event for each profile
container.addEventListener('click', (e) => {
  if (e.target.closest('.slide')) {
    const index = parseInt(e.target.closest('.slide').getAttribute('data-index'));
    showProfileDetail(index); // Show modal with profile detail
  }
});

// Indicator dot click event
dotsContainer.addEventListener('click', (e) => {
  if (e.target.classList.contains('dot')) {
    const index = parseInt(e.target.getAttribute('data-index'));
    moveToSlide(index);
  }
});

// Initialize the slider
initializeSlider();
