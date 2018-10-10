$(document).ready(function() {


  $('.tweet-container article').on({
    mouseenter: function() {
      $(this).addClass("hover");
    }, mouseleave: function() {
      $(this).removeClass("hover");
    }
  });
});