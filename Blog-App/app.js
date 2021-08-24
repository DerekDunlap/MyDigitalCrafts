const express=require('express')
const app=express()
const session=require('express-session')
const pgp=require('pg-promise')()
const bcrypt=require('bcryptjs')

app.use(express.urlencoded())

const mustacheExpress=require('mustache-express')
app.engine('mustache',mustacheExpress())
app.set('views','./views')
app.set('view engine','mustache')

app.use(session({
    secret:'keyboard cat',
    resave: false,
    saveUninitialized: true
}))

const connection='postgres://kwjaavlx:KdPhdGlvxLR7Jhn5sRqr6c2z9VCSI5ai@chunee.db.elephantsql.com/kwjaavlx'
const db=pgp(connection)

//pathway to enable existing user's to log into their personal page
app.post('/login',(req,res)=>{
    const username=req.body.username
    const password=req.body.password

    db.one('SELECT user_id, username, password FROM users WHERE username=$1',[username])
    .then((user)=>{
        //function to compare the entered password with actual password stored in db
        bcrypt.compare(password,user.password,function(error,result){
            if(result){
                if(req.session){
                    req.session.user_id=user.user_id
                    req.session.username=user.username
                }
                res.redirect('/home')
            }else{
                res.render('index',{invalidUserMessage:'Invalid username or password!'})
            }
        })
    })
})

app.post('/add-post',(req,res)=>{
    const title=req.body.title
    const body=req.body.body
    const is_published=true
    const user_id=req.session.user_id
    console.log(req.session.user_id)
    db.none('INSERT INTO posts(title, body, is_published, user_id) VALUES($1,$2,$3,$4)',[title,body,is_published,user_id])
    .then(()=>{
        console.log('New post created!')
        res.redirect('/home')
    })
})

//pathway to create a new user account
app.post('/create-account',(req,res)=>{
    const username=req.body.username
    const password=req.body.password
    
    bcrypt.genSalt(10,function(error,salt){
        if(!error){
            bcrypt.hash(password,salt,function(error,hash){
                if(!error){
                    db.none('INSERT INTO users(username,password) VALUES($1,$2)',[username,hash])
                    .then(()=>{
                        console.log('New user successfully created!')
                        res.redirect('/')
                    })
                }else{
                    res.send('Error!')
                }
            })
        }else{
            res.send('Error!')
        }
    })
})

//pathway to render the homepage of the site
app.get('/',(req,res)=>{
    res.render('index')
})

//pathway to render the user's homepage
app.get('/home',(req,res)=>{
    const postUserId=req.session.user_id
    db.one('SELECT post_id, users.user_id, users.username, title, body, date_created, date_updated FROM users JOIN posts ON users.user_id=$1',[postUserId])
    .then((userPostInfo)=>{
        res.render('home',{username:req.session.username,userPostInfo:userPostInfo})
    })
    
})

app.listen(3000, () => {
    console.log('Server is running...')
})