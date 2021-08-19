const express=require('express')
const router=express.Router()

router.get('/',(req,res)=>{
    res.render('trip')
})

router.post('/add-trip',(req,res)=>{
    const title=req.body.locationName
    const tripId=trips.length+1
    let querySearch=title.replace(/ /g,'')
    const image=`https://www.google.com/search?q=${querySearch}&sxsrf=ALeKk03XiXLhVeglOaX0MtHDXEY9KjHL7A:1629226306949&source=lnms&tbm=isch&sa=X&ved=2ahUKEwjHzKL63LjyAhXkTTABHcOACgIQ_AUoA3oECAEQBQ&biw=958&bih=927`
    const departure=req.body.departureDate
    const returnDate=req.body.returnDate

    const trip={tripId:tripId,title:title,departure:departure,returnDate:returnDate,image:image}
    trips.push(trip)
    console.log(trips)
    //res.redirect('/all-trips')
})



module.exports=router