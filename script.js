const APIURL = `https://api.themoviedb.org/3/discover/
movie?sort_by=popularity.desc&api_key=04c35731a5ee918f0
14970082a0088b1&page=1`;

const IMGPATH='https://image.tmdb.org/t/p/w1280';

const SEARCHAPI = 'https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=';

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');

//initially fetch movies
getMovies(APIURL)

async function getMovies(url){
    const resp= await fetch(url);
    const respData= await resp.json();

    showMovies(respData.results)

    console.log(respData)
  
}


function showMovies(movies){
    main.innerHTML='';
    movies.forEach((movie) => {
        let{poster_path,title,vote_average,original_language,overview,release_date}=movie;
        if(original_language==='en'){
             original_language= 'ENG'
        }
        const movieEl = document.createElement('div');
    
        movieEl.classList.add('movie');
        movieEl.innerHTML=
       
        `<img
          src="${IMGPATH+poster_path}"
          alt="${title}"
        />

        <div class="movie-info">
          <h3>${title} (${original_language})</h3>
          <span class ="${getClassByRate(vote_average)}">${vote_average}</span>
        </div>
        <div class="overview">
        <h4>Overview</h4>
        <h4><strong> Release Date:</strong>  ${release_date}</h4>
        ${overview}
        </div>
        `;
     
        
    main.appendChild(movieEl);


      
    });
}
function getClassByRate(vote){
    if(vote>8){
        return 'green';
    }
    else if(vote>=5){
        return 'orange';
    }
    else{
        return 'red';
    }
     
    return getClassByRate()
}

form.addEventListener('submit',(e)=>{
    e.preventDefault();

    const searchTerm = search.value;
    
    if(searchTerm){
        getMovies(SEARCHAPI + searchTerm);
        search.value="";
    }
    // 
})

