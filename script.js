const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn= document.getElementById('twitter');
const newQuoteBtn= document.getElementById('new-quote');
const loader = document.getElementById('loader');

// Show loading spinner
function loading(){
  loader.hidden = false;
  quoteContainer.hidden= true;
}

//Hide loading spinner
function complete(){
  if(!loader.hidden){
    loader.hidden = true;
    quoteContainer.hidden= false;
  }
}

// Get the Api quote 
async function getQuote(){
  loading();
  const apiUrl = 'https://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en';
  const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
  try {
   
    const response = await fetch(proxyUrl+apiUrl );
    const data = await response.json();
    
    // If Author is blank, set 'unknown'
    if(data.quoteAuthor === ''){
      authorText.innerText = 'Unknown';
    }else{
      authorText.innerText = data.quoteAuthor;
    }
    //Reduce length of long quote.
    
    if(data.quoteText.length > 115){
      quoteText.classList.add('long-quote');
    }else{
      quoteText.classList.remove('long-quote');
    }
    quoteText.innerText = data.quoteText; 
    //Stop loader, and show container
    complete();   
    
  } catch (error) {
    getQuote();
    console.log('Whoops! no qoute fetched'+error);
  }

}

// On load 
getQuote();


function tweetQuote(){
  const quote = quoteText.innerText;
const author = authorText.innerText;
const twitterUrl= `https://twitter.com/intent/tweet?text=${quote}-${author}`;
window.open(twitterUrl,'_blank');
}

//Event listeners
newQuoteBtn.addEventListener('click',getQuote);
twitterBtn.addEventListener('click',tweetQuote);

