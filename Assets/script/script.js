var cityName;
var dataObject;
var limit = 5;
var h1 = document.createElement("h1");
var h2 = document.createElement("h2");

var cityHeader = document.getElementById("cityDisplay");
var tempEl = document.getElementById("temperature");
var windEl = document.getElementById("wind");
var humidityEl = document.getElementById("humidity");
var weatherEl = document.getElementById("weather-icon");
//Data to display
//1. date MM/DD/YYYY
//2. Sunny/cloudy etc
//3. Temperature
//4. Windspeed
//5. Humidity 
function getWeather(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=6e1c4500afd2f02651c0ff2571368ef8`)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            console.log(cityName)
            console.log(data)
            console.log(data.list[0])
            for (let i = 0; i < data.list.length; i++) {
                console.log(`${data.list[i].dt_txt}`);
                
            }
            //Populates main card with today's weather 
            
            weatherToday(data)

        })
}
//Takes the search input and uses it to make an API call and access city's latitude and longitude
function getLocation(searchTerm) {
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${searchTerm}&limit=5&appid=6e1c4500afd2f02651c0ff2571368ef8`)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data)
            getWeather(data[0].lat, data[0].lon)
            cityName = data[0].name;
        })
}

function weatherToday(data) {
    var weatherIcon = data.list[0].weather[0].icon
    var temperature = data.list[0].main.temp;
    var windSpeed = data.list[0].wind.speed;
    var humidity = data.list[0].main.humidity;
    var d = new Date(data.list[0].dt *1000)
    var todaysDate = d.toLocaleDateString();
    
    weatherEl.src = `https://openweathermap.org/img/wn/${weatherIcon}@2x.png`
    cityHeader.textContent = `${cityName} ${todaysDate}`
    tempEl.textContent = `Temperature: ${temperature}F`
    windEl.textContent = `Wind Speed: ${windSpeed} MPH`
    humidityEl.textContent = `Humidity: ${humidity}%`
}
getLocation('San Francisco')
// button.addEventListener("click", getLocation)
