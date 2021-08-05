const displayWeatherDIV=document.getElementById("displayWeatherDIV")
const locationHeading=document.getElementById("locationHeading")
const currentTemp=document.getElementById("currentTemp")
const thresholdTemp=document.getElementById("thresholdTemp")
const feelsTemp=document.getElementById("feelsTemp")
const cityNameText=document.getElementById("cityNameText")
const cityLatitude=document.getElementById("cityLatitude")
const cityLongitude=document.getElementById("cityLongitude")
const confirmBtn=document.getElementById("confirmBtn")
const getLocalBtn=document.getElementById("getLocalBtn")
const weatherDiv=document.getElementById("weatherDiv")

function getWeatherData(weatherDataFetched){
    const weatherURL='http://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=85401163fed51161a9a024765ced6c37&units=imperial'
    fetch(weatherURL)
    .then(response=>{
        return response.json()
    }).then(weatherData=>{
        weatherDataFetched(weatherData)
    })
}

function getCityWeather(cityWeatherFetched){
    const weatherURL=`http://api.openweathermap.org/data/2.5/weather?q=${cityNameText.value}&APPID=85401163fed51161a9a024765ced6c37&units=imperial`
    fetch(weatherURL)
    .then(response=>{
        return response.json()
    }).then(cityWeatherData=>{
        cityWeatherFetched(cityWeatherData)
    })
}

function displayWeatherData(weatherData){
    const locationTemplate=`${weatherData.name}, ${weatherData.sys.country}`
    const currentTemplate=`${weatherData.main.temp}\u00B0F`
    const thresholdTemplate=`High/Low:\t\t${weatherData.main.temp_max}\u00B0/${weatherData.main.temp_min}\u00B0`
    const feelsLikeTemplate=`Feels like ${weatherData.main.feels_like}\u00B0`


    locationHeading.innerHTML=locationTemplate
    currentTemp.innerHTML=currentTemplate
    thresholdTemp.innerHTML=thresholdTemplate
    feelsTemp.innerHTML=feelsLikeTemplate
}

confirmBtn.addEventListener('click',function(){
    getCityWeather(function(cityWeatherData){
        displayWeatherData(cityWeatherData)
    })
})

getWeatherData(function(weatherData){
    displayWeatherData(weatherData)
})

getLocalBtn.addEventListener('click',function(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(getLocalWeather)
    }
})

function getLocalWeather(position) {
    weatherDiv.dataset.latitude=position.coords.latitude
    weatherDiv.dataset.longitude=position.coords.longitude
    const weatherURL=`http://api.openweathermap.org/data/2.5/weather?lat=${weatherDiv.dataset.latitude}&lon=${weatherDiv.dataset.longitude}&appid=85401163fed51161a9a024765ced6c37&units=imperial`
    fetch(weatherURL)
    .then(response=>{
        return response.json()
    }).then(weatherData=>{
        displayWeatherData(weatherData)
    })
}