const express=require('express')
const session=require('express-session')
const router=express.Router()

router.use(session({
    secret: 'SECRETKEY',
    saveUninitialized: true,
    resave: true
}))

function logMiddleware(req,res,next){
    next()
}

router.use(logMiddleware)


router.post('/logout',(req,res)=>{
    if(req.session){
        res.clearCookie('connect.sid')
        req.session.destroy(err=>{
            if(err){
                res.status(400).send('Unable to logout!S Try again later.')
            }else{
                res.render('login',{logOutMessage:'You have logged out!'})
            }
        })
    }else{
        res.end()
    }
})

router.get('/account/sign-in',(req,res)=>{
    res.render('login')
})

router.post('/create-account',(req,res)=>{
    if(req.session){
        req.session.userName=req.body.userName
        req.session.isLoggedIn=true
    }
    const userPassword=req.body.userPassword

    const user={userName:req.session.userName,userPassword:userPassword}
    users.push(user)
    res.redirect('/users/mydashboard')
})

router.post('/login/mydashboard',(req,res)=>{
    const userName=req.body.userName
    const userPassword=req.body.userPassword

    const userLogin=users.find(login=>{
        return login.userName==userName && login.userPassword==userPassword
    })

    console.log(users)
    if(userLogin){
        if(req.session){
            req.session.userName=userLogin.userName
            res.redirect('/users/mydashboard')
        }
    }else{
        res.render('login',{errorMessage:'Invalid username or password'})
    }
})

router.get('/mydashboard',(req,res)=>{
    let userName=''
    if(req.session){
        userName=req.session.userName
    }
    console.log(userName)
    res.render('user',{userName:userName})
})
module.exports=router