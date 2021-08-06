const articlesUL=document.getElementById("articlesUL")
let outputArr=[]

//fetchs all storyIDs from provided url
function getStoryIds(storiesIdDownloaded){
    const url=`https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty`
    fetch(url)
    .then(response=>{
        return response.json()
    }).then(storyIDs=>{
        storiesIdDownloaded(storyIDs)
    })
}

function getArticle(storyID,articleDownloaded){
    storyID.map(function(story){
        const storyURL=`https://hacker-news.firebaseio.com/v0/item/${story}.json?print=pretty`
        fetch(storyURL)
        .then(response=>{
            return response.json()
        }).then(articleData=>{
            if(storyURL==null){
                console.log(storyURL)
            }else{
                articleDownloaded(articleData)
            }
        })
    })
}

getStoryIds(function(storiesIdDownloaded){
    getArticle(storiesIdDownloaded,function(articleDownloaded){
        displayArticleDetails(storiesIdDownloaded,articleDownloaded)
    })
})

function displayArticleDetails(storyIDs,articles){
    let articleTemplate=""
    for(let i=0;i<1;i++){
        articleTemplate=`
        <li>
            <h2>Title: ${articles.title}<h2>
            <a herf="${articles.url}"> URL:${articles.url}</a>
            <span>By: ${articles.by}</span>
            <span>Time: ${articles.time}</span>
        </li>`
        outputArr.push(articleTemplate)
    }
    //console.log(outputArr)
    //console.log(articles)
    
    /*const article=articleDownloaded
    const articleTemplate=`
    <li>
        <h2>${article.title}<h2>
        <a herf="${article.title}"></a>
        <span>${article.by}</span>
        <span>${article.time}</span>
    </li>`
    console.log(articleTemplate)*/
    articlesUL.innerHTML=outputArr
}
