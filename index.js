
const movieList = document.querySelector('#movies');
let novaData = "";

const Movie = (props) => {
  const { title, posterUrl, genres, year, url } = props;

  return `
  <div class="movie">
  <a href="${url}"><img class="movie__img" src="${posterUrl}" alt="${title}"></a>
  <h2 class="movie__title">${title}</h2>
  <p class="movie__year">${year}</p>
  <p class="movie__genre">${genres}</p>
</div>
  `
}

const renderMovies = () => {
  fetch('https://apps.kodim.cz/daweb/trening-api/apis/movie-api/movies')
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      novaData = data;
      showMovies(data);
    });
};


const showMovies = (items) => {
movieList.innerHTML = items
.sort((a,b) => { 
  if ( a.title < b.title) {
    return -1;
  }
  if (a.title > b.title) {
    return 1;
  }
  return 0;
})
.map((movie) => {
  return Movie(movie);
}).join('');
}



renderMovies();

document.querySelector('.year_ascending').addEventListener('click', () => {
  movieList.innerHTML = novaData
  .sort((a,b) => {  
    if ( a.year < b.year) {
      return -1;
    }
    if (a.year > b.year) {
      return 1;
    }
    return 0;
  })
  .map((movie) => {
    return Movie(movie);
  }).join('');
});


document.querySelector('.year_descending').addEventListener('click', () => {
  movieList.innerHTML = novaData
  .sort((a,b) => {  
    if ( a.year < b.year) {
      return 1;
    }
    if (a.year > b.year) {
      return -1;
    }
    return 0;
  })
  .map((movie) => {
    return Movie(movie);
  }).join('');
});
