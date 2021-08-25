const express=require('express')
const mustacheExpress=require('mustache-express')
const app=express()
require('dotenv').config()
const models=require('./models')
const {Op}=require('sequelize')

const PORT=3000

app.engine('mustache',mustacheExpress())
app.set('views','./views')
app.set('view engine','mustache')

app.use(express.urlencoded())

// app.get('/',(req,res)=>{
//     res.render('index')
// })

//route to create a new post and save to database
app.post('/create-post',(req,res)=>{
    const title=req.body.title
    const body=req.body.body
    const category=req.body.category
    const is_published=true

    const post=models.Post.build({
        title:title,
        body:body,
        category:category,
        is_published:is_published
    })

    post.save()
    .then(savedPost=>{
        console.log('New post saved!',savedPost)
        res.redirect('/')
    })
})

//route to delete a post and save deletion to database
app.post('/delete-post',(req,res)=>{
    const post_id=req.body.post_id
    models.Post.destroy({
        where:{
            id:post_id
        }
    }).then(deletedPost=>{
        res.render('index',{message:'Post was successfully deleted!'})
    })
})

app.get('/update',(req,res)=>{
    const post_id=req.body.post_id
    console.log(post_id)
    // models.Post.findAll({
    //     where:{
    //         id:post_id
    //     }
    // }).then(post=>{
    //     res.post('post',{post:post})
    // })
})

 app.post('/update/:post_id',(req,res)=>{
     const post_id=req.body.post_id
     console.log(post_id)
    //  models.Post.update({
    //      where:{
    //          :post_id
    //      }
    //  }).then(deletedPost=>{
    //      res.render('index',{message:'Post was successfully deleted!'})
    //  })
 })

//route to get all posts that are stored within database
app.get('/',(req,res)=>{
    models.Post.findAll({})
    .then(posts=>{
        res.render('index',{posts:posts})
    })
})

app.listen(PORT,()=>{
    console.log('Server running...')
})