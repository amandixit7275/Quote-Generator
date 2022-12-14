const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader')


//show loading
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

//hide loading
function complete(){
    loader.hidden = true;
    quoteContainer.hidden = false;
}

let apiQuotes = [];

//show new quote
function newQuote(){
    loading()
    //pick a random quotee from aqiQuote array
    const quote = apiQuotes[Math.floor(Math.random()*apiQuotes.length)]
 //check if Author field is black and replace it with Unknown
    if(!quote.author){
    authorText.textContent = 'Unknown';
  }
  else{
    authorText.textContent = quote.author;
  }

//check Quote length to determine styling 
  if(quoteText.length>100){
    quoteText.classList.add('long-quote');
  } else {
    quoteText.classList.remove('long-quote')

  }
  quoteText.textContent = quote.text;
  complete()
}


//Get Quotes from an API
async function getQuotes() {
    loading()
  const apiUrl = "https://type.fit/api/quotes";
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuote();
  } catch (error) {
    //to catch the error
  }
}

//Tweet Quote 
function tweetQuote(){
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl , '_black')
}

//Event Listener
newQuoteBtn.addEventListener('click' , newQuote);
twitterBtn.addEventListener('click' , tweetQuote);

//on Load

getQuotes();