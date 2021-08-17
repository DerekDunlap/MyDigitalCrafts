const express =require('express')
const app=express()
const mustacheExpress=require('mustache-express')

app.use(express.urlencoded())
app.use(express.static('/styles'))

app.engine('mustache',mustacheExpress())
app.set('views','./views')
app.set('view engine','mustache')

let trips=[]
let myTrips=[]

//display all trips


app.get('/add-trip',(req,res)=>{
    res.render('add-trip')
})

app.get('/all-trips',(req,res)=>{
    res.render('all-trips',{allTrips:trips})
})

app.post('/add-trip',(req,res)=>{
    const title=req.body.locationName
    const tripId=trips.length+1
    let querySearch=title.replace(/ /g,'')
    const image=`https://www.google.com/search?q=${querySearch}&sxsrf=ALeKk03XiXLhVeglOaX0MtHDXEY9KjHL7A:1629226306949&source=lnms&tbm=isch&sa=X&ved=2ahUKEwjHzKL63LjyAhXkTTABHcOACgIQ_AUoA3oECAEQBQ&biw=958&bih=927`
    const departure=req.body.departureDate
    const returnDate=req.body.returnDate

    const trip={tripId:tripId,title:title,departure:departure,returnDate:returnDate,image:image}
    trips.push(trip)
    console.log(trips)
    res.redirect('/all-trips')
})

app.post('/remove-trip',(req,res)=>{
    const tripId=parseInt(req.body.tripId)
    trips=trips.filter((trip)=>{
        return trip.tripId!=tripId
    })
    res.redirect('/all-trips')
})

app.get('/my-trip?locationName',(req,res)=>{
    const tripName=req.body.locationName
    myTrips=trips.filter((trip)=>{
        return trip.title==tripName
    })
    res.render('/my-trip',{searchTrips:myTrips})
})

app.listen(3000,()=>{
    console.log("Server is up...")
})