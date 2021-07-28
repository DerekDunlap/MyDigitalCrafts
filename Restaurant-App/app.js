const menuUL=document.getElementById("menuUL")
const menuContent=document.getElementById("menuContent")
const startersBtn=document.getElementById("startersBtn")
const entreessBtn=document.getElementById("entreesBtn")
const dessertsBtn=document.getElementById("dessertsBtn")

startersBtn.addEventListener("click",function(){
    menuUL.innerHTML=""

    const starterArr=dishes.filter(dishes=>dishes.course=="Starters")
        for(let i=0;i<1;i++){
            const starter=starterArr.map(function(dishes){
                const starterItem=`
                    <li>
                        <div>
                            <img src= "${dishes.imageURL}" />
                            <h1>${dishes.title}</h1>
                            <p>${dishes.description}</p>
                            <label>${dishes.price}</label>
                        </div>
                    </li>
                `
                return starterItem
            })
            menuUL.insertAdjacentHTML('beforeend',starter)
        }
})

entreessBtn.addEventListener("click",function(){
    menuUL.innerHTML=""

    const entreeMenu=dishes.filter(dishes=>dishes.course=="Entrees")
    const entree=entreeMenu.map(function(dishes){
        const entreeItem=`
            <li>
                <div>
                    <img src= "${dishes.imageURL}" />
                    <h1>${dishes.title}</h1>
                    <p>${dishes.description}</p>
                    <label>${dishes.price}</label>
                </div>
            </li>
        `
        return entreeItem
    })
    menuUL.insertAdjacentHTML('beforeend',entree)
})

dessertsBtn.addEventListener("click",function(){
    menuUL.innerHTML=""

    const dessertMenu=dishes.filter(dishes=>dishes.course=="Desserts")
    const dessert=dessertMenu.map(function(dishes){
        const dessertItem=`
            <li>
                <div>
                    <img src= "${dishes.imageURL}" />
                    <h1>${dishes.title}</h1>
                    <p>${dishes.description}</p>
                    <label>${dishes.price}</label>
                </div>
            </li>
        `
        return dessertItem
    })
    menuUL.insertAdjacentHTML('beforeend',dessert)
})
let menuArr=dishes
console.log(dishes)

for(let i=0;i<menuArr.length;i++){
    const menu=menuArr[i]

    const menuItem=`
        <li>
            <div>
                <img src= ${menu.imageURL} width=150px height=150px/>
                <h1>${menu.title}</h1>
                <p>${menu.description}</p>
                <label>${menu.price}</label>
            </div>
        </li>
    `
    menuUL.insertAdjacentHTML('beforeend',menuItem)
}