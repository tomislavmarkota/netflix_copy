const search = document.getElementById("search");
const matchList = document.getElementById("ajax-content");

// Search movies.json and filter it
const searchMovies = async searchText => {
    const response = await fetch("/script/movies.json");
    const data = await response.json();

    // Get matches to current text input
    let matches = data.filter(movieName => {
        const regexp = new RegExp(`^${searchText}`, 'gi');
        return movieName.movie.match(regexp);

    });

    if(searchText.length === 0){
        matches = [];
        matchList.innerHTML = "";
    }
    
    outputHtml(matches);
};

// Show results in HTML
const outputHtml = matches => {
    if(matches.length > 0){
        const html = matches.map(match => `
            <p class="ajax-matches"><strong>${match.movie}</strong>, ${match.genre}</p>
        `).join('');
        matchList.innerHTML = html;
        matchList.classList.remove("err-text");
    }else{
        matchList.innerHTML = "<p>Please enter valid movie name!</p>";
        matchList.classList.add("err-text");
    }
    if(search.value == ""){
        matchList.removeChild(matchList.firstChild);
    }
}

search.addEventListener("input", () => searchMovies(search.value));

/******************************ACCORDION*****************************************/



const accTitle = document.querySelectorAll(".acc-title");

accTitle.forEach(accTitle => {
    accTitle.addEventListener("click", () => {
	const classActive = document.querySelector(".acc-title.active");
	    if(classActive && classActive!=accTitle){
	    classActive.classList.toggle("active")
	    classActive.nextElementSibling.style.maxHeight = 0;	
        }
        accTitle.classList.toggle("active");
        const accContent = accTitle.nextElementSibling;
        if(accTitle.classList.contains("active")){
            accContent.style.maxHeight = accContent.scrollHeight + "px"; 
        }else{
            accContent.style.maxHeight = 0;
        } 
    })
})



