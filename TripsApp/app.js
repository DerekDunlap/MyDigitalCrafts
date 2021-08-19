const express =require('express')
const mustacheExpress=require('mustache-express')
const session=require('express-session')
const app=express()

const tripsRouter=require('./routes/trips')
const usersRouter=require('./routes/users')

app.use(express.urlencoded())
app.use(express.static('styles'))


app.use('/users',usersRouter)
app.use('/trips',tripsRouter)

app.engine('mustache',mustacheExpress())
app.set('views','./views')
app.set('view engine','mustache')

app.use(session({
    secret: 'SECRETKEY',
    saveUninitialized: true,
    resave: true
}))

function logMiddleware(req,res,next){
    console.log('LOGGED')
    next()
}

app.use(logMiddleware)

global.trips=[]
global.users=[]

app.listen(3000,()=>{
    console.log("Server is up...")
})