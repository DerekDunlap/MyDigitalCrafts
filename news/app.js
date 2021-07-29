const newsUL=document.getElementById("newsUL")
const sourcesUL=document.getElementById("sourcesUL")
const newsBtn=document.getElementById("newsBtn")
const sourceBtn=document.getElementById("sourceBtn")
const sourceLink=document.getElementById("sourceLink")
//News Template format
let newsArr=news.articles

displayNewsArticles()
newsBtn.addEventListener("click",function(){
    newsUL.innerHTML=""
    sourcesUL.innerHTML=""
    displayNewsArticles()
})

sourceBtn.addEventListener("click",function(){
    displayArticleSources()
})

function displayNewsArticles(){
    //Iterates thru news by article tage and generates a newsTemplate for each article in news.js
    const newsArticles=newsArr.map(function(article){
        const newsTemplate=`
                        <li>
                            <span>${article.author}</span>
                            <h2>${article.title}</h2>
                            <p>${article.description}</p>
                            <a href="#${article.url}>${article.url}</a>
                            <img src="${article.urlToImage}"/>
                            <span>${article.publishedAt}</span>
                        </li>
                        `
        return newsTemplate
    })
    newsUL.innerHTML=newsArticles.join("")
}

function displayArticleSources(){
    //display all sources
    newsUL.innerHTML=""
    sourcesUL.innerHTML=""
    let sourceArr=sources.sources

    const sourceLinks=sourceArr.map(function(source){
        const sourcesTemplate=`
                        <li>
                            <span>${source.id}</span>
                            <h2 id="sourceLink">${source.name}</h2>
                            <a href=${source.url}>${source.url}</a>
                            <span>${source.category}</span>
                            <span>${source.language}</span>
                            <span>${source.country}</span>
                        </li>
                        `
        return sourcesTemplate
    }) 
    //Assigns sourceLinks to the innerHTML of sourcesUL.
    sourcesUL.innerHTML=sourceLinks.join("")
    console.log(sourceLink)
    sourceLink.addEventListener("click",function(){
    alert("Hello World!")
})
}

