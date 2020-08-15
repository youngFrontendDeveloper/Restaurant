$(function(){
  'use strict';


  //Функция для слик-слайдера

  $('.slick-slider').slick({
    slidesToShow: 1,   /*Показывает по 1 картинки*/
    slidesToScroll: 1,   //прокручивает по 1 картинке
    autoplay: true,
    autoplaySpeed: 2000,
    dots: true,
  });


//Функция для плавного перехода по якорям

  $('a[href^="#"]').click(function(){
    var target = $(this).attr('href');
    $('html, body').animate(
      {
        scrollTop:$(target).offset().top
      },
      800
    );
  });


//Функция для добавления класса active 

  $('.link--menu').click(function(){
    $('.link--menu').removeClass('link--menu--active');
    $(this).addClass('link--menu--active');
    });


    //Функция для фильтра (самописная :))

  $('[data-filter="all"]').click(function() {
    $('.item').show(500);
    $('.filter-controls__item').removeClass('filter-controls__item--active');
    $('[data-filter="all"]').addClass('filter-controls__item--active');
  });

  $('[data-filter="breakfast"]').click(function() {
    $('.item').hide(500);
    $('.filter-controls__item').removeClass('filter-controls__item--active');
    $('.breakfast').show(500);
    $('[data-filter="breakfast"]').addClass('filter-controls__item--active');
  });

  $('[data-filter="special"]').click(function() {
    $('.item').hide(500);
    $('.filter-controls__item').removeClass('filter-controls__item--active');
    $('.special').show(500);
    $('[data-filter="special"]').addClass('filter-controls__item--active');
  });

  $('[data-filter="desert"]').click(function() {
    $('.item').hide(500);
    $('.filter-controls__item').removeClass('filter-controls__item--active');
    $('.desert').show(500);
    $('[data-filter="desert"]').addClass('filter-controls__item--active');
  });

  $('[data-filter="dinner"]').click(function() {
    $('.item').hide(500);
    $('.filter-controls__item').removeClass('filter-controls__item--active');
    $('.dinner').show(500);
    $('[data-filter="dinner"]').addClass('filter-controls__item--active');
  });

//Функция для фильтра (самописная :))

// $('[data-filter="all"]').click(function() {
//   $('.item').fadeIn();
//   $('.filter-controls__item').removeClass('filter-controls__item--active');
//   $('[data-filter="all"]').addClass('filter-controls__item--active');
// });

// $('[data-filter="breakfast"]').click(function() {
//   $('.item').addClass('hide');
//   $('.filter-controls__item').removeClass('filter-controls__item--active');
//   $('.breakfast').removeClass('hide');
//   $('[data-filter="breakfast"]').addClass('filter-controls__item--active');
// });

// $('[data-filter="special"]').click(function() {
//   $('.item').addClass('hide');
//   $('.filter-controls__item').removeClass('filter-controls__item--active');
//   $('.special').removeClass('hide');
//   $('[data-filter="special"]').addClass('filter-controls__item--active');
// });

// $('[data-filter="desert"]').click(function() {
//   $('.item').addClass('hide');
//   $('.filter-controls__item').removeClass('filter-controls__item--active');
//   $('.desert').removeClass('hide');
//   $('[data-filter="desert"]').addClass('filter-controls__item--active');
// });

// $('[data-filter="dinner"]').click(function() {
//   $('.item').addClass('hide');
//   $('.filter-controls__item').removeClass('filter-controls__item--active');
//   $('.dinner').removeClass('hide');
//   $('[data-filter="dinner"]').addClass('filter-controls__item--active');
// });


  





});   // Окончание главной функции




