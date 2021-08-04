const ordersUL=document.getElementById("ordersUL")
const displayButton=document.getElementById("displayButton")
const newOrderButton=document.getElementById("newOrderButton")
const findOrderButton=document.getElementById("findOrderButton")
const OrderDiv=document.getElementById("OrderDiv")
const optionID=document.getElementById('optionID')
let ordersDiv=document.getElementById("ordersDiv")

findOrderButton.addEventListener('click',function(){
    let displayOptions=document.getElementById("findOrderDiv")
    const findOrderLayout=` <input id="findEmailText" type="text" placeholder="Enter Email"/>
                            <button id="submitButton" onclick="findOrder()">Submit</button>`
    if(displayOptions.style.display==="none"){
        displayOptions.innerHTML=findOrderLayout
        displayOptions.style.display="block"
    }else{
        displayOptions.style.display="none"
    }
})

//EventListener for newOrderButton to add a new order
newOrderButton.addEventListener('click',function(){
    const menuLayout=`<input type="text" placeholder="Enter Email"/>
            <input type="text" placeholder="Enter Order Type"/>
            <select id="sizeDropDown">
                <option id="optionID" value="">Order Size</option>
                <option id="optionID" value="Small">Small</option>
                <option id="optionID" value="Medium">Medium</option>
                <option id="optionID" value="Large">Large</option>
            </select>
            <input type="text" placeholder="Enter Price"/>
            `
    OrderDiv.innerHTML=menuLayout
    //console.log('fired')
    const email= "mike@yahoo.com"
    const type= "Hot Coffee"
    const size= optionID.getAttribute('value',optionID.value)
    const price= 3.75

    console.log(size)
    let postRequest=new XMLHttpRequest()
    postRequest.open('POST','https://troubled-peaceful-hell.glitch.me/orders')

    postRequest.setRequestHeader('Content-Type','application/json')
    
    const body={
        email: email,
        type: type,
        size: size,
        price: price 
    }
    postRequest.send(JSON.stringify(body))
})

//EventListener for displayButton to fetch all orders
displayButton.addEventListener('click',function(){
    let ordersRequest=new XMLHttpRequest()
    ordersRequest.open('GET','https://troubled-peaceful-hell.glitch.me/orders')
    ordersRequest.send()

    ordersRequest.addEventListener('load',function(){
        const results=JSON.parse(this.responseText)
        const orders=results
        displayOrders(orders)
    })
})

//Displays all the coffee orders
function displayOrders(orders){
    const orderItems=orders.map(function(order){
        return`<li>
                <label>Email: ${order.email}</label>
                <label>Type: ${order.type}</label>
                <label>Size: ${order.size}</label>
                <label>Price: ${order.price}</label>
                <button id="${order.email}" onclick="deleteOrder(this)">Delete</button>
        </li>`
    })
    ordersUL.innerHTML=orderItems.join("")
}


function deleteOrder(btn){
    console.log(btn)
    const emailID=btn.getAttribute('id',btn.value)
    const urlAddress=`https://troubled-peaceful-hell.glitch.me/orders/${emailID}`

        fetch(urlAddress,{
            method: 'DELETE',
            headers:{
                'Content-type': 'application/json'
            }
        })
    const resMessage='Order deleted...'
    console.log(resMessage)
    displayOrders(orders)
}
   
function findOrder(){
    if(findEmailText.value==null){
        alert("Order does not exist!")
    
    }else{
        const emailID=findEmailText.value
        const urlAddress=`https://troubled-peaceful-hell.glitch.me/orders/${emailID}`

        let orderRequest=new XMLHttpRequest()
        orderRequest.open('GET',urlAddress)
        orderRequest.send()

        orderRequest.addEventListener('load',function(){
            const order=JSON.parse(this.responseText)
            const orderLayout=`<h2>Email: ${order.email}</h2>
                            <h3>Order Typer: ${order.type}</h3>
                            <h3>Size: ${order.size}</h3>
                            <h3>Price: $${order.price}</h3>
                            <button id="${order.email}" onclick="deleteOrder(this)">Delete</button>`
            OrderDiv.innerHTML=""
            OrderDiv.innerHTML=orderLayout
        })
    }
    
}
    
