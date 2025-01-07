$(document).ready(function () {
    $(".owl-carousel").owlCarousel({
      items: 1, // Default number of items
      margin: 10,
      loop: true, // Enable infinite looping
      nav: true, // Show navigation arrows
      dots: true, // Show navigation dots
      responsive: {
        0: { items: 3 }, // 1 item on small screens
        600: { items: 4 }, // 2 items on medium screens
        1000: { items: 8 } // 3 items on larger screens
      }
    });
  });