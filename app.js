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

window.onload = function currentLocation() {
  if (navigator) {
    navigator.geolocation.getCurrentPosition(getPosition, showError);
  }
};
document.getElementById('currentLocation').addEventListener('click',currentLocation())
async function getPosition(data) {
  alert('ok')
  let lat = await data.coords.latitude;
  let lon = await data.coords.longitude;
  weatherByLocation(lat, lon);
}

function showError(error) {
  console.log(error);
}

async function weatherByLocation(lat, lon) {
  const url = `https://api.weatherapi.com/v1/forecast.json?key=5508d1849c974c9a929165810250701&q=${lat},${lon}&aqi=yes&days=6&hour=1`;
  try {
    Swal.showLoading();
    const response = await fetch(url);
    const responseJson = await response.json();
    console.log(responseJson);
  } catch (error) {
    console.log(error);
  } finally {
    swal.close();
  }
}

function search() {
  const city = document.getElementById("searchInput").value;
  if (city) {
    weatherByCity(city);
  }
}
document
  .getElementById("searchInput")
  .addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      search();
    }
  });

async function weatherByCity(city) {
  const url = `http://api.weatherapi.com/v1/current.json?key=5508d1849c974c9a929165810250701&q=${city}&aqi=yes&days=6&hour=1`;
  try {
    Swal.showLoading();
    const response = await fetch(url);
    const responseJson = await response.json();
    console.log(responseJson);
  } catch (error) {
    console.log(error);
  } finally {
    swal.close();
  }
}
