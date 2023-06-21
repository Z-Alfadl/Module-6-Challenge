var cityName;
var dataObject;
var limit = 5;
var h1 = document.createElement("h1")
var h2 = document.createElement("h2")

var cityHeader = document.getElementById("cityDisplay")
var temperature = document.getElementById("temperature")
var wind = document.getElementById("wind")
var humidity = document.getElementById("humidity")
//Data to display
    //1. date MM/DD/YYYY
    //2. Sunny/cloudy etc
    //3. Temperature
    //4. Windspeed
    //5. Humidity 
function getWeather(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=6e1c4500afd2f02651c0ff2571368ef8`)
    .then(function(response){
        return response.json()
    })
    .then(function(data){
        console.log(data)
        console.log(data.list[0])
        
        console.log(`Current Date is ${data.list[0].dt_txt}`)
        cityHeader.textContent = `${cityName} ${data.list[0].dt_txt}`

        console.log(`Temperature is ${data.list[0].main.temp}F`)
        temperature.textContent = `Temperature: ${data.list[0].main.temp}F` 
        console.log(`The sky has ${data.list[0].weather[0].main}`)
        console.log(`Wind speed is ${data.list[0].wind.speed} MPH`)
        wind.textContent = `Wind Speed: ${data.list[0].wind.speed} MPH`
        console.log(`Humidity is ${data.list[0].main.humidity}%`)
        humidity.textContent = `Humidity: ${data.list[0].main.humidity}%`
    })
}
function getLocation(searchTerm) {
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${searchTerm}&limit=5&appid=6e1c4500afd2f02651c0ff2571368ef8`)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            console.log(data)
            getWeather(data[0].lat, data[0].lon)
            cityName = data[0].name;
            console.log(cityName);
        })
}
getLocation('paris')
// button.addEventListener("click", getLocation)
