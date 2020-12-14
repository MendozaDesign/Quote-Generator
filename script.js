const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');




function showLoadingSpinner(){
    loader.hidden = false;  // .hidden=false will show laoder
    quoteContainer.hidden= true; // .hidden = true will hide the quotecontainer
}


function removeLoadingSpinner(){
    if(!loader.hidden){        //if loader.hidden not true
        quoteContainer.hidden = false;   // then show quoteContainer
        loader.hidden = true;            // and hide loader
    }
}

// Get Quote From API
async function getQuote(){
    showLoadingSpinner();
    // We need to use a Proxy URL to make our API call in order to avoid cors error
    const proxyUrl = 'http://cors-anywhere.herokuapp.com/';  
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    try{
        const response = await fetch(proxyUrl + apiUrl);
        const data =await response.json();
        // Check if Author field is blank and replace it with 'Unknown'
        if(data.quoteAuthor===''){
            authorText.innerText = 'Unknown';
        }else {                                                                
            authorText.innerText = data.quoteAuthor;
        }
        
    //    Dynamically reduce font size for long quotes
        if(data.quoteText.length>120){
            quoteText.classList.add('long-quote');
        }else{
            quoteText.classList.remove('long-quote');
        }
        
        quoteText.innerText = data.quoteText;
       
       
        removeLoadingSpinner();
       
    }catch(error){
        alert(error);
        getQuote();  //if error caught, then get new quote
        
    }

}
// Tweete Quote function
function tweetQuote(){
    const quote= quoteText.innerText;
    const author= authorText.innerText;
    const twitterUrl= `https://twitter.com/intent/tweet?text=${quote} - ${author}`; //added twitter template to program then added querry at end ?text=${quote} - ${author} 
    window.open(twitterUrl, '_blank'); // opens new page with twitter url
}
// add EventListeners for Buttons
newQuoteBtn.addEventListener('click', getQuote);  //when new quote button is clicked will retrive a new quote
twitterBtn.addEventListener('click', tweetQuote);  // on click of twitter button, sent to twitter page


// On Load
getQuote();