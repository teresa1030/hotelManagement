import $ from '../../../node_modules/jquery'
// import barChart from '../assets/js/barChart'
$(document).ready(function () {
  $('.showMenu').on('click', function (event) {
    event.preventDefault()
    $('.menu').removeClass('menu-hide')
    $('.menu').toggleClass('menu-show')
    $('.menu li').css('z-index', 100)
  })

  $(document).click(function (event) {
    event.stopPropagation()
    // event.preventDefault()
    var showMenu = $('.showMenu img')
    if (!showMenu.is(event.target)) {
      $('.menu').toggleClass('menu-hide')
      $('.menu').removeClass('menu-show')
    }
  })
})

