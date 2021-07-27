const addTaskButton=document.getElementById("addTaskButton")
const taskName=document.getElementById("taskName")
const todoUL=document.getElementById("todoUL")
const completedUL=document.getElementById("completedUL")

addTaskButton.addEventListener("click",function(){
    //Creates a li element for todoUL
    const checkBox=document.createElement("input")
    checkBox.setAttribute("type","checkbox")
    const taskLI=document.createElement("li")
    const removeButton=document.createElement("button")


    removeButton.addEventListener("click",function(){
        this.parentElement.remove()
    })

    checkBox.addEventListener("change",function(){
        if(this.checked){
            completedUL.appendChild(this.parentElement)
        }else{
            todoUL.appendChild(this.parentElement)
        }
    })
    
    removeButton.innerHTML="Remove"
 
    taskLI.innerHTML=taskName.value
    taskLI.appendChild(checkBox)
    taskLI.appendChild(removeButton)

    //Appends the newly created task to the todoUL
    todoUL.appendChild(taskLI)
})