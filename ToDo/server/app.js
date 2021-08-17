//How to make my own local host on my computer
//Inside of server folder run command: npm init, then npm install express
const express=require('express')
const cors=require('cors')

const app=express()
app.use(cors())
app.use(express.json())


const todoList=[]

//using url parameters to conduct fetchs
app.get('/todos',(req,res)=>{
    res.json(todoList)
})


app.post('/todos',(req,res)=>{
    const title=req.body.title
    const priority=req.body.priority
    const dateCreated=req.body.dateCreated

    const taskItem={title:title,priority:priority,dateCreated:dateCreated}
    todoList.push(taskItem)

    res.json({message: "Your task has been entered"})
})

app.delete('/todos/:name',(req,res)=>{
    const name=req.params.name
    todoList.filter((task)=>{
        if(task.title==name){
            todoList.pop(name)
        }
    })
    res.json({message: "Task has been removed!"})
})

app.listen(3000,()=>{
    console.log("Server is up...")
})