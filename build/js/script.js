$(function(){"use strict";$(".slick-slider").slick({slidesToShow:1,slidesToScroll:1,autoplay:!0,autoplaySpeed:2e3,dots:!0}),$('a[href^="#"]').click(function(){var e=$(this).attr("href");$("html, body").animate({scrollTop:$(e).offset().top},800)}),$(".link--menu").click(function(){$(".link--menu").removeClass("link--menu--active"),$(this).addClass("link--menu--active")}),$('[data-filter="all"]').click(function(){$(".item").removeClass("hide"),$(".filter-controls__item").removeClass("filter-controls__item--active"),$('[data-filter="all"]').addClass("filter-controls__item--active")}),$('[data-filter="breakfast"]').click(function(){$(".item").addClass("hide"),$(".filter-controls__item").removeClass("filter-controls__item--active"),$(".breakfast").removeClass("hide"),$('[data-filter="breakfast"]').addClass("filter-controls__item--active")}),$('[data-filter="special"]').click(function(){$(".item").addClass("hide"),$(".filter-controls__item").removeClass("filter-controls__item--active"),$(".special").removeClass("hide"),$('[data-filter="special"]').addClass("filter-controls__item--active")}),$('[data-filter="desert"]').click(function(){$(".item").addClass("hide"),$(".filter-controls__item").removeClass("filter-controls__item--active"),$(".desert").removeClass("hide"),$('[data-filter="desert"]').addClass("filter-controls__item--active")}),$('[data-filter="dinner"]').click(function(){$(".item").addClass("hide"),$(".filter-controls__item").removeClass("filter-controls__item--active"),$(".dinner").removeClass("hide"),$('[data-filter="dinner"]').addClass("filter-controls__item--active")})});