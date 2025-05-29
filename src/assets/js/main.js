$(document).ready(function () {
  $(window).scroll(function () {
    var scroll = $(window).scrollTop();
    if (scroll >= 100) {
      $("#toTop").fadeIn();
    } else {
      $("#toTop").fadeOut();
    }
  });

  $(document).on("click", "#toTop", function () {
    $("html, body").animate({ scrollTop: 0 }, 500);
  });
});

$(document).ready(function () {
  $(".ct_toggle_icon").click(function () {
    $(".ct_menu_link").addClass("active");
  });
  $(".ct_close_menu_icon").click(function () {
    $(".ct_menu_link").removeClass("active");
  });

  $(".ct_login_slider").owlCarousel({
    loop: true,
    animateIn: "fadeIn",
    margin: 10,
    autoplayTimeout: 2000,

    nav: true,
    autoplay: 2000,
    //    smartSpeed:1000,
    slideSpeed: 2000,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 1,
      },
      1000: {
        items: 1,
      },
    },
  });

  AOS.init();
});

$(document).ready(function () {
  $(".ct_toggle_side").click(function () {
    $(".ct_dashbaord_main").addClass("ct_active");
  });
  $(".ct_close_side_bar").click(function () {
    $(".ct_dashbaord_main").removeClass("ct_active");
  });
});

// chart js

// Initialize thumbnail swiper
const swiperThumbs = new Swiper(".swiper-thumbs", {
  spaceBetween: 10,
  slidesPerView: 4,
  freeMode: true,
  watchSlidesProgress: true,
});

// Initialize main swiper with thumbs
const swiperMain = new Swiper(".swiper-main", {
  spaceBetween: 10,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  thumbs: {
    swiper: swiperThumbs,
  },
});

$(window).on("load", function () {
  $(".ct_loader_main").fadeOut();
});
