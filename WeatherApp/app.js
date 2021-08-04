const displayWeatherDIV=document.getElementById("displayWeatherDIV")
const locationHeading=document.getElementById("locationHeading")
const currentTemp=document.getElementById("currentTemp")
const thresholdTemp=document.getElementById("thresholdTemp")
const feelsTemp=document.getElementById("feelsTemp")
const cityNameText=document.getElementById("cityNameText")
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
    const weatherURL=`http://api.openweathermap.org/data/2.5/weather?q=${cityNameText.value}&appid=85401163fed51161a9a024765ced6c37&units=imperial`
    fetch(weatherURL)
    .then(response=>{
        return response.json()
    }).then(cityWeatherData=>{
        cityWeatherFetched(cityWeatherData)
    })
}

function displayWeatherData(weatherData){
    const weatherDetails=weatherData.weather.map(function(data){
        const weather=`${data.main}`
        return weather
    })
    const locationTemplate=`${weatherData.name}, ${weatherData.sys.country}`
    const currentTemplate=`${weatherDetails} ${weatherData.main.temp}\u00B0F`
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
    navigator.geolocation.getCurrentPosition(showPosition);
})

function showPosition(position) {
    console.log(`Latitude : ${position.coords.latitude}`);
    console.log(`Longitude: ${position.coords.longitude}`);
  }