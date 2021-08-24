const express=require('express')
const mustacheExpress=require('mustache-express')
const session=require('express-session')
const pgp=require('pg-promise')()
const app=express()

const pgpURL='postgres://kwjaavlx:KdPhdGlvxLR7Jhn5sRqr6c2z9VCSI5ai@chunee.db.elephantsql.com/kwjaavlx'
const dataBase=pgp(pgpURL)
const port=3000
let postAddress=''

app.engine('mustache',mustacheExpress())
app.set('views','./views')
app.set('view engine','mustache')

app.use(express.urlencoded())

//create a new post
app.post('/create-post',(req,res)=>{
    let today=new Date()
    var date=(today.getMonth()+1)+'/'+today.getDate()+'/'+today.getFullYear()
    const title=req.body.postTitle
    const body=req.body.postBody
    const date_created=date
    const is_published=true

    dataBase.none('INSERT INTO posts(title,body,date_created,is_published) VALUES($1, $2, $3, $4)',[title,body,date_created,is_published]).then(()=>{
        res.redirect('/')
    })
})

app.post('/update-post/:post_id',(req,res)=>{
    const post_id=req.params.post_id
    //dataBase.one('UPDATE posts SET title=$1, body=$2, date_dated=$3 WHERE post_id=$4',[post_id=])
})

// app.post('/delete-post',(req,res)=>{
//     const post_id=req.body.post_id
//     dataBase.one('DELETE FROM posts WHERE post_id=$1',[post_id]).then(()=>{
//         res.redirect('/')
//     })
// })

//get all the posts and renders on page
app.get('/',(req,res)=>{
    dataBase.any('SELECT post_id, title, body, date_created, date_updated FROM posts;')
    .then(posts=>{
        const postItem=posts.map(function(post){
            return `/delete-post/${post.post_id}`
        })
        res.render('index',{posts:posts})
    })
})

app.post('/delete-post/:post_id',(req,res)=>{
    console.log(req.params.post_id)
    const post_id=req.params.post_id
    dataBase.one('DELETE FROM posts WHERE post_id=$1',[post_id])
    .then(posts=>{
            res.render('index',{posts:posts})
    }).catch(error=>{
        console.log(error)
        res.render('index',{posts:posts})
        res.set("Connection", "close");
        res.end('Connection')
    })
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })