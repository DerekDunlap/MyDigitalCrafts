const express=require('express')
const mustacheExpress=require('mustache-express')
const app=express()

const moviesRouter=require('./routes/movies')

app.use(express.urlencoded())
app.use('/movies',moviesRouter)

global.movies=[]
global.movieDetails=[]

app.engine('mustache',mustacheExpress())
app.set('views','./views')
app.set('view engine','mustache')

app.listen(3000,()=>{
    console.log('Server running...')
})