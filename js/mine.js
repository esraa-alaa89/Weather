let dayNames = [
    "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
];

let monthNames = [
    "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
];

let weatherData;

let searchBtn= document.querySelector('.search-btn')
if (searchBtn.value == '') {
    getWeatherUrl('cairo');
}

let date= new Date();

async function getWeatherUrl(country) {
    let weatherUrl= await fetch(`https://api.weatherapi.com/v1/forecast.json?key=7d77b96c972b4d119a3151101212704&q=${country}&days=3`);

    weatherData= await weatherUrl.json();

    displayWeather();    
    
};

function displayWeather() {
    $('.weather-card .row').html(
        `<div class="col-md-6 col-lg-4 text-white mx-auto">

            <div class="forecast">

                <div class="forecast-header d-flex justify-content-between">
                    <span class="day">${dayNames[date.getDay()]}</span>
                    <span class="date">${date.getDate()} ${monthNames[date.getMonth()]}</span>
                </div>

                <div class="forecast-body">
                    <h4>${weatherData.location.name}</h4>

                    <div class="degree d-flex align-items-center">
                        <div class="degree-num">
                            ${weatherData.current.temp_c}<sub>o</sub>c
                        </div>
                        <img src="https:${weatherData.current.condition.icon}" width=90 />
                        
                    </div>
                    
                    <p class="pb-4">
                        ${weatherData.current.condition.text}
                    </p>

                    <span class="forecast-bottom-icon me-3">
                        <img src="images/icon-umberella@2x.png" /> 
                        ${weatherData.current.humidity} %
                    </span>
                    <span class="forecast-bottom-icon me-3">
                        <img src="images/icon-wind@2x.png" /> 
                        ${weatherData.current.wind_kph} km/h
                    </span>
                    <span class="forecast-bottom-icon me-3">
                        <img src="images/icon-compass@2x.png" /> 
                        ${weatherData.current.wind_dir}
                    </span>
                </div>
            </div>
        </div>
        
        <div class="col-md-6 col-lg-4 text-white mx-auto">

            <div class="nextDay forecast">

                <div class="forecast-header">
                    <span class="day">${dayNames[date.getDay() + 1]}</span>
                </div>

                <div class="forecast-body text-center">
                    <img src= "https:${weatherData.forecast.forecastday[0].day.condition.icon}" />
                    <h4 class="pb-2">
                        ${weatherData.forecast.forecastday[0].day.maxtemp_c}
                    </h4>
                    <small>
                        ${weatherData.forecast.forecastday[0].day.mintemp_c}
                        <sup>o</sup> c
                    </small>
                    <p class="py-4">${weatherData.forecast.forecastday[0].day.condition.text}</p>
                </div>
            </div>
        </div>

        <div class="col-md-6 col-lg-4 text-white mx-auto mt-1">

            <div class="forecast">

                <div class="forecast-header">
                    <span class="day">${dayNames[date.getDay() + 1]}</span>
                </div>

                <div class="forecast-body text-center">
                    <img src= "https:${weatherData.forecast.forecastday[0].day.condition.icon}" />
                    <h4 class="pb-2">
                        ${weatherData.forecast.forecastday[0].day.maxtemp_c}</h4>
                    <small>
                        ${weatherData.forecast.forecastday[0].day.mintemp_c}
                        <sup>o</sup> c
                    </small>
                    <p class="py-4">${weatherData.forecast.forecastday[0].day.condition.text}</p>
                </div>
            </div>
        </div>
    `)
}


// click on find btn
$('.find-btn').click(function () {
    displayWeather();
    
});
// keyup oon search btn
$('.search-btn').keyup(function (e) {
    searchByCountry(e.target.value);
});

async function searchByCountry(country) {
    let searchUrl= await fetch(`http://api.weatherapi.com/v1/search.json?key=7d77b96c972b4d119a3151101212704&q=${country}`);
    let searchData= await searchUrl.json();

    for(let i=0; i < searchData.length; i++)
    {

        if( (searchData[i].name.toLowerCase().includes(country.toLowerCase()) == true ) )
        {
            getWeatherUrl(searchData[i].name.toLowerCase()) ;
            break ;
        }

        else if(searchData[i].country.toLowerCase().includes(country.toLowerCase()) == true )
        {
            getWeatherUrl(searchData[i].country.toLowerCase()) ;
            break ;
        }

        else if(searchData[i].region.toLowerCase().includes(country.toLowerCase()) == true )
        {
            getWeatherUrl(searchData[i].region.toLowerCase()) ;
            break ;
        }

        else
        {
            console.log("sorry") ;
        }
        
    }
    console.log(searchData);
}

