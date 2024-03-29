$(function(){
  'use strict';


  //Функция для слик-слайдера

  $('.slick-slider').slick({
    infinite: false,
    responsive: [
      {
      breakpoint: 1200,
      settings: {
        slidesToShow: 2,
        infinite: true
      }

    }, {

      breakpoint: 768,
      settings: {
        slidesToShow: 1,
        infinite: true
      }
    }],

    slidesToScroll: 1,
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



    //Функция для фильтрации элементов 

    $(function() {

      let newSelection = "";
    
      $(".filter-controls__item").click(function(){
    
          $(".filter-container").fadeTo(200, 0.10);
    
        $(".filter-controls__item").removeClass("filter-controls__item--active");
        $(this).addClass("filter-controls__item--active");
    
        newSelection = $(this).attr("rel");
    
        $(".filter-container__item").not("."+newSelection).slideUp();
        $("."+newSelection).slideDown();
    
          $(".filter-container").fadeTo(600, 1);
    
      });
    
    });



  //Функция для мобильного меню
  let navItems = document.querySelector( ".nav__items" );
  let nav = document.querySelector( ".nav__menu-mobile" );
  let menuItems = document.querySelectorAll( ".nav__item" );

  function toggleMobileMenu() {
    if( document.documentElement.clientWidth < 768 ) {
      navItems.classList.add( "nav__items--closed" );
      nav.addEventListener( "click", () => {
        navItems.classList.toggle( "nav__items--closed" );
      } );

      menuItems.forEach( (item) => {
        item.addEventListener( "click", () => {
          console.log( "click" );
          navItems.classList.add( "nav__items--closed" );
        } );
      } );
    } else {
      navItems.classList.remove( "nav__items--closed" );
    }

  }

  toggleMobileMenu();


});   // Окончание главной функции




