$(document).ready(function () {
  $(".owl-carousel").owlCarousel({
    items: 1,
    margin: 10,
    loop: true,
    nav: true,
    dots: true,
    responsive: {
      0: { items: 3 },
      600: { items: 4 },
      1000: { items: 8 },
    },
  });
});

function myAlert(icon, title, text) {
  swal.fire({
    icon: icon,
    title: title,
    text: text,
    background: "#1C1C1E",
    color: "#FFFFFF",
  });
}

function currentLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(getPosition, showError);
  }
}

window.onload = currentLocation;
document.getElementById("current").addEventListener("click", currentLocation);

async function getPosition(data) {
  let lat = await data.coords.latitude;
  let lon = await data.coords.longitude;
  weatherByLocation(lat, lon);
}

function showError(error) {
  console.log(error);
  myAlert("error", "Oops...", "Location not found enter manually");
}

async function weatherByLocation(lat, lon) {
  const url = `https://api.weatherapi.com/v1/forecast.json?key=5508d1849c974c9a929165810250701&q=${lat},${lon}&aqi=yes&days=6`;
  try {
    Swal.showLoading();
    const response = await fetch(url);
    const responseJson = await response.json();
    showWeather(responseJson);
    if (response.ok) {
      setTimeout(()=>{
        swal.close()
      },300)
    }
  } catch (error) {
    console.log(error);
    myAlert("error", "Oops...", "Location not found enter manually");
  }
}

function search() {
  const city = document.getElementById("searchInput").value;
  if (city.trim() === "") {
    myAlert("info", "Oops...", "Enter Location");
  }
  if (city) {
    document.getElementById("searchInput").blur();
    weatherByCity(city.trim());
  }
}
document
  .getElementById("searchInput")
  .addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      search();
    }
  });

async function weatherByCity(city) {
  const url = `https://api.weatherapi.com/v1/forecast.json?key=5508d1849c974c9a929165810250701&q=${city}&aqi=yes&days=6`;
  try {
    Swal.showLoading();
    const response = await fetch(url);
    const responseJson = await response.json();
    showWeather(responseJson);
    if (response.ok) {
      setTimeout(()=>{
        swal.close()
      },300)
    }
  } catch (error) {
    console.log(error);
    myAlert("error", "Oops...", "Location not found");
  }
}
function showWeather(data) {
  console.log(data);
  let temperature = document.getElementById("temp");
  temperature.innerHTML = `${Math.round(
    data.current.temp_c
  )} <sup style="font-size: 18px;">&#176C</sup>`;
  temperature.classList.add("fade-in");
  let condition = document.getElementById("condition");
  condition.innerHTML = data.current.condition.text;
  let conditionImg = document.getElementById("conditionImg");
  if (data.current.condition.text === "Clear") {
    conditionImg.src = "Assets/moon-svgrepo-com.svg";
  } else {
    conditionImg.src = data.current.condition.icon;
  }
  conditionImg.classList.add("fade-in");
  let date = document.getElementById("date");
  date.innerHTML = data.forecast.forecastday[0].date;
  date.classList.add("fade-in");
  let city = document.getElementById("city");
  city.innerHTML = data.location.name;
  city.classList.add("fade-in");
  let searchInput = document.getElementById("searchInput");
  searchInput.value = data.location.name;
  let day1 = document.getElementById("day1");
  let date1 = document.getElementById("date1");
  let apiDate1 = data.forecast.forecastday[1].date;
  let dateObj = new Date(apiDate1);
  day1.innerHTML = `${data.forecast.forecastday[1].day.avgtemp_c} &#176`;
  date1.innerHTML = dateObj.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
  });
  let day1Icon = document.getElementById("day1Icon");
  if (data.forecast.forecastday[1].day.condition.text === "Clear") {
    day1Icon.src = "Assets/moon-svgrepo-com.svg";
  } else {
    day1Icon.src = data.forecast.forecastday[1].day.condition.icon;
  }
  let day2 = document.getElementById("day2");
  let date2 = document.getElementById("date2");
  let apiDate2 = data.forecast.forecastday[2].date;
  dateObj = new Date(apiDate2);
  day2.innerHTML = `${data.forecast.forecastday[2].day.avgtemp_c} &#176`;
  date2.innerHTML = dateObj.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
  });
  let day2Icon = document.getElementById("day2Icon");
  if (data.forecast.forecastday[2].day.condition.text === "Clear") {
    day2Icon.src = "Assets/moon-svgrepo-com.svg";
  } else {
    day2Icon.src = data.forecast.forecastday[2].day.condition.icon;
  }
  let day3 = document.getElementById("day3");
  let date3 = document.getElementById("date3");
  let apiDate3 = data.forecast.forecastday[3].date;
  dateObj = new Date(apiDate3);
  day3.innerHTML = `${data.forecast.forecastday[3].day.avgtemp_c} &#176`;
  date3.innerHTML = dateObj.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
  });
  let day3Icon = document.getElementById("day3Icon");
  if (data.forecast.forecastday[3].day.condition.text === "Clear") {
    day3Icon.src = "Assets/moon-svgrepo-com.svg";
  } else {
    day3Icon.src = data.forecast.forecastday[3].day.condition.icon;
  }
  let sunRise = document.getElementById("sunRise");
  sunRise.innerText = data.forecast.forecastday[0].astro.sunrise;
  let sunSet = document.getElementById("sunSet");
  sunSet.innerText = data.forecast.forecastday[0].astro.sunset;
  let Pm10Value = Math.round(data.current.air_quality.pm10);
  let Pm10 = document.getElementById("Pm10");
  Pm10.innerText = Pm10Value;
  let label = document.getElementById("label");
  if (Pm10Value <= 50) {
    label.innerHTML = "Good";
    label.style.backgroundColor = "#86E389";
  } else if (Pm10Value > 50 && Pm10Value <= 100) {
    label.innerHTML = "Moderate";
    label.style.backgroundColor = "#F0C800";
  } else if (Pm10Value > 100 && Pm10Value <= 200) {
    label.innerHTML = "Unhealthy";
    label.style.backgroundColor = "#FF6F61";
  } else if (Pm10Value > 200 && Pm10Value <= 300) {
    label.innerHTML = "Very Unhealthy";
    label.style.backgroundColor = "#E35D6A";
  } else {
    label.innerHTML = "Hazardous";
    label.style.backgroundColor = "#D32F2F";
  }
  label.classList.add("background-change");
  let So2 = document.getElementById("So2");
  So2.innerText = Math.round(data.current.air_quality.so2);
  let No2 = document.getElementById("No2");
  No2.innerText = Math.round(data.current.air_quality.no2);
  let O3 = document.getElementById("O3");
  O3.innerText = Math.round(data.current.air_quality.o3);

  let humidity = document.getElementById("humidity");
  humidity.innerText = data.current.humidity;
  let pressure = document.getElementById("pressure");
  pressure.innerText = data.current.pressure_mb;
  let visibility = document.getElementById("visibility");
  visibility.innerText = `${data.current.vis_km} KM`;
  let feels_like = document.getElementById("feels_like");
  feels_like.innerHTML = `${data.current.feelslike_c} &#176;C`;
}
