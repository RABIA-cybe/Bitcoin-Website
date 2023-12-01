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
    delay: 4000,
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




function formatNumberWithTwoDecimals(number) {
  if (typeof number !== 'number') {
    throw new Error('Input is not a valid number.');
  }

  return number.toFixed(2);
}


let bitcoinPrice = document.getElementById("bitcoinPrice");
let ethereumPrice = document.getElementById("ethereumPrice");
let litecoinPrice = document.getElementById("litecoinPrice");
let tetherPrice = document.getElementById("tetherPrice");
let bitcoinChange = document.getElementById("bitcoinChange");
let ethereumChange = document.getElementById("ethereumChange");
let litecoinChange = document.getElementById("litecoinChange");
let tetherChange = document.getElementById("tetherChange");

let currencyName = document.querySelectorAll(".currencyName");
let currencyPrice = document.querySelectorAll(".currencyPrice");
let currencyChange = document.querySelectorAll(".currencyChange");
let currencyVWAP24Hr = document.querySelectorAll(".currencyVWAP24Hr");

let newsDate = document.querySelectorAll(".newsDate");
let newsHeadline = document.querySelectorAll(".newsHeadline")
let news = document.querySelectorAll(".news");



// Fetching API 
fetch('https://api.coincap.io/v2/assets')
  .then(response => response.json())
  .then(data => {
    console.log(data.data); // Do something with the data
    
    if (data.data && data.data.length > 0) {
      bitcoinPrice.textContent = formatNumberWithTwoDecimals(parseFloat(data.data[0].priceUsd));
      bitcoinChange.textContent = formatNumberWithTwoDecimals(parseFloat(data.data[0].changePercent24Hr));
      ethereumPrice.textContent = formatNumberWithTwoDecimals(parseFloat(data.data[1].priceUsd));
      ethereumChange.textContent = formatNumberWithTwoDecimals(parseFloat(data.data[1].changePercent24Hr));
      litecoinPrice.textContent = formatNumberWithTwoDecimals(parseFloat(data.data[12].priceUsd));
      litecoinChange.textContent = formatNumberWithTwoDecimals(parseFloat(data.data[12].changePercent24Hr));
      tetherPrice.textContent = formatNumberWithTwoDecimals(parseFloat(data.data[2].priceUsd));
      tetherChange.textContent = formatNumberWithTwoDecimals(parseFloat(data.data[2].changePercent24Hr));



      let i =0;

      currencyName.forEach(element => {
        element.textContent =data.data[i].name;
        i += 1;
        console.log(element.textContent);
      });

      currencyPrice.forEach(element => {
        element.textContent ="$"+ formatNumberWithTwoDecimals(parseFloat(data.data[i].priceUsd))+ " US";
        i += 1;
        console.log(element.textContent);
      });

       currencyChange.forEach(element => {
        element.textContent =formatNumberWithTwoDecimals(parseFloat(data.data[i].changePercent24Hr))+"%";
        i += 1;
        console.log(element.textContent);
        
      });

      currencyVWAP24Hr.forEach(element => {
        element.textContent =formatNumberWithTwoDecimals(parseFloat(data.data[i].vwap24Hr));
        i += 1;
        console.log(element.textContent);
      });





    } else {
      console.error('No data available in the response.');
    }
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });


