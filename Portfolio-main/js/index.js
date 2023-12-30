'use strict';

// Event handlers
const container = document.querySelector('.container');
const containerBody = document.querySelector('body');
const hrLine = document.querySelector('hr');
const header = document.querySelector('.nav');
const topHeader = document.querySelector('.overall-header');

// loader event handlers
const loader = document.querySelector('.loader');
const logo = document.querySelector('.logo--name');
const subHeader = document.querySelector('.sub-header');
const btns = document.querySelectorAll('#btns');
const headerLinks = document.querySelectorAll('.nav__link');
const techStack = document.querySelector('.technical--skills');

// Loader implementation
setTimeout(() => {
  loader.classList.add('hidden');
  container.classList.remove('hidden');
}, 5000);
setTimeout(() => {
  logo.style.display = 'inline';
  topHeader.style.opacity = 1;
}, 6100);

setTimeout(() => {
  subHeader.style.opacity = 1;
}, 7200);

// Dark theme
let dark = true;
const moonIcon = document.querySelector('.icon-moon');
const sendMailBtn = document.querySelector('.send-mail');
moonIcon.addEventListener('click', toggleDarkMode);
const stickyTopNav = document.querySelector('.nav--sticky');
// console.log(stickyTopNav);

function darkProps(col, col2, col3, col4) {
  btns.forEach(btn => (btn.style.background = col));
  sendMailBtn.style.background = col2;
  containerBody.style.background = col3;
  hrLine.style.background = col4;
}

function toggleStickyBg() {
  !dark
    ? (header.style.background = 'rgba(255, 255, 255, 1.0)')
    : (header.style.background = '#14213d');
}

function toggleDarkMode() {
  container.classList.toggle('dark');
  if (dark) {
    headerLinks.forEach(hl => (hl.style.color = 'black'));
    darkProps('black', 'black', 'white', 'black');
  } else {
    btns.forEach(btn => {
      btn.style.color = 'white';
    });

    darkProps('transparent', 'transparent', '#01132d', '#01132d');
    headerLinks.forEach(hl => (hl.style.color = 'white'));
  }
  dark = !dark;

  toggleStickyBg();
}

// menu fade animation
const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) {
        el.style.opacity = this;
      }
    });
    logo.style.opacity = this;
  }
};
header.addEventListener('mouseover', handleHover.bind(0.5));
header.addEventListener('mouseout', handleHover.bind(1));

// Sticky navigation: Intersection Observer API
const arrowUp = document.querySelector('.back-up');
const navHeight = topHeader.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;

  if (!entry.isIntersecting) {
    header.classList.add('sticky');
    arrowUp.classList.remove('hidden');
    if (header.classList.contains('sticky')) {
      toggleStickyBg();
    }
  } else {
    header.style.background = 'none';
    header.classList.remove('sticky');
    arrowUp.classList.add('hidden');
  }
};
const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

headerObserver.observe(topHeader);

//////////////////////////////////
const reorderText = document.querySelector('.reorder__text');
const reorderImg = document.querySelector('.reorder__img');
const hamsburgerIcon = document.querySelector('.ham-icon');
const cancelIcon = document.querySelector('.cancel-icon');
const listItems = document.querySelector('.nav__links');
const listLink = document.querySelectorAll('.nav__link');

// media query on a smaller screen
const mediaQueryList = window.matchMedia('(max-width: 765px)');

const reOrdering = function () {
  if (mediaQueryList.matches) {
    reorderImg.classList.add('order-1');
    reorderText.classList.add('order-2');
  }
};
reOrdering();

let clicked;

// Hamsburger functionality
hamsburgerIcon.addEventListener('click', function () {
  clicked = true;
  if (mediaQueryList.matches && clicked) {
    listItems.style.display = 'block';
  }
  if (!mediaQueryList) return (listItems.style.display = 'flex');

  clicked = !clicked;
  if (!clicked) {
    hamsburgerIcon.style.display = 'none';
    cancelIcon.style.display = 'block';
  }
});

const closeLink = function () {
  listItems.style.display = 'none';
  cancelIcon.style.display = 'none';
  hamsburgerIcon.style.display = 'block';
};
container.addEventListener('click', function (e) {
  const link = e.target;

  if (listItems.style.display === 'block') {
    if (
      link.classList.contains('ham-icon') ||
      link.classList.contains('cancel-icon')
    )
      return;
    closeLink();
  }
});
cancelIcon.addEventListener('click', closeLink);
// listLink.forEach(link => link.addEventListener('click', closeLink));
// End of hamsburger functionality

// Text animation
const options = {
  strings: ['Oluwagbemiga', 'A Frontend Developer'],
  typeSpeed: 40,
  backSpeed: 40,
  loop: true,
};
const typed = new Typed('.typing', options);

// section header pretext
const readMoreText = document.querySelector('.read--more');
const chooseView = document.querySelector('.choose--view');
const chooseViewText = document.querySelector('.choose--view--text');
const myProfilePics = document.querySelector('.my-image');

chooseView.addEventListener('click', function () {
  readMoreText.classList.toggle('hidden');
  readMoreText.classList.contains('hidden')
    ? (chooseViewText.innerText = 'see more')
    : (chooseViewText.innerText = 'see less');
  if (mediaQueryList.matches) {
    if (!readMoreText.classList.contains('hidden') && mediaQueryList.matches) {
      subHeader.style.height = '134vh';
    } else {
      subHeader.style.height = '94vh';
    }
  }
  if (!mediaQueryList.matches) {
    if (!readMoreText.classList.contains('hidden') && !mediaQueryList.matches) {
      subHeader.style.height = '37rem';
      myProfilePics.classList.add('middle');
    } else {
      subHeader.style.height = '34rem';
      myProfilePics.classList.remove('middle');
    }
  }
});

// Lazy loading images
const imgTargets = document.querySelectorAll('img[data-src]');

const loadImg = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  // Replace src with data-src
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });

  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '-50px',
});

imgTargets.forEach(img => imgObserver.observe(img));

// Reveal sections
const allSections = document.querySelectorAll('.sections');

const revealSection = function (entries, observer) {
  // Removal of tech stack section on desktop view

  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

// Tech stack section
document.addEventListener('DOMContentLoaded', function () {
  const techItems = Array.from(document.querySelectorAll('.tech-item'));
  const connector = document.querySelector('.tech-connector');

  const angle = (2 * Math.PI) / techItems.length;

  techItems.forEach((item, index) => {
    const radius = 150; // Adjust the radius as needed
    const x = Math.cos(angle * index) * radius;
    const y = Math.sin(angle * index) * radius;

    gsap.set(item, {x, y}); // Set initial position of each item

    const line = document.createElement('div');
    line.className = 'connector-line';
    line.style.width = `${Math.sqrt(x * x + y * y)}px`;
    line.style.transform = `rotate(${Math.atan2(y, x)}rad)`;
    connector.appendChild(line);
  });

  function rotateItems() {
    techItems.forEach((item, index) => {
      const newIndex = (index + 1) % techItems.length; // Get the new index after rotation
      const newX = gsap.getProperty(techItems[newIndex], 'x');
      const newY = gsap.getProperty(techItems[newIndex], 'y');

      gsap.to(item, {
        x: newX,
        y: newY,
        duration: 2,
        ease: 'power1.inOut',
      });
    });
  }

  // Start rotating the items
  rotateItems();

  // Rotate the items every 2 seconds
  setInterval(rotateItems, 2000);
});
