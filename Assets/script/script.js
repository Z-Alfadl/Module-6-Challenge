var cityName;
var dataObject;
var limit = 5;
var h1 = document.createElement("h1");
var h2 = document.createElement("h2");
//Variables for html elemenets
var weatherDisplay = document.getElementById("weather-display")
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
            //logs date for 24 hour interval
           
            //Populates main card with today's weather 
            weatherToday(data)
            weatherForecast(data)
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
//Populates main card with data
function weatherToday(data) {
    
    var weatherIcon = data.list[0].weather[0].icon
    var temperature = data.list[0].main.temp;
    var windSpeed = data.list[0].wind.speed;
    var humidity = data.list[0].main.humidity;
    //Converts time from to utc to D/MM/YYYY format
    var d = new Date(data.list[0].dt *1000)
    var todaysDate = d.toLocaleDateString();
    
    weatherEl.src = `https://openweathermap.org/img/wn/${weatherIcon}@2x.png`
    cityHeader.textContent = `${cityName} ${todaysDate}`
    tempEl.textContent = `Temperature: ${temperature}F`
    windEl.textContent = `Wind Speed: ${windSpeed} MPH`
    humidityEl.textContent = `Humidity: ${humidity}%`
}

function weatherForecast(data) {
    for (let i = 8; i < data.list.length; i+=8) {
        var d = new Date(data.list[i].dt * 1000)
        var fillDate = d.toLocaleDateString();

        var weatherDisplay = $('#weather-display');
        weatherDisplay.addClass('row')
        var followingDays = $('<div class="col-2" ></div>')
        var dateHeader = $('<h3>');
        var weatherIcon = $(`<img>`)
        weatherIcon.attr("src", `https://openweathermap.org/img/wn/${data.list[i].weather[0].icon}@2x.png`)
        var weatherStats = $(`<ul><li>Temp: ${data.list[i].main.temp}</li><li>Wind: ${data.list[i].wind.speed}</li><li>Humidity: ${data.list[i].main.humidity}</li></ul>`)
        dateHeader.text(`${fillDate}`) 
  
        weatherDisplay.append(followingDays)
        followingDays.append(dateHeader, weatherIcon, weatherStats)
        // followingDays.append(weatherStats)

    }
}
getLocation('Washington DC')
// button.addEventListener("click", getLocation)
