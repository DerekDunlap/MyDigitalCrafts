const express=require('express')
const router=express.Router()

router.post('/create',(req,res)=>{
    const title=req.body.movieTitle
    const description=req.body.movieDesricption
    const genre=req.body.movieGenre
    const posterURL=req.body.moviePosterURL

    let movie={movieID:movies.length+1,title:title,description:description,genre:genre,posterURL:posterURL}
    movies.push(movie)
    res.redirect('/movies')
})

router.post('/:movieID',(req,res)=>{
    const title=req.body.movieTitle
    movieDetails=movies.filter((movie)=>{
        if(movie.title==title){
            return movie.movieID
        }
    })

    res.redirect('/movies/:movieID')
})

router.post('/genre/:genre',(req,res)=>{
    const 
})

router.post('/delete',(req,res)=>{
    const movieID=parseInt(req.body.movieID)
    movies=movies.filter((movie)=>{
        return movie.movieID!=movieID
    })
    res.redirect('/movies')
})

router.get('/',(req,res)=>{
    res.render('movies',{movies:movies})
})

router.get('/:movieID',(req,res)=>{
    console.log(movieDetails)
    res.render('movie-details',{movieDetails:movieDetails})
})

module.exports=router