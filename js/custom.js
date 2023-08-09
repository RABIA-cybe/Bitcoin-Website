var swiper = new Swiper(".mySwiper", {
  effect: "cube",
  grabCursor: true,
  cubeEffect: {
    shadow: true,
    slideShadows: true,
    shadowOffset: 15,
    shadowScale: 0.94,
  },
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

AOS.init();

// let valueDisplays = document.querySelectorAll(".num");
// let interval = 4000;
// valueDisplays.forEach( (valueDisplays)=> {
//   let startValue = 0;
//   let endValue = parseInt(valueDisplays.getAttribute("data-val"));
//   let duration = Math.floor(interval/endValue);
//   let counter = setInterval(() => {
//     startValue += 1;
//     valueDisplays.textContent = startValue;
//     if(startValue == endValue){
//       clearInterval(counter)
//     }
//   }, duration);
// })

function animateNumbersWhenVisible() {
  let valueDisplays = document.querySelectorAll(".num");
  let interval = 4000;
  
  let options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5, // Adjust this threshold value as needed, this 0.5 means the element will start animating when it's at least 50% visible in the viewport.
  };

  // Using Intersection Observer API to target if the user has scrolled to numbers section 
  
  let observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        let startValue = 0;
        let endValue = parseInt(entry.target.getAttribute("data-val"));
        let duration = Math.floor(interval/endValue);
        let counter = setInterval(() => {
          startValue += 1;
          entry.target.textContent = startValue;
          if(startValue >= endValue){
            clearInterval(counter);
            observer.unobserve(entry.target); // Stop observing this element
          }
        }, duration);
      }
    });
  }, options);
  
  valueDisplays.forEach(valueDisplay => {
    observer.observe(valueDisplay);
  });
}

// Call the function when the document is loaded
document.addEventListener("DOMContentLoaded", animateNumbersWhenVisible);

