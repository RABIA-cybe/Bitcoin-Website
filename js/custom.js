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
    delay: 6000,
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

document.getElementById('copyright-year').textContent = new Date().getFullYear();
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
let tradeBtn = document.querySelectorAll(".tradeBtn a");

let newsDate = document.querySelectorAll(".newsDate");
let newsHeadline = document.querySelectorAll(".newsHeadline")
let news = document.querySelectorAll(".news p");
let newsLink = document.querySelectorAll(".newsLink");



// Fetching API 
fetch('https://api.coincap.io/v2/assets')
  .then(response => response.json())
  .then(data => {
    // console.log(data.data); // Do something with the data
    
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
        // console.log(element.textContent);
      });

       i =0;

      currencyPrice.forEach(element => {
        element.textContent ="$"+ formatNumberWithTwoDecimals(parseFloat(data.data[i].priceUsd))+ " US";
        i += 1;
        // console.log(element.textContent);
      });

      i =0;

       currencyChange.forEach(element => {
        element.textContent =formatNumberWithTwoDecimals(parseFloat(data.data[i].changePercent24Hr))+"%";
        i += 1;
        // console.log(element.textContent);
        
      });

      i =0;

      currencyVWAP24Hr.forEach(element => {
        element.textContent =formatNumberWithTwoDecimals(parseFloat(data.data[i].vwap24Hr));
        i += 1;
        // console.log(element.textContent);
      });

      let j = 0;

      tradeBtn.forEach(element => {
        element.href =data.data[j].explorer;
        j += 1;
        // console.log(element.textContent);
      });





    } else {
      console.error('No data available in the response.');
    }
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });


  function removeContentAfterThreeDots(str) {
    const parts = str.split('[');
    const result = parts[0];
    console.log(parts);
  
    return result;
  }

  function formatDate(inputDate) {
    const date = new Date(inputDate);
    
    // Get day, month, and year components
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();
  
    // Construct the formatted date string
    const formattedDate = `${day} ${month} ${year}`;
  
    return formattedDate;
  }

  function limitWords(inputString, limit) {
    // Split the input string into an array of words
    const words = inputString.split(/\s+/);

    // Slice the array to keep only the first 'limit' words
    const limitedWords = words.slice(0, limit);

    // Join the limited words back into a string
    const resultString = limitedWords.join(' ');

    return resultString;
}


  // Fetching News API 
  
  // fetch('https://newsapi.org/v2/everything?q=cryptocurrency&apiKey=f37eb6d921ff4ca287b3e54573aa50b8')
  // .then(responseNews => responseNews.json())
  // .then(data => {
  //   // console.log(data.articles[0].title); // Do something with the data
    
  //   if (data.articles && data.articles.length > 0) {



  //     let k =0;

  //     newsDate.forEach(element => {
  //       element.textContent = formatDate(data.articles[k].publishedAt);
  //       k += 1;
  //       // console.log(element.textContent);
  //     });

  //     k=0;

  //     newsHeadline.forEach(element => {
  //       element.textContent =limitWords(data.articles[k].title, 10);
  //       k += 1;
  //       // console.log(element.textContent);
  //     });

  //     k=0;

  //     news.forEach(element => {
  //       element.textContent = removeContentAfterThreeDots(data.articles[k].content);
  //       element.textContent = `${element.textContent} `;
        
  //       k += 1;
  //       // console.log(element.textContent);
  //     });

  //     k=0;


  //     newsLink.forEach(element => {
  //       element.href = data.articles[k].url;
        
  //       k += 1;
  //       // console.log(element.textContent);
  //     });







  //   } else {
  //     console.error('No News data available in the response.');
  //   }
  // })
  // .catch(error => {
  //   console.error('Error fetching data:', error);
  // });







  // Fetching News Data API 
  
  fetch('https://newsdata.io/api/1/news?apikey=pub_36659ef8d4de1adb2b89e425d97ed6bc8c74e&q=cryptocurrency&language=en')
  .then(responseNewsData => responseNewsData.json())
  .then(data => {
    console.log("Printing news");
    console.log(data);
    
    
    if (data.results && data.results.length > 0) {



      let k =0;

      newsDate.forEach(element => {
        element.textContent = formatDate(data.results[k].pubDate);
        k += 1;
        // console.log(element.textContent);
      });

      k=0;

      newsHeadline.forEach(element => {
        element.textContent =limitWords(data.results[k].title, 10);
        k += 1;
        // console.log(element.textContent);
      });

      k=0;

      news.forEach(element => {
        element.textContent = limitWords(data.results[k].description, 20);
        element.textContent = `${element.textContent} `;
        
        k += 1;
        // console.log(element.textContent);
      });

      k=0;


      newsLink.forEach(element => {
        element.href = data.results[k].source_url;
        
        k += 1;
        // console.log(element.textContent);
      });







    } else {
      console.error('No News data available in the response.');
    }
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });




  // var mediaQuery = window.matchMedia("(max-width: 768px)");

// Code for Mobile responsive Menu 
let menuIcon = document.getElementById("menu-icon");
let mobileNav = document.getElementById("mobile-navigation")
menuIcon.onclick =  function mobNav()
{
  mobileNav.style.display = (mobileNav.style.display === "block") ? "none" : "block";
  
}  

mobileNav.addEventListener('focusout', function () {
  this.style.display = 'none';
  document.getElementById('menu-icon').classList.toggle('open');
});

document.getElementById('menu-icon').addEventListener('click', function() {
  this.classList.toggle('open');
  // Add your code to toggle the menu or perform other actions
});

document.addEventListener("DOMContentLoaded", function () {
  // Set up an event listener to hide the loader when the entire page is loaded
  window.addEventListener("load", function () {
      document.getElementById("loader-wrapper").style.display = "none";
      
  });

  // Add any additional initialization code here if needed
});


// document.addEventListener("DOMContentLoaded", function () {
//   // Simulate the delay of your content loading
//   setTimeout(function () {
//       document.getElementById("loader-wrapper").style.display = "none";
//       document.getElementById("content").style.display = "block";
//   }, 100000); // Adjust the delay time (in milliseconds) based on your needs
// });