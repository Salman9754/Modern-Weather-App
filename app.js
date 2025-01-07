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
        1000: { items: 8 } 
      }
    });
  });

  async function weather() {
    const url = 'http://api.weatherapi.com/v1/current.json?key=5508d1849c974c9a929165810250701&q=Karachi&aqi=yes';
    try {
      let data = await fetch(url)
      let dataJson = await data.json()
      console.log(dataJson);
    } catch (error) {
      console.log(error);
      
    }
  }
  weather()