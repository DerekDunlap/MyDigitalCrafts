const tasksUL=document.getElementById("tasksUL")
const addTaskBtn=document.getElementById("addTaskBtn")
const showAllTasks=document.getElementById("showAllTasks")
const taskName=document.getElementById("taskName")
let priorityLevel=document.getElementById("priorityLevel")

let month=new Date()
let day=new Date()
let year=new Date()
let date=`${month.getMonth()}/${day.getDate()}/${year.getDate()}`

addTaskBtn.addEventListener('click',function(){
    let title=taskName.value
    let priority=priorityLevel.getAttribute('value',priorityLevel.value)
    let dateCreated=date

    let postRequest=new XMLHttpRequest()
    postRequest.open('POST','http://localhost:3000/todos')
    postRequest.setRequestHeader('Content-Type','application/json')

    const body={
        title: title,
        priority:priority,
        dateCreated:dateCreated
    }
    postRequest.send(JSON.stringify(body))
})


showAllTasks.addEventListener('click',function(){
    getAllTasks(function(tasksData){
        displayAllTasks(tasksData)
    })
})

function getAllTasks(tasksDownloaded){
    fetch(`http://localhost:3000/todos`)
    .then(response=>{
        return response.json()
    }).then(tasksData=>{
        tasksDownloaded(tasksData)
    })
}

function displayAllTasks(tasksData){
    const taskItem=tasksData.map(function(task){
        console.log(task)
        return `<li>
        <h3>Task: ${task.title}
        Priority: ${task.priority}
        Date Created: ${task.dateCreated}
        <button value="${task.title}" onclick="deleteTask(this)">Delete</button><h3>
        </li>`
    })
    tasksUL.innerHTML=taskItem.join("")
}

function deleteTask(btn){
    const name=btn.getAttribute('value',btn.value)
    console.log(name)
    const urlAddress=`http://localhost:3000/todos/${name}`

    fetch(urlAddress,{
        method: 'DELETE',
        headers:{
            'Content-type':'application/json'
        }
    })
    const resMessage='Task deleted...'
    console.log(resMessage)
}