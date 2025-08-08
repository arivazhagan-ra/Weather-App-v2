let search = document.getElementById("search");
let cards = document.querySelector(".card");
let form = document.getElementById("weatherForm");
let city = document.getElementById("city");
let temperature = document.getElementById("temperature");
let description = document.getElementById("description");
let clouds = document.getElementById("clouds");
let humidity = document.getElementById("humidity");
let pressure = document.getElementById("pressure");


let url = `https://api.openweathermap.org/data/2.5/weather?units=metric&appid=`+id;

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    if(search.value.trim() === "") {
        alert("Please enter a city name");
        return;
    } else{
       setWeather();
        console.log("Fetching weather data...");
    }
})

function setWeather() {
      fetch(url + "&q=" + search.value)
        .then(res => res.json())
        .then(data=>{
            console.log(data);
            if(data.cod===200){
                city.querySelector("h4").textContent = data.name;
                city.querySelector("img").src = `https://flagsapi.com/${data.sys.country}/shiny/32.png`;
                temperature.querySelector('img').src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;
                temperature.querySelector('span').textContent = data.main.temp;
                description.textContent = data.weather[0].description;
                clouds.textContent = data.clouds.all+ "%";
                humidity.textContent = data.main.humidity+ "%";
                pressure.textContent = data.main.pressure+ "hPa";
            } else{
                city.querySelector("h4").textContent = "City Not Found";
                temperature.querySelector('span').textContent = "";
                description.textContent = "";
                clouds.textContent = "";
                humidity.textContent = "";
                pressure.textContent = "";
                cards.classList.add("hidden");

                setTimeout(()=>{
                    cards.classList.remove("hidden");
                },1000)
            }

            search.value = "";
        })
}

       
    