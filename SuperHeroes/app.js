const movieUL=document.getElementById("movieUL")
const movieInfoDiv=document.getElementById("movieInfoDiv")
let movieImdb=document.getElementById("movieImdbID")

let moviesRequest=new XMLHttpRequest()
moviesRequest.open('GET','https://www.omdbapi.com/?s=batman&apikey=3f892fd6')
moviesRequest.send()

moviesRequest.addEventListener('load',function(){
  let movieResults=JSON.parse(this.responseText)
  const movieSearch=movieResults.Search.map(function(movie){
    const moviePathway=`http://www.omdbapi.com/?i=${movie.imdbID}&apikey=3f892fd6`
    let moviesRequest=new XMLHttpRequest()
    moviesRequest.open('GET',moviePathway)
    moviesRequest.send()
    return `<li>
              <h2><a id="movieImdbID" " href="${moviePathway}">${movie.Title}</h2>
              <img src="${movie.Poster}"/>
            </li>`
  })
  movieUL.innerHTML=movieSearch.join("")

  const movieImdbID=document.getElementById("movieImdbID")
  console.log(movieImdbID.getAttribute('href',this.value))
})
