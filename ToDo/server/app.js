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
    const number=req.body.number
    const title=req.body.title
    const priority=req.body.priority
    const dateCreated=req.body.dateCreated

    const taskItem={number:number,title:title,priority:priority,dateCreated:dateCreated}
    todoList.push(taskItem)

    res.json({message: "Your task has been entered"})
})

app.delete('/todos/:number',(req,res)=>{
    const number=req.params.number
    console.log(number)
    todoList.filter((task)=>{
        if(task.number==number){
            todoList.pop(number-1)
        }
    })
    res.json({message: "Task has been removed!"})
})

app.listen(3000,()=>{
    console.log("Server is up...")
})