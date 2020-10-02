import $ from '../../../node_modules/jquery'
// import barChart from '../assets/js/barChart'
$(document).ready(function () {
  $('.showMenu').on('click', function (event) {
    event.preventDefault()
    $('body').toggleClass('menu-show')
    $('.menu li').css('z-index', 100)
  })
})
